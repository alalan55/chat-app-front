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
    <div class="profile__middle">
      <figure></figure>
      <span class="name">{{ store.$current_user?.name || "Nome não encontrado" }}</span>
      <small>{{ store.$current_user?.email || "E-mail não encontrado" }}</small>

      <div class="profile__middle__description">
        <span>
          {{ store.$current_user?.status || message_default }}
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
