<script setup>
// IMPORTS
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRefHistory } from "@vueuse/core";
import http from "@/services/axios";
import { useUserStore } from "@/stores/user";
import HomeChatHeader from "@/components/molecules/HomeChatHeader.vue";
import HomeChatList from "@/components/molecules/HomeChatList.vue";
import FriendsListModal from "@/components/organisms/FriendsListModal.vue";
import AddFriendModal from "@/components/organisms/AddFriendModal.vue";
import FriendsRequestModal from "../organisms/FriendsRequestModal.vue";
import UserProfile from "../organisms/UserProfile.vue";
import UpdateProfileModal from "../organisms/UpdateProfileModal.vue";
import StartupModal from "../organisms/StartupModal.vue";
import HomeChat from "../organisms/HomeChat.vue";
import NewGroupModal from "../organisms/NewGroupModal.vue";
import ChatInformationModal from "../organisms/ChatInformation/index.vue";
import Dialog from "primevue/dialog";

// VARIABLES
const router = useRouter();
const store = useUserStore();
const dinamyc_key_to_chat_list = ref(0);
const dinamyc_key_to_content_screen = ref(0);
const friend_dialog = ref(false);
const friend_request_dialog = ref(false);
const add_friend_dialog = ref(false);
const update_profile_dialog = ref(false);
const new_group_dialog = ref(false);
const chat_information_dialog = ref(false);
const current_component_screen = ref("StartupModal");
const { undo } = useRefHistory(current_component_screen);

const pages = {
  UserProfile,
  StartupModal,
  HomeChat,
};

// FUNCTIONS
const getChatInformation = () => {
  // console.log(chat_id);
  chat_information_dialog.value = true;
};

const openFriendsListModal = () => {
  friend_dialog.value = true;
};

const startConversation = async (user) => {
  const conversation_model = { name: "", friends_list: [], conversation_type: 0 };
  conversation_model.friends_list.push(user.id);
  friend_dialog.value = false;

  try {
    await http.post("message/create-conversation", conversation_model);
    dinamyc_key_to_chat_list.value++;

    console.log("chamar o open chat passando o id da conversation para abrir a conversa");
  } catch (e) {
    console.error(e);
  }

  // chamar api para criar conversação
};

const chooseOptionModal = (e) => {
  console.log(e);
  if (e.type == 0) friend_request_dialog.value = true;
  if (e.type == 2) update_profile_dialog.value = true;
  if (e.type == 3) router.push("/");
};

const setProfileToScreen = () => (current_component_screen.value = "UserProfile");

const openChat = (chat_id) => {
  store.resetActiveChat();
  store.setActiveChat(chat_id);
  current_component_screen.value = "HomeChat";
  dinamyc_key_to_content_screen.value++;
};

const closeGroupDialog = (event) => {
  if (event) dinamyc_key_to_chat_list.value++;
  new_group_dialog.value = false;
};
</script>

<template>
  <main class="container">
    <section class="container__profile">
      <HomeChatHeader
        @open-friends-list="openFriendsListModal"
        @add-friend="add_friend_dialog = true"
        @open-option-dialog="chooseOptionModal"
        @open-profile="setProfileToScreen"
        @new-group="new_group_dialog = true"
      />
    </section>

    <section class="container__content">
      <Transition name="fade" mode="out-in">
        <component
          :is="pages[current_component_screen]"
          @back-previous-page="undo()"
          @get-chat-information="getChatInformation"
          :key="dinamyc_key_to_content_screen"
        />
      </Transition>
    </section>

    <section class="container__chat">
      <HomeChatList :key="dinamyc_key_to_chat_list" @open-chat="openChat" />
    </section>

    <Dialog
      v-model:visible="chat_information_dialog"
      modal
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '65vw', '575px': '90vw' }"
    >
      <template #container>
        <ChatInformationModal @close="chat_information_dialog = false" />
      </template>
    </Dialog>

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
      v-model:visible="new_group_dialog"
      modal
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <template #container>
        <NewGroupModal @close="closeGroupDialog" />
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  border-radius: 13px;
  overflow: hidden;
  -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr; /* Uma coluna para o profile e outra para o container */
  grid-template-rows: 160px auto auto; /* Três linhas automáticas */

  &__profile {
    grid-column: 1; /* A área profile começa na primeira coluna */
    grid-row: 1; /* E na primeira linha */
    min-width: 350px;
    transition: 0.2s ease-in-out;
  }
  &__content {
    grid-column: 2 / span 1; /* O container começa na segunda coluna */
    grid-row: 1 / span 3; /* E ocupa três linhas */
    overflow: auto;
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
