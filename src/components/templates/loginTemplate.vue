<script setup>
import { RouterLink, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "primevue/usetoast";
import http from "@/services/axios";
import Button from "primevue/button";

const form = reactive({ email: "", password: "" });
const loading = ref(false);
const showMessage = ref(false);
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
        <!-- <figure>
          <img src="/img/logo.png" alt="Logo" />
        </figure> -->

        <strong>CHATAPP</strong>
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
              :type="`${!showMessage ? 'password' : 'text'}`"
              placeholder="Digite a sua senha"
            />
            <figure class="right-image" @click="showMessage = !showMessage">
              <img
                :src="`/icons/${!showMessage ? 'eye-off-icon' : 'eye-open-icon'}.svg`"
                alt="Ícone de usuário"
              />
            </figure>
          </div>
        </label>
        <Button
          :disabled="loading"
          :loading="loading"
          label=" Login"
          severity="info"
          style="width: 100%"
          @click="login"
        />
      </form>

      <div class="login__card__bottom">
        <small
          ><RouterLink to="/create-account"><strong>Novo por aqui?</strong></RouterLink>
          😁
        </small>
      </div>

      <div class="dot-1"></div>

      <div class="dot-2"></div>

      <div class="dot-3"></div>

      <div class="dot-4"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "LOT";
  src: url("/src/assets/fonts/LOT.otf");
}
@keyframes move-1 {
  0% {
    bottom: -10%;
  }
  25% {
    bottom: -12%;
  }
  50% {
    bottom: -12%;
  }
  75% {
    bottom: -12%;
  }
  100% {
    bottom: -10%;
  }
}
@keyframes move-2 {
  0% {
    top: -1%;
  }
  25% {
    top: -5%;
  }
  50% {
    top: -5%;
  }
  75% {
    top: -5%;
  }
  100% {
    top: -1%;
  }
}
.login {
  background: #eaedf0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  position: relative;
  z-index: 10;
  overflow: hidden;

  &__card {
    // background: white;
    background: rgba(#fff, 0.94);
    width: 100%;
    padding: 2rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: 0 10px 8px -1px rgba(0, 0, 0, 0.05);
    max-width: 500px;
    position: relative;

    .dot-1 {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      position: absolute;
      bottom: -10%;
      right: -10%;
      background: rgb(14, 165, 233);
      background: radial-gradient(
        circle,
        rgba(14, 165, 233, 1) 0%,
        rgba(14, 165, 233, 0.10416666666666663) 100%
      );
      z-index: -5;
      animation-name: move-1;
      animation-duration: 4s;
      animation-iteration-count: infinite;
      transition: 0.2s ease-in-out;

      @media (max-width: 750px) {
        width: 100px;
        height: 100px;
        bottom: 1%;
        right: -5%;
      }
    }

    .dot-2 {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: -1%;
      left: -10%;
      background: rgb(14, 165, 233);
      background: radial-gradient(
        circle,
        rgba(14, 165, 233, 1) 0%,
        rgba(14, 165, 233, 0.10416666666666663) 100%
      );
      z-index: -5;

      animation-name: move-2;
      animation-duration: 3s;
      animation-iteration-count: infinite;
      transition: 0.2s ease-in-out;
      @media (max-width: 750px) {
        left: -5%;
        width: 60px;
        height: 60px;
      }
    }

    .dot-3 {
      // border: 2px dashed rgb(14, 165, 233);
      border: 3px dashed #04aaa3;

      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: absolute;
      top: -8.5%;
      right: 12%;
      z-index: -1;
    }

    .dot-4 {
      background: rgb(4, 170, 163);
      background: radial-gradient(
        circle,
        rgba(4, 170, 163, 0.4431022408963585) 0%,
        rgba(4, 170, 163, 0.10136554621848737) 100%
      );
      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: absolute;
      bottom: -4%;
      left: -5%;
      z-index: -1;
    }

    &__header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1rem;
      strong {
        // font-weight: 900;
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
        display: block;
        margin-bottom: 0.8rem;
        font-family: "LOT";
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
          left: 22px;

          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s ease;

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
          right: 0;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            width: 80%;
            height: 80%;
            object-fit: contain;
          }
        }
        input {
          width: 100%;
          border-radius: 10px;
          border: none;
          background: #edf2f6;
          flex: 3;
          padding: 1rem 25px 1rem 2.5rem;
          font-weight: 600;
          color: #3f3f3f;
          &:focus {
            outline: none;
          }

          // @media(max-width: 750px){
          //   padding: 1rem 2.4rem;
          // }
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
      small {
        a {
          color: #0f8bc4;
        }
      }
    }
  }
}
</style>