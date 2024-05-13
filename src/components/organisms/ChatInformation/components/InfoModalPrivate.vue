<script setup>
// IMPORTS

// PROPS
const props = defineProps({
  current_chat_infos: { type: Object, default: null },
  loading_infos: { type: Boolean, default: false },
});
</script>

<template>
  <div class="private-info">
    <div class="private-info__body-private">
      <div class="private-info__body-private__cover">
        <figure class="figure-cover">
          <img src="/img/bg.jpg" alt="" />
        </figure>
        <figure class="figure-private-info">
          <img src="/img/eu.jpg" alt="" />
        </figure>
      </div>

      <div class="private-info__body-private__content">
        <div class="texts">
          <strong>
            {{ props.current_chat_infos?.participants.name || "Nome não encontrado" }}
          </strong>
          <br />
          <small># {{ props.current_chat_infos?.participants.shared_id }} </small>
          <p>
            <cite>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nihil
              minus enim beatae nulla ab cumque a cum illo, harum fugit dolorum nam neque
              id, esse sunt suscipit fugiat nisi.</cite
            >
          </p>
        </div>

        <div class="metrics">
          <div class="metrics__item">
            <strong>
              {{ props.current_chat_infos?.participants.groups_quantity || "0" }}</strong
            >

            <small>Grupos</small>
          </div>

          <div class="metrics__item">
            <strong>
              {{
                props.current_chat_infos?.participants.messages_quantity || "0"
              }}</strong
            >

            <small>Mensagens enviadas</small>
          </div>

          <div class="metrics__item">
            <strong>
              {{ props.current_chat_infos?.participants.friends_quantity || "0" }}</strong
            >

            <small>Amigos</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.private-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    z-index: 10;
    right: 15px;
  }

  &__middle {
    // flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;

    figure {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background: #cdcdcd;
      margin-bottom: 1.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.5rem;
    }

    &__description {
      //   margin-top: 1rem;
      text-align: center;
      max-width: 70%;
    }
  }

  &__body-private {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &__cover {
      background: grey;
      width: 100%;
      height: 230px;
      //   height: 30dvh;
      border-radius: 10px;
      position: relative;
      margin-bottom: 4.5rem;

      .figure-cover {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .figure-private-info {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background: #cdcdcd;
        margin-bottom: 1.2rem;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -60%);
        overflow: hidden;
        border: 8px solid #fff;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .texts {
        text-align: center;
        strong {
          font-size: 1.6rem;
          font-weight: 800;
          color: #303030;
        }

        small {
          cursor: pointer;
        }

        p {
          text-align: justify;
          display: block;
          margin-top: 1.5rem;
        }
      }

      .metrics {
        display: flex;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

        &__item {
          padding: 0.8rem;
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

  & > div {
    // border: 3px solid;
  }
}
</style>
