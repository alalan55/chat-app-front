<script setup>
// IMPORTS
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";
import Skeleton from "primevue/skeleton";
import Menu from "primevue/menu";
import Badge from "primevue/badge";

// PROPS
const props = defineProps({
  current_chat_infos: { type: Object, default: null },
  loading_infos: { type: Boolean, default: false },
});

// VARIABLES
const { copy } = useClipboard();
const menu = ref();
const items = ref([
  {
    label: "Opções",
    items: [
      {
        label: "Tornar admin",
        icon: "pi pi-pencil",
        type: 0,
      },
      {
        label: "Visualizar Perfil",
        icon: "pi pi-user",
        type: 2,
      },
      {
        label: "Remover usuário",
        icon: "pi pi-times",
        type: 1,
      },
    ],
  },
]);
const menu_options = ref([]);

// FUNCTIONS
const toggleOptionsMenu = (event, user) => {
  const can_show_make_admin = props.current_chat_infos.created_by == user.id;

  //visão geral

  // visão de usuário que é admin

  // visão de usuário que é admin, porém não é ele que foi clicado

  if (!can_show_make_admin) {
    menu_options.value = items.value;
  } else {
    menu_options.value = items.value[0].items.filter((e) => e.type != 0);
  }
  menu.value.toggle(event);
};
</script>

<template>
  <div class="group-info">
    <div class="group-info__middle">
      <Skeleton
        v-if="props.loading_infos"
        shape="circle"
        size="11rem"
        class="mr-2"
      ></Skeleton>
      <figure v-else></figure>

      <span class="name">
        {{ props.current_chat_infos?.conversation_name || "Nome não encontrado" }}
      </span>

      <small
        >{{ props.current_chat_infos?.conversation_type ? "Grupo" : "Pessoal" }} -
        {{ props.current_chat_infos?.participants.length }} membros</small
      >

      <div class="group-info__middle__description"></div>
    </div>

    <div class="group-info__body-group">
      <ul>
        <template v-if="props.loading_infos">
          <li v-for="item in 3" :key="item" class="user">
            <div class="left">
              <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>

              <div class="texts" style="width: 100%">
                <Skeleton width="40%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
                <Skeleton width="75%"></Skeleton>
              </div>
            </div>
            <div class="right"></div>
          </li>
        </template>

        <template
          v-if="!props.loading_infos && !props.current_chat_infos?.participants.length"
        >
          <span>Usuários não encontrado</span>
        </template>

        <template
          v-if="!props.loading_infos && props.current_chat_infos?.participants.length"
        >
          <li
            v-for="user in props.current_chat_infos?.participants"
            :key="user.id"
            class="user"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            @click="toggleOptionsMenu($event, user)"
          >
            <div class="left">
              <figure></figure>
              <div class="texts">
                <span>{{ user.name }} </span>
                <small @click="copy(user.shared_id)"># {{ user.shared_id }}</small>
              </div>
            </div>
            <div class="right">
              <Badge
                v-if="props.current_chat_infos?.created_by == user.id"
                severity="success"
                value="Admin"
              />
            </div>
          </li>
          <Menu ref="menu" id="overlay_menu" :model="menu_options" :popup="true">
            <template #item="{ item }">
              <div
                style="
                  gap: 0.8rem;
                  display: flex;
                  align-items: center;
                  padding: 0.5rem;
                  cursor: pointer;
                "
              >
                <i :class="item.icon" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </Menu>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.group-info {
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

  &__middle {
    // flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    figure {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: #cdcdcd;
      margin-bottom: 1.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.5rem;
    }

    &__description {
      //   margin-top: 1rem;
      text-align: center;
      max-width: 70%;
    }
  }

  &__body-group {
    flex: 1;
    overflow-y: auto;
    @include trackScrollBar;
    // border: 1px solid red;
    // padding: 0.5rem;

    ul {
      margin-top: 0.5rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      li {
        list-style: none;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.2s ease-in-out;

        .left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          figure {
            width: 70px;
            height: 70px;
            background: #cdcdcd;
            border-radius: 50%;
          }
          .texts {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            span {
              font-weight: 500;
            }
            small {
              font-size: 0.7rem;
              cursor: pointer;
            }
          }
        }

        &:hover {
          background: #ececec;
        }
      }
    }
  }
}
</style>
