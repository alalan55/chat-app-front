<script setup>
import Button from "primevue/button";
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
      <input type="text" placeholder="Friend ID do usuário" />
    </div>

    <div class="modal--action">
      <Button label="Adicionar" />
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
    input {
      width: 100%;
      border-radius: 10px;
      border: none;
      background: #eff2f5;
      padding: 0.8rem;
      font-weight: 600;
      color: #3f3f3f;
      &:focus {
        outline: none;
      }
    }
  }

  &--action {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      // width: 30%;
      // margin: 0 auto;
      // padding: 0.7rem 0.5rem;
      // border: none;
      // font-weight: 700;
      // font-size: 0.75rem;
      // cursor: pointer;
    }
  }
}
</style>
