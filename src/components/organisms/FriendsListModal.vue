<script setup>
import { ref, watch } from "vue";
import TheInput from "../atoms/TheInput.vue";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";

const search = ref("");
const filtered = ref([]);
const users = ref([])
const toast = useToast();

// const mock_users = [
//   {
//     name: "Bob Taylor",
//     age: 32,
//     email: "bob.taylor@example.com",
//   },
//   {
//     name: "Charlie Miller",
//     age: 22,
//     email: "charlie.miller@example.com",
//   },
//   {
//     name: "David Jones",
//     age: 64,
//     email: "david.jones@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     age: 69,
//     email: "charlie.brown@example.com",
//   },
//   {
//     name: "Emma Davis",
//     age: 47,
//     email: "emma.davis@example.com",
//   },
//   {
//     name: "Emma Davis",
//     age: 20,
//     email: "emma.davis@example.com",
//   },
//   {
//     name: "Charlie Moore",
//     age: 38,
//     email: "charlie.moore@example.com",
//   },
//   {
//     name: "Emma Smith",
//     age: 67,
//     email: "emma.smith@example.com",
//   },
//   {
//     name: "David Jones",
//     age: 30,
//     email: "david.jones@example.com",
//   },
//   {
//     name: "Bob Taylor",
//     age: 45,
//     email: "bob.taylor@example.com",
//   },
//   {
//     name: "Henry Johnson",
//     age: 24,
//     email: "henry.johnson@example.com",
//   },
//   {
//     name: "Jack Moore",
//     age: 50,
//     email: "jack.moore@example.com",
//   },
//   {
//     name: "Grace Miller",
//     age: 24,
//     email: "grace.miller@example.com",
//   },
//   {
//     name: "David Smith",
//     age: 41,
//     email: "david.smith@example.com",
//   },
//   {
//     name: "Charlie Jones",
//     age: 24,
//     email: "charlie.jones@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     age: 57,
//     email: "charlie.brown@example.com",
//   },
//   {
//     name: "Grace Johnson",
//     age: 22,
//     email: "grace.johnson@example.com",
//   },
//   {
//     name: "Grace Brown",
//     age: 48,
//     email: "grace.brown@example.com",
//   },
//   {
//     name: "Henry Miller",
//     age: 48,
//     email: "henry.miller@example.com",
//   },
//   {
//     name: "Jack Davis",
//     age: 43,
//     email: "jack.davis@example.com",
//   },
// ];

const getUsersList = async () => {
  try {
    const { data } = await http.get("friends");
    users.value = data.content
    console.log(data);
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Error ao obter lista de amigos",
      life: 3000,
    });
  }
};

watch(search, (nv) => {
  filtered.value = users.value.filter((user) =>
    user.name.toLocaleLowerCase().includes(nv.toLocaleLowerCase())
  );
});

getUsersList()
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Nova conversa</span>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="$emit('close')"></i>
      </div>
    </div>

    <div class="modal__middle">
      <TheInput
        v-model="search"
        :icon-left="'pi pi-search'"
        placeholder="Pesquisar nome"
      />
    </div>

    <div class="modal__body">
      <div class="modal__body__list">
        <template v-for="(item, i) in search.length ? filtered : users" :key="i">
          <div class="friend" @click="$emit('start-conversation', item)">
            <figure></figure>
            <span>{{ item.name }}</span>
          </div>
        </template>
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
  height: 80dvh;

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
    .right {
      i {
        cursor: pointer;
      }
    }
  }

  &__body {
    flex: 1;
    overflow: auto;
    @include trackScrollBar;

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
        gap: 0.8rem;
        -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        transition: 0.2s ease-in;

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

        &:hover {
          background: #fcfcfc;
          -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }
}
</style>
