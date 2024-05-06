<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import http from "@/services/axios";
import TheInput from "../atoms/TheInput.vue";

const router = useRouter();
const showMessage = ref(false);
const showMessageConfirmation = ref(false);
const loading = ref(false);
const new_user = ref({
  name: "",
  email: "",
  password: "",
  profile_pic: "",
  coverage_pic: "",
  status: "",
});
const confirmation_pawword = ref("");

const toast = useToast();

const createUser = async () => {
  if (new_user.value.password == confirmation_pawword.value) {
    try {
      loading.value = true;

      const { data } = await http.post("/", new_user.value);
      console.log(data);

      loading.value = false;
      toast.add({
        severity: "success",
        summary: "success",
        detail: "Contra criada com sucesso",
        life: 3000,
      });
      loading.value = false;
      router.push("/");
    } catch (error) {
      toast.add({
        severity: "error",
        summary: "error",
        detail: "Erro ao criar conta",
        life: 3000,
      });
      loading.value = false;
    }
  } else {
    toast.add({
      severity: "warn",
      summary: "Aviso",
      detail: "A senha precisa ser igual a confirmação",
      life: 3000,
    });
  }
};
</script>
<template>
  <div class="login">
    <div class="login__card">
      <div class="login__card__header">
        <strong>CHATAPP</strong>
        <small>Insira as informações abaixo e inscreva-se :)</small>
      </div>

      <form class="login__card__body">
        <label>
          E-mail

          <TheInput
            v-model="new_user.email"
            placeholder="Insira seu e-mail"
            :icon-left="'pi pi-at'"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Nome
          <TheInput
            v-model="new_user.name"
            placeholder="Insira seu e-mail"
            :icon-left="'pi pi-user'"
            style="margin-top: 0.8rem"
          />
        </label>
        <label>
          Senha

          <TheInput
            v-model="new_user.password"
            :icon-left="'pi pi-lock'"
            :icon-right="!showMessage ? 'pi pi-eye-slash' : 'pi pi-eye'"
            :type="`${!showMessage ? 'password' : 'text'}`"
            style="margin-top: 0.8rem"
            placeholder="Insira sua senha"
            @right-icon-click="showMessage = !showMessage"
          />
        </label>

        <label>
          Confirmação de senha

          <TheInput
            v-model="confirmation_pawword"
            :icon-left="'pi pi-lock'"
            :icon-right="!showMessage ? 'pi pi-eye-slash' : 'pi pi-eye'"
            :type="`${!showMessageConfirmation ? 'password' : 'text'}`"
            style="margin-top: 0.8rem"
            placeholder="Insira sua senha novamente"
            @right-icon-click="showMessageConfirmation = !showMessageConfirmation"
          />
        </label>
        <Button
          :disabled="loading"
          :loading="loading"
          label=" Cadastrar"
          severity="info"
          style="width: 100%"
          @click="createUser"
        />
      </form>

      <div v-for="i in 4" :key="i" :class="`dot-${i}`"></div>
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
      border: 3px dashed #04aaa3;

      width: 60px;
      height: 60px;
      border-radius: 50%;
      position: absolute;
      top: -5.5%;
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
        font-size: 1.6rem;
        letter-spacing: 0.1rem;
        display: block;
        margin-bottom: 0.8rem;
        font-family: "LOT";
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
      button {
        width: 30%;
        margin: 0 auto;
        padding: 0.7rem 0.5rem;
        border: none;
        font-weight: 700;
        font-size: 0.75rem;
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
