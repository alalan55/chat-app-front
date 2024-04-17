<script setup>
import { ref } from "vue";

const id = Date.now();
const url = `ws://localhost:8000/ws/${id}`;
const socket = ref(null);
const message = ref("");
const messages_list = ref([]);

socket.value = new WebSocket(url);

socket.value.onmessage = (event) => {
  messages_list.value.push(event.data);
};

const sendMessage = (event) => {
  if (message.value.trim() !== "") {
    socket.value.send(message.value);
    message.value = "";
    event.preventDefault();
  }
};

// const messages = [
//   {
//     id: 0,
//     message: "Fiz parte de equipes como mibr GamerHouse.",
//     user: "Nome 0",
//     isCurrentUser: true,
//   },
//   {
//     id: 1,
//     message: "Mensagem aleatórioa 1",
//     user: "Nome 1",
//     isCurrentUser: false,
//   },
//   {
//     id: 2,
//     message: "Mensagem aleatórioa 2",
//     user: "Nome 2",
//     isCurrentUser: true,
//   },
//   {
//     id: 3,
//     message: "Mensagem aleatórioa 3",
//     user: "Nome 3",
//     isCurrentUser: false,
//   },
//   {
//     id: 4,
//     message: "Mensagem aleatórioa 4",
//     user: "Nome 4",
//     isCurrentUser: true,
//   },
//   {
//     id: 5,
//     message: "Mensagem aleatórioa 5",
//     user: "Nome 5",
//     isCurrentUser: false,
//   },
//   {
//     id: 6,
//     message: "Mensagem aleatórioa 6",
//     user: "Nome 6",
//     isCurrentUser: true,
//   },
//   {
//     id: 7,
//     message: "Mensagem aleatórioa 7",
//     user: "Nome 7",
//     isCurrentUser: false,
//   },
//   {
//     id: 8,
//     message: "Mensagem aleatórioa 8",
//     user: "Nome 8",
//     isCurrentUser: true,
//   },
//   {
//     id: 9,
//     message: "Mensagem aleatórioa 9",
//     user: "Nome 9",
//     isCurrentUser: false,
//   },
//   {
//     id: 10,
//     message: "Mensagem aleatórioa 10",
//     user: "Nome 10",
//     isCurrentUser: true,
//   },
//   {
//     id: 11,
//     message: "Mensagem aleatórioa 11",
//     user: "Nome 11",
//     isCurrentUser: false,
//   },
//   {
//     id: 12,
//     message: "Mensagem aleatórioa 12",
//     user: "Nome 12",
//     isCurrentUser: true,
//   },
//   {
//     id: 13,
//     message: "Mensagem aleatórioa 13",
//     user: "Nome 13",
//     isCurrentUser: false,
//   },
//   {
//     id: 14,
//     message: "Mensagem aleatórioa 14",
//     user: "Nome 14",
//     isCurrentUser: true,
//   },
//   {
//     id: 15,
//     message: "Mensagem aleatórioa 15",
//     user: "Nome 15",
//     isCurrentUser: false,
//   },
//   {
//     id: 16,
//     message: "Mensagem aleatórioa 16",
//     user: "Nome 16",
//     isCurrentUser: true,
//   },
//   {
//     id: 17,
//     message: "Mensagem aleatórioa 17",
//     user: "Nome 17",
//     isCurrentUser: false,
//   },
//   {
//     id: 18,
//     message: "Mensagem aleatórioa 18",
//     user: "Nome 18",
//     isCurrentUser: true,
//   },
//   {
//     id: 19,
//     message: "Mensagem aleatórioa 19",
//     user: "Nome 19",
//     isCurrentUser: false,
//   },
// ];
</script>

<template>
  <main>
    <div class="box-message">
      <span v-for="message in messages_list" :key="message">{{ message }}</span>
      <!-- <div class="item" v-for="item in messages" :key="item.id">
        <div>
          <div class="item__header">
            <strong>{{ item.user }}</strong>
          </div>
          <div class="item__body">
            <p>{{ item.message }}</p>
          </div>
        </div>
      </div> -->
    </div>
    <div class="box-texting">
      <input v-model="message" type="text" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Enviar mensagem</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100dvh;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  .box-message {
    flex: 3;
    border: 1px #b8b6b6 solid;
    border-radius: 10px;
    padding: 1.5rem 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 10px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    .item {
      & > div {
        display: inline-block;
        border: 1px solid #b8b6b6;
        padding: 0.5rem;
        border-radius: 10px;
        background: #303030;
        color: white;

        .item__header {
          margin-bottom: 0.4rem;
        }
      }

      &:nth-child(even) {
        & > div {
          float: right;
          text-align: right;
        }
      }

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
  .box-texting {
    display: flex;
    gap: 0.5rem;

    input {
      border-radius: 10px;
      border: 1px solid #b8b6b6;
      flex: 3;
      padding: 0.8rem 0.5rem;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.5rem;
      border-radius: 10px;
      border: none;
      font-weight: 700;
      font-size: 0.75rem;
      background: #3ebe53;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
