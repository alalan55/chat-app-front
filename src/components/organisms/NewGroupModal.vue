<script setup>
// IMPORTS
import { ref, watch } from "vue";
import TheInput from "../atoms/TheInput.vue";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Skeleton from "primevue/skeleton";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

// VARIABLES
const loading = ref(false);
const search = ref("");
const filtered = ref([]);
const users = ref([]);
const users_list_group = ref([]);
const group_name = ref("");
const confirmation_dialog = ref(false);
const loading_creation = ref(false);
const toast = useToast();

// EMITS

const emit = defineEmits(["close"]);

// FUNCTIONS
const getUsersList = async () => {
  try {
    loading.value = true;
    const { data } = await http.get("friends");
    users.value = data.content;
    loading.value = false;
  } catch (e) {
    loading.value = false;
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Error ao obter lista de amigos",
      life: 3000,
    });
  }
};

const handleUsersToGroup = (user) => {
  const idx = users_list_group.value.findIndex((e) => e.id == user.id);

  if (idx >= 0) {
    users_list_group.value.splice(idx, 1);
  } else {
    users_list_group.value.push(user);
  }
};

const isOnList = (user) => {
  const founded = users_list_group.value.findIndex((e) => e.id == user.id);
  return founded >= 0;
};

const createGroup = async () => {
  loading_creation.value = true;
  const group_model = {};
  group_model.friends_list = users_list_group.value.map((el) => el.id);
  group_model.conversation_type = 1;
  group_model.name = group_name.value;

  try {
    await http.post("create-conversation", group_model);

    toast.add({
      severity: "sucess",
      summary: "Sucesso",
      detail: "Grupo criado com sucesso",
      life: 3000,
    });

    loading_creation.value = false;

    emit("close", true);
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "Falha",
      detail: "Error ao criar grupo",
      life: 3000,
    });
    loading_creation.value = false;
  }
};

// WATCHERS
watch(search, (nv) => {
  filtered.value = users.value.filter((user) =>
    user.name.toLocaleLowerCase().includes(nv.toLocaleLowerCase())
  );
});

getUsersList();
</script>

<template>
  <div class="modal">
    <div class="modal__header">
      <div class="left">
        <div class="title">
          <span>Novo grupo</span>
          <br />
          <small>Selecione ao menos 2 usuários para criar um grupo</small>
        </div>
      </div>
      <div class="right">
        <i class="pi pi-times" @click="emit('close')"></i>
      </div>
    </div>

    <div class="modal__middle">
      <TheInput
        v-model="search"
        :icon-left="'pi pi-search'"
        placeholder="Pesquisar nome"
      />
    </div>

    <div class="modal__body">
      <div class="modal__body__list">
        <template v-for="(item, i) in search.length ? filtered : users" :key="i">
          <div
            class="friend"
            :class="{ active: isOnList(item) }"
            @click="handleUsersToGroup(item)"
          >
            <figure></figure>
            <span>{{ item.name }}</span>
          </div>
        </template>

        <template v-for="item in 4" :key="item">
          <div v-if="loading" class="friend-loading">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div class="align-self-center" style="flex: 1">
              <Skeleton width="100%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
              <Skeleton width="75%"></Skeleton>
            </div>
          </div>
        </template>
      </div>

      <div
        v-if="!users.length && !filtered.length && !loading"
        class="modal__body__no-content"
      >
        <span>Nenhum usuário encontrado😬</span>
      </div>
    </div>

    <div class="modal__footer">
      <Button
        label="Criar grupo"
        severity="info"
        :disabled="users_list_group.length < 2"
        @click="confirmation_dialog = true"
      />
    </div>

    <Dialog
      v-model:visible="confirmation_dialog"
      modal
      :style="{ width: '40vw' }"
      :breakpoints="{ '1199px': '45vw', '575px': '90vw' }"
    >
      <template #container>
        <div class="modal__confirmation">
          <div class="modal__confirmation__body">
            <span>Insira abaixo o nome para a criação do grupo</span>
            <TheInput v-model="group_name" placeholder="Nome do grupo" />
          </div>
          <div class="modal__confirmation__footer">
            <Button
              outlined
              size="small"
              label="Cancelar"
              severity="info"
              @click="
                confirmation_dialog = false;
                group_name = '';
              "
            />
            <Button
              size="small"
              label="Criar"
              severity="info"
              :loading="loading_creation"
              :disabled="loading_creation"
              @click="createGroup"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.modal {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 80dvh;

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
    flex: 1;
    overflow: auto;
    @include trackScrollBar;

    &__list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 0 0.5rem 0;

      .friend {
        padding: 1rem;
        border-radius: 15px;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        transition: 0.2s ease-in;
        border: 2px solid transparent;

        figure {
          background: #cdcdcd;
          height: 45px;
          width: 45px;
          border-radius: 50%;
          transition: 0.2s;

          @media (max-width: 750px) {
            height: 35px;
            width: 35px;
          }
        }

        span {
          font-weight: 500;
          transition: 0.2s;

          @media (max-width: 750px) {
            font-size: 0.75rem;
          }
        }

        &:hover {
          background: #fcfcfc;
          -webkit-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          -moz-box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
          box-shadow: -6px 10px 28px -12px rgba(0, 0, 0, 0.25);
        }
      }

      .active {
        border: 2px solid #0ea5e9;
      }
      .friend-loading {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
    &__no-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-weight: 600;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__confirmation {
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      span {
        font-weight: 500;
        font-size: 0.9rem;
      }
    }

    &__footer {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
