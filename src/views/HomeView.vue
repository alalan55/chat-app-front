<script setup>
import HomeTemplate from "@/components/templates/homeTemplate.vue";
</script>

<template>
  <main class="home-view">
    <HomeTemplate />
  </main>
</template>

<style lang="scss" scoped>
.home-view {
  height: 100vh;
  height: 100dvh;
  padding: 2rem;

  @media(max-width: 750px){
    padding: 1rem;
  }
}
</style>
