<script setup>
import Button from "primevue/button";
import TheInput from "../atoms/TheInput.vue";
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Adicionar amizade</span>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="$emit('close')"></i>
      </div>
    </div>

    <div class="modal__middle">
      <p>Insira o <strong>friend ID</strong> do usuário a ser adicionado</p>
    </div>

    <div class="modal__body">
      <TheInput placeholder="Friend ID do usuário" />
    </div>

    <div class="modal--action">
      <Button label="Adicionar"  severity="info" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.modal {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      .title {
        span {
          font-size: 1.2rem;
          font-weight: 600;
        }
      }
    }

    .right {
      i {
        cursor: pointer;
      }
    }
  }

  &__body {
  }

  &--action {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
    }
  }
}
</style>
