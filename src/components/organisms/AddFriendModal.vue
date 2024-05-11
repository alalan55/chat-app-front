<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import TheInput from "../atoms/TheInput.vue";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";

const user_id = ref("");
const loading = ref(false);
const toast = useToast();

const emit = defineEmits(["close"]);

async function addFriend() {
  if (user_id.value.length) {
    try {
      loading.value = true;
      const { data } = await http.get(`user/add-friend?user_to_add_id=${user_id.value}`);

      let info = { severity: "", summary: "" };

      switch (data.status) {
        case 200:
          info.severity = "success";
          info.summary = "Sucesso";
          break;
        case 204:
          info.severity = "warning";
          info.summary = "Atenção";
          break;
      }

      toast.add({
        severity: info.severity,
        summary: info.summary,
        detail: data.message,
        life: 3000,
      });

      emit("close");

      loading.value = false;
    } catch (e) {
      const message = e.response.data.detail
        ? e.response.data.detail
        : "Falha ao adicionar usuário";

      toast.add({
        severity: "error",
        summary: "Falha",
        detail: message,
        life: 3000,
      });

      loading.value = false;
    }
  }
}
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
        <i class="pi pi-times" @click="emit('close')"></i>
      </div>
    </div>

    <div class="modal__middle">
      <p>Insira o <strong>friend ID</strong> do usuário a ser adicionado</p>
    </div>

    <div class="modal__body">
      <TheInput v-model="user_id" placeholder="Friend ID do usuário" />
    </div>

    <div class="modal--action">
      <Button label="Adicionar" :loading="loading" severity="info" @click="addFriend" />
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
