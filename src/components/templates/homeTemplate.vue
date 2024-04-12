<script setup>
import HomeChatHeader from "@/components/molecules/HomeChatHeader.vue";
// import HomeMainChats from "@/components/organisms/HomeMainChats.vue";
import HomeChatList from "@/components/molecules/HomeChatList.vue";
</script>

<template>
  <main class="container">
    <div class="container__profile">
      <HomeChatHeader />
    </div>
    <div class="container__content">fala meu consagrado</div>
    <div class="container__chat">
      <HomeChatList />
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  border-radius: 10px;
  overflow: hidden;
  -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr; /* Uma coluna para o profile e outra para o container */
  grid-template-rows: auto auto auto; /* Três linhas automáticas */

  &__profile {
    grid-column: 1; /* A área profile começa na primeira coluna */
    grid-row: 1; /* E na primeira linha */
  }
  &__content {
    grid-column: 2 / span 1; /* O container começa na segunda coluna */
    grid-row: 1 / span 3; /* E ocupa três linhas */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__chat {
    grid-column: 1; /* O chat também começa na primeira coluna */
    grid-row: 2 / span 2; /* E ocupa duas linhas */
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }
}
</style>
