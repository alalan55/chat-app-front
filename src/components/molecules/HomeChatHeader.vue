<template>
  <div class="wrapper">
    <div class="wrapper__profile">
      <figure></figure>
      <div class="actions">
        <i
          v-tooltip="'Nova conversa'"
          class="pi pi-users"
          @click="$emit('open-friends-list')"
        />
        <i v-tooltip="'Novo grupo'" class="pi pi-comments" />
        <i v-tooltip="'Adicionar amigo'" class="pi pi-user-plus" />
      </div>
    </div>
    <div class="wrapper__input">
      <input type="text" placeholder="Pesquisar" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  &__profile {
    background: #ebeaea;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;

    figure {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #cdcdcd;
      cursor: pointer;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1.3rem;
      i {
        font-size: 1.2rem;
        color: #505b6d;
        cursor: pointer;
      }
    }
  }
  &__input {
    padding: 0.5rem 0.8rem;
    input {
      width: 100%;
      border-radius: 10px;
      border: none;
      background: #edf2f6;
      flex: 3;
      // padding: 1rem 25px 1rem 2.5rem;
      padding: 0.8rem;
      font-weight: 600;
      color: #3f3f3f;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
