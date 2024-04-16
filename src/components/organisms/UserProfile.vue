<script setup></script>

<template>
  <div class="profile">
    <div class="profile__header">
      <figure></figure>
      <span>Usuário da Silva Sauro</span>
      <small>fulano@fulanoteste.com</small>
    </div>

    <div class="profile__body">
      <span
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maxime esse sint
        quam, corporis rerum facilis dolorum, sapiente error quae consequatur aperiam
        ipsam quisquam perferendis illo eos id architecto accusantium.</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1.5rem;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    figure {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: #cdcdcd;
    }

    span {
      font-weight: 600;
      font-size: 1.5rem;
    }
  }
  &__body {
    text-align: center;
    max-width: 70%;
  }
}
</style>
