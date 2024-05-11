<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";
import Badge from "primevue/badge";

// EMITS
const emit = defineEmits(["back-previous-page", "close"]);

// VARIABLES
const store = useUserStore();
const toast = useToast();
const current_chat_infos = ref(null);
const loading_infos = ref(false);

// FUNCTIONS
const getChatInformation = async () => {
  try {
    loading_infos.value = true;
    const chat_id = store.$activeChat.id;
    const { data } = await http.get(`message/get-chat-info/${chat_id}`);
    current_chat_infos.value = data.content;
    // console.log(data, "informations hereee");
    loading_infos.value = false;
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Falha ao obter informações do chat",
      life: 3000,
    });
    loading_infos.value = false;
  }
};

getChatInformation();
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <Button
        size="small"
        icon="pi pi-times"
        text
        rounded
        severity="info"
        aria-label="Cancel"
        @click="emit('close')"
      />
    </div>

    <!-- CONVERSA EM GRUPO  -->
    <template v-if="current_chat_infos?.conversation_type && !loading_infos">
      <div class="profile__middle">
        <Skeleton
          v-if="loading_infos"
          shape="circle"
          size="11rem"
          class="mr-2"
        ></Skeleton>
        <figure v-else></figure>

        <span class="name">
          {{ current_chat_infos?.conversation_name || "Nome não encontrado" }}
        </span>

        <small
          >{{ current_chat_infos?.conversation_type ? "Grupo" : "Pessoal" }} -
          {{ current_chat_infos?.participants.length }} membros</small
        >

        <div class="profile__middle__description"></div>
      </div>

      <div class="profile__body-group">
        <!-- <span> {{ current_chat_infos.participants.length }} membros</span> -->

        <ul>
          <template v-if="loading_infos">
            <li v-for="item in 3" :key="item" class="user">
              <div class="left">
                <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>

                <div class="texts" style="width: 100%">
                  <Skeleton
                    width="40%"
                    class="mb-2"
                    style="margin-bottom: 1rem"
                  ></Skeleton>
                  <Skeleton width="75%"></Skeleton>
                </div>
              </div>
              <div class="right"></div>
            </li>
          </template>

          <template v-if="!loading_infos && !current_chat_infos?.participants.length">
            <span>Usuários não encontrado</span>
          </template>

          <template v-if="!loading_infos && current_chat_infos?.participants.length">
            <li
              v-for="user in current_chat_infos?.participants"
              :key="user.id"
              class="user"
            >
              <div class="left">
                <figure></figure>
                <div class="texts">
                  <span>{{ user.name }} </span>
                  <small># {{ user.shared_id }}</small>
                </div>
              </div>
              <div class="right">
                <Badge
                  v-if="current_chat_infos?.created_by == user.id"
                  severity="success"
                  value="Admin"
                />
              </div>
            </li>
          </template>
        </ul>
      </div>
    </template>

    <!-- CONVERSA PRIVADA -->
    <template v-if="!current_chat_infos?.conversation_type && !loading_infos">
      <div class="profile__body-private">
        <div class="profile__body-private__cover">
          <figure class="figure-cover">
            <img src="/img/bg.jpg" alt="" />
          </figure>
          <figure class="figure-profile">
            <img src="/img/eu.jpg" alt="" />
          </figure>
        </div>

        <div class="profile__body-private__content">
          <div class="texts">
            <strong>
              {{ current_chat_infos?.participants.name || "Nome não encontrado" }}
            </strong>
            <br />
            <small># {{ current_chat_infos?.participants.shared_id }} </small>
            <p>
              <cite>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nihil
                minus enim beatae nulla ab cumque a cum illo, harum fugit dolorum nam
                neque id, esse sunt suscipit fugiat nisi.</cite
              >
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- LOADING DE INFOMAÇÕES -->
    <template v-if="loading_infos">
      <div class="profile__middle">
        <Skeleton
          v-if="loading_infos"
          shape="circle"
          size="11rem"
          class="mr-2"
        ></Skeleton>
        <figure v-else></figure>

        <span class="name">
          <Skeleton width="75%"></Skeleton>
        </span>

        <small>
          <Skeleton width="40%" class="mb-2" style="margin-bottom: 1rem"></Skeleton
        ></small>

        <div class="profile__middle__description"></div>
      </div>

      <div class="profile__body-group">
        <ul>
          <li v-for="item in 3" :key="item" class="user">
            <div class="left">
              <Skeleton
                shape="circle"
                size="4rem"
                class="mr-2"
                style="width: 75px"
              ></Skeleton>

              <div class="texts" style="width: 100%">
                <Skeleton width="40%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
                <Skeleton width="75%"></Skeleton>
              </div>
            </div>
            <div class="right"></div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.profile {
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
            }
          }
        }

        &:hover {
          background: #ececec;
        }
      }
    }
  }

  &__body-private {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &__cover {
      background: grey;
      width: 100%;
      height: 230px;
      //   height: 30dvh;
      border-radius: 10px;
      position: relative;
      margin-bottom: 4.5rem;

      .figure-cover {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .figure-profile {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: #cdcdcd;
        margin-bottom: 1.2rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -60%);
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &__content {
      .texts {
        text-align: center;
        bo strong {
          font-size: 1.6rem;
          font-weight: 800;
          color: #303030;
        }

        p {
          text-align: justify;
          display: block;
          margin-top: 1.5rem;
        }
      }
    }
  }

  & > div {
    // border: 3px solid;
  }
}
</style>
