<script setup>
// IMPORTS
import HomeChatHeader from "@/components/molecules/HomeChatHeader.vue";
import HomeChatList from "@/components/molecules/HomeChatList.vue";

//PROPS
const props = defineProps({
  dinamyc_key_to_chat_list: { type: Number, default: 0 },
});


</script>

<template>
  <main class="container-mobile">
    <section class="container-mobile__profile">
      <HomeChatHeader
        @open-friends-list="$emit('openFriendsListModal')"
        @add-friend="$emit('add-friend')"
        @open-option-dialog="$emit('open-option-dialog')"
        @open-profile="$emit('open-profile')"
        @new-group="$emit('new-group')"
      />
    </section>

    <section class="container-mobile__chat">
      <HomeChatList
        :key="props.dinamyc_key_to_chat_list"
        @open-chat="$emit('open-chat', $event)"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.container-mobile {
  border-radius: 13px;
  overflow: hidden;
  -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.45);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr; /* Uma coluna para o profile e outra para o container-mobile */
  grid-template-rows: 160px auto auto; /* Três linhas automáticas */

  &__profile {
    grid-column: 1; /* A área profile começa na primeira coluna */
    grid-row: 1; /* E na primeira linha */
    min-width: 350px;
    transition: 0.2s ease-in-out;
  }
  &__content {
    grid-column: 2 / span 1; /* O container-mobile começa na segunda coluna */
    grid-row: 1 / span 3; /* E ocupa três linhas */
    overflow: auto;
  }
  &__chat {
    grid-column: 1; /* O chat também começa na primeira coluna */
    grid-row: 2 / span 2; /* E ocupa duas linhas */
    overflow: auto;
    min-width: 350px;
    transition: 0.2s ease-in-out;
    @include trackScrollBar;
  }

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
  

   
  }
}


</style>
