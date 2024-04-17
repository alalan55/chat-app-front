<script setup>
import { ref } from "vue";

import Button from "primevue/button";
import Menu from "primevue/menu";
import TheInput from "../atoms/TheInput.vue";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const emit = defineEmits(["back-previous-page"]);

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

const toggleOptionsMenu = (event) => {
  menu.value.toggle(event);
};

const toggleEmoji = () => (show_emojis.value = !show_emojis.value);

const onSelectEmoji = (emoji) => {
  message.value += emoji.i;
  toggleEmoji();
};

const messages_mock = [
  {
    id: 0,
    message: "Fala meu amigo, como é que você está?🤣",
    sender: 0,
  },
  {
    id: 2,
    message: "Tudo na pax meu manooo",
    sender: 1,
  },
  {
    id: 2,
    message: "E contigo?",
    sender: 1,
  },
  {
    id: 3,
    message: "Que bom mano, eu estou bem também!!",
    sender: 0,
  },
  {
    id: 4,
    message: "Como tem ido aí nas coisas mano?",
    sender: 0,
  },
  {
    id: 5,
    message: "Todos bem por aí?",
    sender: 0,
  },
  {
    id: 6,
    message:
      "por aqui tudo safe bro, minha mãe está bem graças a Deus, trabalho está fluindo legal, então não posso reclamar de nada não, só agradecer mesmo!🤗",
    sender: 1,
  },
  {
    id: 7,
    message: "Por aí mano?",
    sender: 1,
  },
  {
    id: 8,
    message: "Conseguiu resolver aqueles B.O's do trampo que voce tinha me falado hahah?",
    sender: 1,
  },
  {
    id: 9,
    message:
      "Pode acreditar que sim mano, foi difícil para um caramba kkkk mas no fim deu tudo certo, graças a Deus",
    sender: 0,
  },
];
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <div class="left">
        <figure></figure>
        <span>Nome do fulano</span>
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

      <!-- <Button
        size="small"
        icon="pi pi-arrow-left"
        severity="info"
        text
        rounded
        aria-label="Cancel"
        @click="emit('back-previous-page')"
      /> -->
    </div>

    <div class="profile__body">
      <ul>
        <template v-for="item in messages_mock" :key="item.id">
          <li :class="{ is_me: item.sender == 0 }" class="message">
            <div class="message__box">
              <span>{{ item.message }}</span>
            </div>
          </li>
        </template>
      </ul>
    </div>

    <div class="profile__footer">
      <Button
        icon="pi pi-face-smile"
        severity="secondary"
        outlined=""
        rounded
        aria-label="Open"
        @click="toggleEmoji"
      />
      <EmojiPicker
        v-show="show_emojis"
        :native="true"
        class="emoji-finder"
        @select="onSelectEmoji"
      />
      <TheInput v-model="message" class="inpt" placeholder="Digite uma mensagem" />
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
          display: inline-block;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          background: #ebebeb;
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
