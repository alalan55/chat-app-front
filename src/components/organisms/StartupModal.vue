<script setup></script>

<template>
  <div class="profile">
    <div class="profile__header">
      <figure>
        <img src="/img/home-scream-3.jpg" alt="Pessoa falando ao megafone" />
      </figure>
      <span>Inicie sua jornada de comunicação aqui! </span>
      <small>
        Conectando você com o mundo: Inicie uma nova conversa e deixe suas mensagens
        voarem livremente!
      </small>
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
      width: 280px;
      height: 280px;
      border-radius: 50%;
      background: #cdcdcd;

      img {
        width: 100%;
        height: 100%;
      }
    }

    span {
      font-weight: 700;
      font-size: 1.35rem;
      color: #2a3338;
    }
  }
  &__body {
    text-align: center;
    max-width: 70%;
  }
}
</style>
