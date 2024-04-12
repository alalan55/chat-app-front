<script setup></script>

<template>
  <div class="chat-list">
    <div class="chat-list__list">
      <div class="item" v-for="item in 30" :key="item">
        <div class="left">
          <figure></figure>
          <div class="texts">
            <strong>Fulano {{ item }}</strong>
            <br />
            <small>Alguma mensagem...</small>
          </div>
        </div>

        <div class="right">
          <div class="texts">
            <div class="hour"><span>09:00 pm</span></div>
            <div class="chip"><span>20</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-list {
  height: 100%;

  &__list {
    padding: 0.6rem;

    .item {
      padding: 1rem;

      display: flex;
      align-items: center;
      justify-content: space-between;

      &:not(:last-child) {
        border-bottom: 1px solid #e6e6e6;
      }

      .left {
        display: flex;
        gap: 0.7rem;
        figure {
          width: 38px;
          height: 38px;
          background: #cdcdcd;
          border-radius: 50%;
        }

        strong {
          font-size: 0.85rem;
        }
        small {
          // flex: 1 1 auto;
          // display: inline-block;
          // white-space: nowrap;
          // overflow: hidden !important;
          // text-overflow: ellipsis;
        }
      }

      .right {
        .texts {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;

          .hour {
            span {
              font-weight: 700;
              font-size: 0.65rem;
            }
          }

          .chip {
            background: #25d366;
            color: white;
            display: inline-flex;
            padding: 0.2rem;
            border-radius: 50%;
            span {
              font-size: 0.8rem;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}
</style>
