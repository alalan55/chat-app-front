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
    console.log(data.content);
    loading_chat.value = false;
  } catch (e) {
    console.error("error");
    loading_chat.value = false;
  }
};

// const mock_users = [
//   {
//     name: "Bob Taylor",
//     age: 32,
//     email: "bob.taylor@example.com",
//   },
//   {
//     name: "Charlie Miller",
//     age: 22,
//     email: "charlie.miller@example.com",
//   },
//   {
//     name: "David Jones",
//     age: 64,
//     email: "david.jones@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     age: 69,
//     email: "charlie.brown@example.com",
//   },
//   {
//     name: "Emma Davis",
//     age: 47,
//     email: "emma.davis@example.com",
//   },
//   {
//     name: "Emma Davis",
//     age: 20,
//     email: "emma.davis@example.com",
//   },
//   {
//     name: "Charlie Moore",
//     age: 38,
//     email: "charlie.moore@example.com",
//   },
//   {
//     name: "Emma Smith",
//     age: 67,
//     email: "emma.smith@example.com",
//   },
//   {
//     name: "David Jones",
//     age: 30,
//     email: "david.jones@example.com",
//   },
//   {
//     name: "Bob Taylor",
//     age: 45,
//     email: "bob.taylor@example.com",
//   },
//   {
//     name: "Henry Johnson",
//     age: 24,
//     email: "henry.johnson@example.com",
//   },
//   {
//     name: "Jack Moore",
//     age: 50,
//     email: "jack.moore@example.com",
//   },
//   {
//     name: "Grace Miller",
//     age: 24,
//     email: "grace.miller@example.com",
//   },
//   {
//     name: "David Smith",
//     age: 41,
//     email: "david.smith@example.com",
//   },
//   {
//     name: "Charlie Jones",
//     age: 24,
//     email: "charlie.jones@example.com",
//   },
//   {
//     name: "Charlie Brown",
//     age: 57,
//     email: "charlie.brown@example.com",
//   },
//   {
//     name: "Grace Johnson",
//     age: 22,
//     email: "grace.johnson@example.com",
//   },
//   {
//     name: "Grace Brown",
//     age: 48,
//     email: "grace.brown@example.com",
//   },
//   {
//     name: "Henry Miller",
//     age: 48,
//     email: "henry.miller@example.com",
//   },
//   {
//     name: "Jack Davis",
//     age: 43,
//     email: "jack.davis@example.com",
//   },
// ];

getChats();
</script>

<template>
  <div class="chat-list">
    <div v-if="chat_list.length && !loading_chat" class="chat-list__list">
      <template v-for="(item, i) in chat_list" :key="i">
        <div class="item" @click="emit('open-chat')">
          <div class="left">
            <figure></figure>
            <div class="texts">
              <strong>{{ item.name }}</strong>
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
  
  &__loading{
      display: flex;
      flex-direction: column;
      gap: .6rem;
      &>div{
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: .5rem;
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
