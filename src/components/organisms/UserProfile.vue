<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Button from "primevue/button";

// EMITS
const emit = defineEmits(["back-previous-page"]);
const message_default = ref(
  "Em uma jornada de autodescoberta pelas encruzilhadas do destino, entretecendo sonhos e realidade em um intricado mosaico de experiências, enquanto navego pelas marés tumultuosas da vida, buscando a essência que me define e me impulsiona a transcender os limites do conhecido."
);

// VARIABLES
const store = useUserStore();
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

    <div class="profile__cover">
      <figure class="figure-cover">
        <img src="/img/bg3.jpg" alt="" />
      </figure>

      <div class="profile__cover__user-box">
        <figure class="figure-profile">
          <img src="/img/eu.jpg" alt="" />
        </figure>
      </div>
    </div>

    <div class="profile__middle">
      <div class="profile__middle__presentation">
        <span class="name">
          {{ store.$current_user?.name || "Nome não encontrado" }}
        </span>

        <small>
          {{ store.$current_user?.email || "E-mail não encontrado" }}
        </small>
      </div>

      <div class="profile__middle__description">
        <p>
          <cite>
            {{ store.$current_user?.status || message_default }}
          </cite>
        </p>
      </div>

      <div class="profile__middle__metrics">
        <div class="profile__middle__metrics__item">
          <strong> {{ store.$current_user.groups_quantity || "0" }}</strong>

          <small>Grupos</small>
        </div>

        <div class="profile__middle__metrics__item">
          <strong> {{ store.$current_user.messages_quantity || "0" }}</strong>

          <small>Mensagens enviadas</small>
        </div>

        <div class="profile__middle__metrics__item">
          <strong> {{ store.$current_user.friends_quantity || "0" }}</strong>

          <small>Amigos</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;
  padding: 1rem;
  gap: 1.5rem;
  position: relative;

  display: flex;
  flex-direction: column;
  &__header {
    position: absolute;
    z-index: 10;
    right: 15px;
  }

  &__cover {
    height: 40vh;
    height: 40dvh;
    margin-bottom: 3.3rem;
    position: relative;

    .figure-cover {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__user-box {
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: -70px;
      .figure-profile {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: #cdcdcd;
        overflow: hidden;
        border: 8px solid #fff;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  &__middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    justify-content: space-between;
    gap: 0.1rem;

    & > div {
      // border: 1px solid red;
    }

    &__presentation {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .name {
        font-weight: 700;
        font-size: 1.5rem;
      }
    }

    &__description {
      margin-top: 1rem;
      text-align: center;
      max-width: 85%;
    }

    &__metrics {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 0.8rem;
      &__item {
        padding: 0.8rem;
        flex: 1 1 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        text-align: center;

        small {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
