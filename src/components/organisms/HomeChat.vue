<script setup>
import { ref } from "vue";
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
  console.log(emoji);
  message.value += emoji.i;
  toggleEmoji();
};
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
        <li v-for="item in 100" :key="item">
          <span>ALAN DE OLIVEIRA FERREIRA {{ item }}</span>
        </li>
      </ul>
    </div>

    <div class="profile__footer">
      <TheInput
        v-model="message"
        class="inpt"
        icon-left="pi pi-face-smile"
        @left-icon-click="toggleEmoji"
      >
        <template v-if="show_emojis" #custom-info>
          <EmojiPicker :native="true" class="emoji-finder" @select="onSelectEmoji" />
        </template>
      </TheInput>
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
    border: 1px solid #b8b6b6;
    margin: 0 1rem;
    border-radius: 5px;
    overflow-y: auto;
    @include trackScrollBar;
    margin-top: 1rem;
  }

  &__footer {
    height: 70px;
    padding: 0 1rem;
    display: flex;
    align-items: center;

    .inpt {
      flex: 1;

      .emoji-finder {
        position: absolute;
        bottom: 90%;
      }
    }
  }

  & > div {
    // border: 2px solid red;
  }
}
</style>
