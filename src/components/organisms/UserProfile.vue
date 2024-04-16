<script setup>
import Button from "primevue/button";
const emit = defineEmits(["back-previous-page"]);
</script>

<template>
  <div class="profile">
    <div class="profile__header">
      <Button
        size="small"
        icon="pi pi-arrow-left"
        severity="info"
        text
        rounded
        aria-label="Cancel"
        @click="emit('back-previous-page')"
      />
    </div>
    <div class="profile__middle">
      <figure></figure>
      <span class="name">Usuário da Silva Sauro</span>
      <small>fulano@fulanoteste.com</small>

      <div class="profile__middle__description">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maxime esse sint
          quam, corporis rerum facilis dolorum, sapiente error quae consequatur aperiam
          ipsam quisquam perferendis illo eos id architecto accusantium.
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 1rem;
  gap: 1.5rem;

  &__middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    figure {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: #cdcdcd;
      margin-bottom: 1.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.5rem;
    }

    &__description {
      margin-top: 1rem;
      text-align: center;
      max-width: 70%;
    }
  }
}
</style>
