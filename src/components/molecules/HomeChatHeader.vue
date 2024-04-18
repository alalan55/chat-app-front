<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import TheInput from "../atoms/TheInput.vue";
import Menu from "primevue/menu";

// EMITS
const emit = defineEmits([
  "openOptionDialog",
  "open-profile",
  "open-friends-list",
  "add-friend",
]);

// VARIABLES
const menu = ref();
const items = ref([
  {
    label: "Opções",
    items: [
      {
        label: "Solicitações",
        icon: "pi pi-users",
        type: 0,
      },
      {
        label: "Export",
        icon: "pi pi-upload",
        type: 1,
      },
      {
        label: "Editar perfil",
        icon: "pi pi-user-edit",
        type: 2,
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        type: 3,
      },
    ],
  },
]);
const store = useUserStore();

// FUNCTIONS
const chooseOption = (e) => emit("openOptionDialog", e);

const toggleOptionsMenu = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="wrapper">
    <div class="wrapper__profile">
      <div class="box-image">
        <figure @click="emit('open-profile')"></figure>
        <small># {{ store.$current_user.shared_id }}</small>
      </div>
      <div class="actions">
        <i
          v-tooltip="'Nova conversa'"
          class="pi pi-users"
          @click="emit('open-friends-list')"
        />
        <i v-tooltip="'Novo grupo'" class="pi pi-comments" />
        <i
          v-tooltip="'Adicionar amigo'"
          class="pi pi-user-plus"
          @click="emit('add-friend')"
        />
        <i
          v-tooltip="'Mais opções'"
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
    <div class="wrapper__input">
      <TheInput :icon-left="'pi pi-search'" placeholder="Pesquisar" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  &__profile {
    background: #ebeaea;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;

    .box-image {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      figure {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #cdcdcd;
        cursor: pointer;
      }

      small{
        font-weight: 600;
        font-size: .75rem;
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1.1rem;
      i {
        // font-size: 1.12rem;
        color: #505b6d;
        cursor: pointer;
        font-size: .95rem;
      }

      .item-menu {
        background: red;
      }
    }
  }
  &__input {
    padding: 0.5rem 0.8rem;
  }
}
</style>
