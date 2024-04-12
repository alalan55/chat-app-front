<script setup>
import HomeChatHeader from "@/components/molecules/HomeChatHeader.vue";
import HomeChatList from "@/components/molecules/HomeChatList.vue";
import FriendsListModal from "@/components/organisms/FriendsListModal.vue";
import Dialog from "primevue/dialog";

const friend_dialog = ref(false);

import { ref } from "vue";

const openFriendsListModal = () => {
  friend_dialog.value = true;
};
const startConversation = (user) => {
  console.log(user);
  friend_dialog.value = false;
};
</script>

<template>
  <main class="container">
    <section class="container__profile">
      <HomeChatHeader @open-friends-list="openFriendsListModal" />
    </section>

    <section class="container__content">
      <h2>Novidades em breve😆!</h2>
    </section>

    <section class="container__chat">
      <HomeChatList />
    </section>

    <Dialog
      v-model:visible="friend_dialog"
      modal
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #container>
        <FriendsListModal
          @close="friend_dialog = false"
          @start-conversation="startConversation"
        />
      </template>
    </Dialog>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.container {
  border-radius: 13px;
  overflow: hidden;
  -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr; /* Uma coluna para o profile e outra para o container */
  grid-template-rows: auto auto auto; /* Três linhas automáticas */

  &__profile {
    grid-column: 1; /* A área profile começa na primeira coluna */
    grid-row: 1; /* E na primeira linha */
    min-width: 350px;
    transition: 0.2s ease-in-out;
  }
  &__content {
    grid-column: 2 / span 1; /* O container começa na segunda coluna */
    grid-row: 1 / span 3; /* E ocupa três linhas */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__chat {
    grid-column: 1; /* O chat também começa na primeira coluna */
    grid-row: 2 / span 2; /* E ocupa duas linhas */
    overflow: auto;
    min-width: 350px;
    transition: 0.2s ease-in-out;
    @include trackScrollBar;
  }
}
</style>
