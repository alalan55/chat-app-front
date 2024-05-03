<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";

import Button from "primevue/button";
import Badge from "primevue/badge";

// EMITS
const emit = defineEmits(["back-previous-page"]);

// VARIABLES
const store = useUserStore();
const toast = useToast();
const current_chat_infos = ref(null);

// FUNCTIONS
const getChatInformation = async () => {
  try {
    const chat_id = store.$activeChat.id;
    const { data } = await http.get(`get-chat-info/${chat_id}`);
    current_chat_infos.value = data.content;
    console.log(data);
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Falha ao obter informações do chat",
      life: 3000,
    });
  }
};

getChatInformation();
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <Button
        size="small"
        icon="pi pi-arrow-left"
        severity="info"
        text
        rounded
        aria-label="Cancel"
        @click="emit('back-previous-page')"
      />
    </div>

    <div class="profile__middle">
      <!-- {{ current_chat_infos }} -->
      <figure></figure>

      <span class="name">
        {{ current_chat_infos.conversation_name || "Nome não encontrado" }}
      </span>

      <small>Grupo - {{ current_chat_infos.participants.length }} membros</small>

      <div class="profile__middle__description"></div>
    </div>

    <div class="profile__body">
      <!-- <span> {{ current_chat_infos.participants.length }} membros</span> -->

      <ul>
        <li v-for="user in current_chat_infos.participants" :key="user.id" class="user">
          <div class="left">
            <figure></figure>
            <span>{{ user.name }}</span>
          </div>
          <div class="right">
            <Badge
              v-if="current_chat_infos.created_by == user.id"
              severity="success"
              value="admin"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  padding: 1rem;
  gap: 1rem;

  &__middle {
    // flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    figure {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: #cdcdcd;
      margin-bottom: 1.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.5rem;
    }

    &__description {
      //   margin-top: 1rem;
      text-align: center;
      max-width: 70%;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    @include trackScrollBar;
    // border: 1px solid red;
    // padding: 0.5rem;

    ul {
      margin-top: 0.5rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      li {
        list-style: none;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.2s ease-in-out;

        .left {
          display: flex;
          align-items: center;
          gap: 1rem;
          figure {
            width: 70px;
            height: 70px;
            background: #cdcdcd;
            border-radius: 50%;
          }
          span {
            font-weight: 500;
          }
        }

        &:hover {
          background: #ececec;
        }
      }
    }
  }
}
</style>
