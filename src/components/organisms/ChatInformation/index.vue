<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Button from "primevue/button";

import InfoModalGroup from "./components/InfoModalGroup.vue";
import InfoModalPrivate from "./components/InfoModalPrivate.vue";
import InfoModalLoading from "./components/InfoModalLoading.vue";

// EMITS
const emit = defineEmits(["back-previous-page", "close"]);

// VARIABLES
const store = useUserStore();
const toast = useToast();
const current_chat_infos = ref(null);
const loading_infos = ref(false);

// FUNCTIONS
const getChatInformation = async () => {
  try {
    loading_infos.value = true;
    const chat_id = store.$activeChat.id;
    const { data } = await http.get(`message/get-chat-info/${chat_id}`);
    current_chat_infos.value = data.content;
    loading_infos.value = false;
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Falha ao obter informações do chat",
      life: 3000,
    });
    loading_infos.value = false;
  }
};

// COMPUTEDS

getChatInformation();
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <Button
        size="small"
        icon="pi pi-times"
        text
        rounded
        severity="info"
        aria-label="Cancel"
        @click="emit('close')"
      />
    </div>

    <!-- CONVERSA EM GRUPO  -->
    <template v-if="current_chat_infos?.conversation_type && !loading_infos">
      <InfoModalGroup
        :current_chat_infos="current_chat_infos"
        :loading_infos="loading_infos"
      />
    </template>

    <!-- CONVERSA PRIVADA -->
    <template v-if="!current_chat_infos?.conversation_type && !loading_infos">
      <InfoModalPrivate
        :current_chat_infos="current_chat_infos"
        :loading_infos="loading_infos"
      />
    </template>

    <!-- LOADING DE INFOMAÇÕES -->
    <template v-if="loading_infos">
      <InfoModalLoading loading_infos />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    z-index: 10;
    right: 15px;
  }
}
</style>
