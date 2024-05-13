<script setup>
// IMPORTS
import Skeleton from "primevue/skeleton";

// PROPS
const props = defineProps({
  loading_infos: { type: Boolean, default: false },
});
</script>

<template>
  <div class="loading">
    <div class="loading__middle">
      <Skeleton
        v-if="props.loading_infos"
        shape="circle"
        size="11rem"
        class="mr-2"
      ></Skeleton>
      <figure v-else></figure>

      <span class="name">
        <Skeleton width="75%"></Skeleton>
      </span>

      <small>
        <Skeleton width="40%" class="mb-2" style="margin-bottom: 1rem"></Skeleton
      ></small>

      <div class="loading__middle__description"></div>
    </div>

    <div class="loading__body-group">
      <ul>
        <li v-for="item in 3" :key="item" class="user">
          <div class="left">
            <Skeleton
              shape="circle"
              size="4rem"
              class="mr-2"
              style="width: 75px"
            ></Skeleton>

            <div class="texts" style="width: 100%">
              <Skeleton width="40%" class="mb-2" style="margin-bottom: 1rem"></Skeleton>
              <Skeleton width="75%"></Skeleton>
            </div>
          </div>
          <div class="right"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/main.scss";

.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  position: relative;

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

  &__body-group {
    flex: 1;
    overflow-y: auto;
    @include trackScrollBar;
    // border: 1px solid red;
    // padding: 0.5rem;

    ul {
      margin-top: 0.5rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      li {
        list-style: none;
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 0.2s ease-in-out;

        .left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          figure {
            width: 70px;
            height: 70px;
            background: #cdcdcd;
            border-radius: 50%;
          }
          .texts {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            span {
              font-weight: 500;
            }
            small {
              font-size: 0.7rem;
              cursor: pointer;
            }
          }
        }

        &:hover {
          background: #ececec;
        }
      }
    }
  }
}
</style>
