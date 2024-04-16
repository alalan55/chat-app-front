<script setup>
import { ref } from "vue";
import HomeChatHeader from "@/components/molecules/HomeChatHeader.vue";
import HomeChatList from "@/components/molecules/HomeChatList.vue";
import FriendsListModal from "@/components/organisms/FriendsListModal.vue";
import AddFriendModal from "@/components/organisms/AddFriendModal.vue";
import FriendsRequestModal from "../organisms/FriendsRequestModal.vue";
import UserProfile from "../organisms/UserProfile.vue";
import UpdateProfileModal from "../organisms/UpdateProfileModal.vue";
import StartupModal from "../organisms/StartupModal.vue";
import Dialog from "primevue/dialog";

const friend_dialog = ref(false);
const friend_request_dialog = ref(false);
const add_friend_dialog = ref(false);
const update_profile_dialog = ref(false);
const current_component_screen = ref("StartupModal");

const pages = {
  UserProfile,
  StartupModal,
};

const openFriendsListModal = () => {
  friend_dialog.value = true;
};
const startConversation = (user) => {
  console.log(user);
  friend_dialog.value = false;
};

const chooseOptionModal = (e) => {
  if (e.type == 0) friend_request_dialog.value = true;
  if (e.type == 2) update_profile_dialog.value = true;
};

const set_current_component = () => (current_component_screen.value = "UserProfile");
</script>

<template>
  <main class="container">
    <section class="container__profile">
      <HomeChatHeader
        @open-friends-list="openFriendsListModal"
        @add-friend="add_friend_dialog = true"
        @open-option-dialog="chooseOptionModal"
        @open-profile="set_current_component"
      />
    </section>

    <section class="container__content">
      <component :is="pages[current_component_screen]" />
    </section>

    <section class="container__chat">
      <HomeChatList />
    </section>

    <Dialog
      v-model:visible="update_profile_dialog"
      modal
      :style="{ width: '70vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #container>
        <UpdateProfileModal @close="update_profile_dialog = false" />
      </template>
    </Dialog>

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

    <Dialog
      v-model:visible="friend_request_dialog"
      modal
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #container>
        <FriendsRequestModal @close="friend_request_dialog = false" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="add_friend_dialog"
      modal
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #container>
        <AddFriendModal
          @close="add_friend_dialog = false"
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
