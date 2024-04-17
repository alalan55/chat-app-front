<script setup>
import { ref, watch } from "vue";

import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";

const toast = useToast();
const loading = ref(false);
const search = ref("");
const filtered = ref([]);
const friends_requests = ref([]);

const mock_users = [
  {
    name: "Bob Taylor",
    age: 32,
    email: "bob.taylor@example.com",
  },
  {
    name: "Charlie Miller",
    age: 22,
    email: "charlie.miller@example.com",
  },
  {
    name: "David Jones",
    age: 624,
    email: "david.jones@example.com",
  },
  {
    name: "David Jones",
    age: 3454,
    email: "david.jones@example.com",
  },
  {
    name: "David Jones",
    age: 66674,
    email: "david.jones@example.com",
  },
];

const getFriendsRequest = async () => {
  try {
    loading.value = true;
    const { data } = await http.get("friends-request");
    friends_requests.value = data.content;
    loading.value = false;
  } catch (error) {
    loading.value = false;
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Falha ao buscar pedidos de amigos",
      life: 3000,
    });
  }
};

watch(search, (nv) => {
  filtered.value = mock_users.filter((user) =>
    user.name.toLocaleLowerCase().includes(nv.toLocaleLowerCase())
  );
});

getFriendsRequest();
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Solicitações de amizade</span>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="$emit('close')"></i>
      </div>
    </div>

    <div class="modal__middle">
      <!-- <TheInput
        v-model="search"
        :icon-left="'pi pi-search'"
        placeholder="Pesquisar nome"
      /> -->
    </div>

    <div class="modal__body">
      <div class="modal__body__list">
        <template
          v-for="item in search.length ? filtered : friends_requests"
          :key="item.id"
        >
          <div class="friend" @click="$emit('start-conversation', item)">
            <div class="left">
              <figure></figure>
              <span>{{ item.applicant_shared_id }}</span>
            </div>
            <div class="right">
              <Button
                size="small"
                type="button"
                icon="pi pi-check"
                severity="info"
                outlined
              />

              <Button
                size="small"
                type="button"
                icon="pi pi-times"
                severity="danger"
                outlined
              />
            </div>
          </div>
        </template>

        <template v-for="item in 4" :key="item">
          <div v-if="loading" class="friend-loading">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div class="align-self-center" style="flex: 1">
              <Skeleton width="100%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
              <Skeleton width="75%"></Skeleton>
            </div>
          </div>
        </template>
      </div>

      <div
        v-if="!friends_requests.length && !filtered.length && !loading"
        class="modal__body__no-content"
      >
        <span>Nenhuma solicitação encontrada😬</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.modal {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 65dvh;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      .title {
        span {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
    }
  }

  &__body {
    flex: 1;
    overflow: auto;
    @include trackScrollBar;
    padding-bottom: 0.9rem;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 0 0.5rem 0;

      .friend {
        padding: 1rem;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        transition: 0.2s ease-in;

        .left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          figure {
            background: #cdcdcd;
            height: 45px;
            width: 45px;
            border-radius: 50%;
            transition: 0.2s;

            @media (max-width: 750px) {
              height: 35px;
              width: 35px;
            }
          }

          span {
            font-weight: 500;
            transition: 0.2s;

            @media (max-width: 750px) {
              font-size: 0.75rem;
            }
          }
        }

        .right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        &:hover {
          background: #fcfcfc;
          -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
        }
      }
      .friend-loading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    &__no-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-weight: 600;
      }
    }
  }
}
</style>
