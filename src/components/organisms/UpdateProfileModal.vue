<script setup>
// IMPORTS
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import TheInput from "../atoms/TheInput.vue";
import Button from "primevue/button";
import http from "@/services/axios";

// VARIABLES
const store = useUserStore();
const current_user = ref(null);
const loading = ref(false);
const toast = useToast();
current_user.value = { ...store.$current_user };

// FUNCTIONS
const updateUser = async () => {
  try {
    loading.value = true;
    const { data } = await http.put(`${current_user.value.id}`, current_user.value);

    toast.add({
      severity: "success",
      summary: "Sucesso!",
      detail: "Perfil atualizado com sucesso",
      life: 3000,
    });

    console.log(data);
    loading.value = false;

    getUserInfo();
  } catch (e) {
    loading.value = false;
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Falha ao atualizar perfil",
      life: 3000,
    });
  }
};

const getUserInfo = async () => {
  try {
    const { data } = await http.get(`${current_user.value.id}`);
    store.setCurrentUser(data.content);
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Atualização de perfil </span>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="$emit('close')"></i>
      </div>
    </div>

    <div class="modal__body">
      <div class="modal__body__figure">
        <figure></figure>
      </div>

      <div class="modal__body__form">
        <label>
          E-mail
          <TheInput
            v-model="current_user.email"
            icon-left="pi pi-at"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Nome
          <TheInput
            v-model="current_user.name"
            icon-left="pi pi-user"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Status
          <TheInput
            v-model="current_user.status"
            icon-left="pi pi-comment"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Senha atual
          <TheInput
            icon-left="pi pi-lock"
            :icon-right="'pi pi-eye'"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Nova senha
          <TheInput
            icon-left="pi pi-lock"
            :icon-right="'pi pi-eye'"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Confirmação de senha
          <TheInput
            icon-left="pi pi-lock"
            :icon-right="'pi pi-eye'"
            style="margin-top: 0.8rem"
          />
        </label>
      </div>
    </div>

    <div class="modal__footer">
      <Button :loading="loading" label="Atualizar" severity="info" @click="updateUser">
        <template #icon>
          <i class="pi pi-save" style="margin-right: 0.5rem"></i>
        </template>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.modal {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 90dvh;

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
    padding: 0.5rem;
    flex: 1;
    overflow: auto;
    @include trackScrollBar;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__figure {
      display: flex;
      align-items: center;
      justify-content: center;

      figure {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: #cdcdcd;

        @media (max-width: 750px) {
          width: 180px;
          height: 180px;
        }
      }
    }

    &__form {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));

      label {
        font-weight: 500;
        font-size: 0.9rem;
      }

      @media (max-width: 750px) {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
