<script setup>
import HomeChatHeader from "../molecules/HomeChatHeader.vue";
import HomeChatList from "../molecules/HomeChatList.vue";
</script>

<template>
  <div class="conversations">
    <HomeChatHeader class="search" />
    <HomeChatList class="list" />
  </div>
</template>

<style lang="scss" scoped>
.conversations {
  display: flex;
  flex-direction: column;
  border: 3px solid;
  .list {
    // flex: 1;
  }
}
</style>
