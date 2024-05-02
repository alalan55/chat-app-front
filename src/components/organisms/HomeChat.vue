<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Button from "primevue/button";
import Menu from "primevue/menu";
import TheInput from "../atoms/TheInput.vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

// EMITS
const emit = defineEmits(["back-previous-page"]);

// VARIABLES
// const id = Date.now();
// const socket = ref(null);
const store = useUserStore();
const current_chat = ref(store.$activeChat);
const current_user = ref(store.$current_user);
const url = `ws://localhost:8000/connect-conversation/${current_chat.value.id}?token=${store.$token}`;
const message = ref("");
const show_emojis = ref(false);
const menu = ref(null);
const items = ref([
  {
    label: "Dados do contato",
    type: 0,
  },
  {
    label: "Limpar conversa",
    type: 1,
  },
  {
    label: "Apagar conversa",
    type: 2,
  },
]);
const messages = ref([]);

// const ws = new WebSocket(url, null, { headers });
const ws = new WebSocket(url);

ws.onmessage = function (event) {
  messages.value.push(event.data);
  // console.log(event.data, "evento chegando aquiiii");
};

// FUNCTIONS
const sendMenssage = (e) => {
  if (e.key.toLowerCase() == "enter") {
    const message_model = {
      conversation_id: store.$activeChat.id,
      from_user: store.$current_user.shared_id,
      from_user_name: store.$current_user.name,
      to_user: "",
      message_text: message.value,
      sent_datetime: "str",
    };

    const parsed = JSON.stringify(message_model);

    ws.send(parsed);
    message.value = "";
  }
};

const toggleOptionsMenu = (event) => {
  menu.value.toggle(event);
};

const toggleEmoji = () => (show_emojis.value = !show_emojis.value);

const onSelectEmoji = (emoji) => {
  message.value += emoji.i;
  toggleEmoji();
};

const formateToJson = (datas) => {
  const infos = [];

  datas.forEach((str) => {
    const obj = JSON.parse(str);
    infos.push(obj);
  });

  return infos;
};
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <div class="left">
        <figure></figure>
        <span>{{ current_chat.conversation_name || "Nome não encontrado" }}</span>
      </div>
      <div class="right">
        <i
          class="pi pi-arrow-left"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="emit('back-previous-page')"
        ></i>
        <i
          v-tooltip.left="'Mais opções'"
          class="pi pi-ellipsis-v"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          @click="toggleOptionsMenu"
        ></i>

        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
          <template #item="{ item }">
            <div
              style="
                gap: 0.8rem;
                display: flex;
                align-items: center;
                padding: 0.5rem;
                cursor: pointer;
              "
              @click="chooseOption(item)"
            >
              <i :class="item.icon" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </Menu>
      </div>
    </div>

    <div class="profile__body">
      <ul>
        <template v-for="item in formateToJson(messages)" :key="item.id">
          <!-- {{ store.$activeChat }} conversation_type -->
          <!-- {{ item }} -->

          <li
            :class="{ is_me: item.from_user == current_user.shared_id }"
            class="message"
          >
            <div class="message__box">
              <small
                v-if="
                  store.$activeChat.conversation_type &&
                  item.from_user != current_user.shared_id
                "
              >
                <strong>{{ item.from_user_name }}</strong></small
              >
              <span>{{ item.message_text }}</span>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <div class="profile__footer">
      <Button
        icon="pi pi-face-smile"
        severity="secondary"
        outlined
        rounded
        raised
        aria-label="Open"
        @click="toggleEmoji"
      />
      <EmojiPicker
        v-show="show_emojis"
        :native="true"
        class="emoji-finder"
        @select="onSelectEmoji"
      />
      <TheInput
        v-model="message"
        class="inpt"
        placeholder="Digite uma mensagem"
        @keyup="sendMenssage"
      />
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

  &__header {
    padding: 1.5rem;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ebeaea;
    border-left: 1px solid #b8b6b6;

    i {
      color: #505b6d;
      cursor: pointer;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      figure {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #cdcdcd;
        cursor: pointer;
      }

      span {
        font-weight: 500;
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
  }

  &__body {
    flex: 1;
    // border: 1px solid #b8b6b6;
    // margin: 0 1rem;
    border-radius: 5px;
    overflow-y: auto;
    @include trackScrollBar;
    // margin-top: 1rem;
    padding: 0.5rem 1rem;

    ul {
      padding: 0;
      .message {
        list-style: none;
        margin-bottom: 1rem;

        &__box {
          max-width: 45%;
          display: inline-flex;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          background: #ebebeb;
          flex-direction: column;
          small {
            display: block;
            margin-bottom: 0.2rem;
          }
        }
      }

      .is_me {
        text-align: right;
        .message__box {
          background: #c1e5f5;
        }
      }
    }
  }

  &__footer {
    height: 70px;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    position: relative;
    gap: 0.5rem;

    .emoji-finder {
      position: absolute;
      bottom: 90%;
    }
    .inpt {
      flex: 1;
    }
  }

  & > div {
    // border: 2px solid red;
  }
}
</style>
