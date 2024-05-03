<script setup>
// IMPORTS
import { ref } from "vue";
import Badge from "primevue/badge";
import http from "@/services/axios";
import Skeleton from "primevue/skeleton";

// EMITS
const emit = defineEmits(["open-chat"]);

// VARIABLES
const chat_list = ref([]);
const loading_chat = ref(false);

// FUNCTIONS

const getChats = async () => {
  try {
    loading_chat.value = true;
    const { data } = await http.get("chat-list");
    chat_list.value = data.content;
    console.log(data.content, "lista de conversations");
    loading_chat.value = false;
  } catch (e) {
    console.error("error");
    loading_chat.value = false;
  }
};

getChats();
</script>

<template>
  <!-- <button @click="getChats()">FORCE RELOAD</button> -->

  <div class="chat-list">
    <div v-if="chat_list.length && !loading_chat" class="chat-list__list">
      <template v-for="(item, i) in chat_list" :key="i">
        <div class="item" @click="emit('open-chat', item)">
          <div class="left">
            <figure></figure>
            <div class="texts">
              <strong>{{ item.conversation_name }}</strong>
              <!-- <br />
            <small>Alguma mensagem...</small> -->
            </div>
          </div>

          <div class="right">
            <div class="texts">
              <div class="hour"><span>09:00 pm</span></div>
              <Badge value="" severity="info"></Badge>
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
