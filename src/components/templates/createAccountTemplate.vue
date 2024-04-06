<script setup>
</script>
<template>
  <div class="login">
    <div class="login__card">
      <div class="login__card__header">
        <small>Se inscreva no</small>
        <br />
        <strong>CHAT-APP.</strong>
      </div>

      <form class="login__card__body">
        <label>
          E-mail
          <input type="text" />
        </label>
        <label>
         Nome
          <input type="text" />
        </label>
        <label>
          Senha
          <input type="password" />
        </label>

        <label>
          Confirmação de senha
          <input type="password" />
        </label>
        <button>Cadastrar</button>
      </form>
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
    max-width: 80%;

    &__header {
      text-align: center;
      font-size: 1rem;
      strong {
        font-weight: 800;
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      label {
        display: flex;
        flex-direction: column;
        font-weight: 800;
        font-size: 0.75rem;
        color: #3a3535;
      }

      input {
        margin-top: 0.5rem;
        border-radius: 10px;
        border: 1px solid #b8b6b6;
        flex: 3;
        padding: 0.8rem 0.5rem;
        &:focus {
          outline: none;
        }
      }
      button {
        width: 30%;
        margin: 0 auto;
        padding: 0.7rem 0.5rem;
        border-radius: 15px;
        border: none;
        font-weight: 700;
        font-size: 0.75rem;
        background: #3ebe53;
        color: white;
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
