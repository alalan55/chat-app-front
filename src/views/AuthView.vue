<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <main class="wrapper">
    <div class="wrapper__left">
      <RouterView />
    </div>
    <div class="wrapper__right"></div>
  </main>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  height: 100dvh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));


  &__left {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__right {
    background: black;
    background: url("/img/bg2.jpg") no-repeat;
    background-size: cover;
    background-position: center;
  }
}
</style>
