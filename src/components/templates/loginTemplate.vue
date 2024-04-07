<script setup>
import { RouterLink, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Button from "primevue/button";

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const store = useUserStore();
const toast = useToast();
const router = useRouter();

const login = async () => {
  if (form.email && form.password) {
    try {
      loading.value = true;

      const { data } = await http.post("login", form);
      store.setCurrentUser(data);

      toast.add({
        severity: "success",
        summary: "Ok",
        detail: "Login realizado com sucesso",
        life: 3000,
      });

      loading.value = false;

      router.push("/home");
    } catch (error) {
      console.error("error", error);
      loading.value = false;
    }
  }
};
</script>

<template>
  <div class="login">
    <Toast />
    <div class="login__card">
      <div class="login__card__header">
        <figure>
          <img src="/img/logo.png" alt="Logo" />
        </figure>

        <strong>Login</strong>
        <small>Preencha com seu e-mail e senha para fazer login</small>
      </div>

      <form @submit.prevent class="login__card__body">
        <label>
          E-mail
          <div>
            <figure class="left-image">
              <img src="/icons/user-icon.svg" alt="Ícone de usuário" />
            </figure>
            <input v-model="form.email" type="text" placeholder="Insira o seu e-mail" />
          </div>
        </label>
        <label>
          Senha
          <div>
            <figure class="left-image">
              <img src="/icons/lock-icon.svg" alt="Ícone de cadeado" />
            </figure>
            <input
              v-model="form.password"
              type="password"
              placeholder="Digite a sua senha"
            />
            <figure class="right-image">
              <img src="/icons/eye-off-icon.svg" alt="Ícone de usuário" />
            </figure>
          </div>
        </label>
        <Button
          :disabled="loading"
          :loading="loading"
          label=" Login"
          severity="success"
          style="width: 100%"
          @click="login"
        />
      </form>

      <div class="login__card__bottom">
        <span
          >Ou faça o seu cadastro <RouterLink to="/create-account">Aqui!😁</RouterLink>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background: #eaedf0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  &__card {
    background: white;
    width: 100%;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 10px 8px -1px rgba(0, 0, 0, 0.05);
    max-width: 500px;

    &__header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1rem;
      strong {
        font-weight: 800;
        font-size: 1.1rem;
      }

      figure {
        width: 200px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        font-size: 0.75rem;
        color: #3a3535;
      }

      div {
        position: relative;
        padding: 0 !important;
        margin-top: 0.8rem;

        .left-image {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 50%;
          left: 5%;

          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 80%;
            height: 80%;
            object-fit: contain;
          }
        }
        .right-image {
          position: absolute;
          width: 30px;
          height: 30px;
          top: 50%;
          left: 93%;

          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 80%;
            height: 80%;
            object-fit: contain;
          }
        }
        input {
          width: 100%;

          border-radius: 10px;
          // border: 1px solid #b8b6b6;
          border: none;
          background: #edf2f6;
          flex: 3;
          padding: 1rem 2.8rem 1rem 2.5rem;
          &:focus {
            outline: none;
          }
        }
      }
      button {
        width: 30%;
        margin: 0 auto;
        padding: 0.7rem 0.5rem;
        // border-radius: 15px;
        border: none;
        font-weight: 700;
        font-size: 0.75rem;
        // background: #3ebe53;
        // color: white;
        cursor: pointer;
      }
    }

    &__bottom {
      text-align: center;
      span {
        font-weight: 500;
        a {
          text-decoration: none;
          color: black;
          font-weight: 800;
        }
      }
    }
  }
}
</style>
