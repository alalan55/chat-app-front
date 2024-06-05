<script setup>
// IMPORTS
import { ref, watch } from "vue";
import axios from "axios";
import TheInput from "../atoms/TheInput.vue";
import { useToast } from "primevue/usetoast";
import { useUserStore } from "@/stores/user";
import http from "@/services/axios";
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";

// VARIABLES
const loading = ref(false);
const search = ref("");
const filtered = ref([]);
const users = ref([]);
const users_list_group = ref([]);
// const group_name = ref("");
// const confirmation_dialog = ref(false);
// const loading_creation = ref(false);
const current_chat_infos = ref(null);
const store = useUserStore();
const toast = useToast();

// EMITS

const emit = defineEmits(["close"]);

// FUNCTIONS
const getInformation = async () => {
  const chat_id = store.$activeChat.id;
  const user_req = await http.get("user/friends");
  const chat_req = await http.get(`message/get-chat-info/${chat_id}`);
  loading.value = true;

  axios
    .all([user_req, chat_req])
    .then(
      axios.spread((usersInfo, chatInfo) => {
        setNonAddedFriends(usersInfo.data.content, chatInfo.data);
        loading.value = false;
      })
    )
    .catch((error) => {
      console.error("Erro ao fazer requisições:", error);

      toast.add({
        severity: "error",
        summary: "Falha",
        detail: "Falha ao obter informações",
        life: 3000,
      });
      loading.value = false;
    });
};

const setNonAddedFriends = (friends, chat_participants) => {
  const diff = [];

  for (let user_friend of friends) {
    const index = chat_participants.content.participants.findIndex(
      (d) => d.id === user_friend.id
    );

    if (index < 0) diff.push(user_friend);
  }

  users.value = diff;
  current_chat_infos.value = chat_participants.content;
};

const handleUsersToGroup = (user) => {
  const idx = users_list_group.value.findIndex((e) => e.id == user.id);

  if (idx >= 0) {
    users_list_group.value.splice(idx, 1);
  } else {
    users_list_group.value.push(user);
  }
};

const isOnList = (user) => {
  const founded = users_list_group.value.findIndex((e) => e.id == user.id);
  return founded >= 0;
};

const addUsers = async () => {
  const group_model = {};
  group_model.friends_list = users_list_group.value.map((el) => el.id);
  group_model.conversation_id = current_chat_infos.value.id;

  try {
    loading.value = true;

    await http.post("message/add-user-on-group", group_model);

    loading.value = false;

    emit("close", true);
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Error ao adicionar usuário",
      life: 3000,
    });
    loading.value = false;
  }
};

// WATCHERS
watch(search, (nv) => {
  filtered.value = users.value.filter((user) =>
    user.name.toLocaleLowerCase().includes(nv.toLocaleLowerCase())
  );
});

getInformation();
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Adicionar usuário</span>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="emit('close')"></i>
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
          <div
            class="friend"
            :class="{ active: isOnList(item) }"
            @click="handleUsersToGroup(item)"
          >
            <figure></figure>
            <span>{{ item.name }}</span>
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
        v-if="!users.length && !filtered.length && !loading"
        class="modal__body__no-content"
      >
        <span>Nenhum usuário encontrado😬</span>
      </div>
    </div>

    <div class="modal__footer">
      <Button
        label="Adicionar usuário"
        severity="info"
        :loading="loading"
        @click="addUsers"
      />
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
        border: 2px solid transparent;

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

      .active {
        border: 2px solid #0ea5e9;
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

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__confirmation {
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      span {
        font-weight: 500;
        font-size: 0.9rem;
      }
    }

    &__footer {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
