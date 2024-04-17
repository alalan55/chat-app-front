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
      <figure></figure>
      <span class="name">CHAAAAAT</span>
      <small>fulano@fulanoteste.com</small>

      <div class="profile__middle__description">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maxime esse sint
          quam, corporis rerum facilis dolorum, sapiente error quae consequatur aperiam
          ipsam quisquam perferendis illo eos id architecto accusantium.
        </span>
      </div>
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
.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // padding: 1rem;
  gap: 1.5rem;

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    figure {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: #cdcdcd;
      margin-bottom: 1.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.5rem;
    }

    &__description {
      margin-top: 1rem;
      text-align: center;
      max-width: 70%;
    }
  }

  &__footer {
    height: 70px;
    padding: 1rem;
    display: flex;
    align-items: center;

    .inpt {
      // position: relative;
      flex: 1;

      .emoji-finder {
        position: absolute;
        bottom: 90%;
      }
    }
  }
}
</style>
