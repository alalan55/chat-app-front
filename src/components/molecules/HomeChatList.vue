<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Badge from "primevue/badge";
import http from "@/services/axios";
import Skeleton from "primevue/skeleton";

// EMITS
const emit = defineEmits(["open-chat"]);

// VARIABLES
// const t = Date.now()
const store = useUserStore();
const chat_list = ref([]);
const loading_chat = ref(false);
const url = `ws://localhost:8000/message/ws`;
const web_socket = new WebSocket(url);

web_socket.onmessage = (e) => {
  const formated = JSON.parse(e.data);

  // console.log(formated);
  switch (formated.type) {
    // NOVA MENSAGEM
    case 1:
      handleNewMessage(formated);
      break;
    // NOVA CONVERSA INICIADA
    case 2:
      handleNewChat(formated);
      break;
  }
};

// FUNCTIONS

const handleNewChat = (formated) => {
  if (formated.type == 2 && formated.content.includes(store.$current_user.id))
    updateChat();
};

const handleNewMessage = (info) => {
  let founded_chat = chat_list.value.findIndex((chat) => chat.id == info.content);
  const is_private_chat = chat_list.value[founded_chat].conversation_type == 0;
  const new_message_from_another_user = info.from_user != store.$current_user.shared_id;
  const chat_with_new_message_is_not_open =
    !store.$activeChat || (store.$activeChat && store.$activeChat.id != info.content);

  if (
    founded_chat > -1 &&
    is_private_chat &&
    new_message_from_another_user &&
    chat_with_new_message_is_not_open
  ) {
    chat_list.value[founded_chat].has_new_message = true;
  }
};

const openChat = (info) => {
  // verificar lógica para ver se vai ser necessário enviar os dados do founded chat ao inves do info, visto que manpulamos internamente se tem ou não novas mensagens

  emit("open-chat", info);

  let founded_chat = chat_list.value.findIndex((chat) => chat.id == info.id);

  if (founded_chat > -1) {
    chat_list.value[founded_chat].has_new_message = false;
  }
};

const updateChat = async () => {
  try {
    const { data } = await http.get("message/chat-list");
    chat_list.value = data.content;
  } catch (e) {
    console.error("error");
  }
};

const getChats = async () => {
  try {
    loading_chat.value = true;
    const { data } = await http.get("message/chat-list");
    chat_list.value = data.content;
    // console.log(data.content, "lista de conversations");
    loading_chat.value = false;
  } catch (e) {
    console.error("error");
    loading_chat.value = false;
  }
};

getChats();
</script>

<template>
  <!-- <pre>
    {{ store.$token }}
  </pre>-->
  <!-- <button @click="getChats()">FORCE RELOAD</button> -->

  <div class="chat-list">
    <div v-if="chat_list.length && !loading_chat" class="chat-list__list">
      <template v-for="(item, i) in chat_list" :key="i">
        <div class="item" @click="openChat(item)">
          <div class="left">
            <figure></figure>
            <div class="texts">
              <strong>{{ item.conversation_name }}</strong>
            </div>
          </div>

          <div class="right">
            <div class="texts">
              <!--      <div class="hour"><span>09:00 pm</span></div> -->
              <Badge
                v-if="item?.has_new_message"
                value=""
                severity="info"
                style="display: flex; align-items: center"
                >+<i
                  class="pi pi-envelope"
                  style="font-size: 0.7rem; margin-left: 0.5rem"
                ></i
              ></Badge>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="loading_chat" class="chat-list__loading">
      <template v-for="item in 4" :key="item">
        <div>
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div class="align-self-center" style="flex: 1">
            <Skeleton width="100%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
            <Skeleton width="75%"></Skeleton>
          </div>
        </div>
      </template>
    </div>

    <div v-if="!chat_list.length && !loading_chat" class="chat-list__no-data">
      <span>Inicie uma conversa😁</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-list {
  height: auto;

  &__list {
    padding: 0.6rem;

    .item {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: 0.3s ease-in-out;
      cursor: pointer;

      &:not(:last-child) {
        border-bottom: 1px solid #e6e6e6;
      }

      &:hover {
        background: #f4f4f4;
      }

      .left {
        display: flex;
        gap: 0.7rem;
        align-items: center;
        figure {
          width: 38px;
          height: 38px;
          background: #cdcdcd;
          border-radius: 50%;
        }

        strong {
          font-size: 0.85rem;
        }
        small {
          // flex: 1 1 auto;
          // display: inline-block;
          // white-space: nowrap;
          // overflow: hidden !important;
          // text-overflow: ellipsis;
        }
      }

      .right {
        .texts {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;

          .hour {
            span {
              font-weight: 600;
              font-size: 0.6rem;
            }
          }

          .chip {
            background: #0ea5e9;
            color: white;
            display: inline-flex;
            padding: 0.2rem;
            border-radius: 50%;
            span {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }
        }
      }
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    & > div {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
  &__no-data {
    height: 50vh;
    height: 50dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
}
</style>
