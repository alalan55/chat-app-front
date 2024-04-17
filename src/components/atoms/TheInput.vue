<script setup>
import { computed } from "vue";

const props = defineProps({
  placeholder: { type: String, default: null },
  iconRight: { type: String, default: null },
  iconLeft: { type: String, default: null },
  type: { type: String, default: "text" },
});

const emit = defineEmits(["right-icon-click", "left-icon-click"]);

const model = defineModel();

const inputStyle = computed(() => {
  let style = { padding: "1rem 25px 1rem 1rem" };

  if (props.iconRight) {
    style.padding = "1rem 2.5rem 1rem 1rem";
  }

  if (props.iconLeft) {
    style.padding = "1rem 25px 1rem 2.3rem";
  }

  if (props.iconRight && props.iconLeft) {
    style.padding = "1rem 2.5rem 1rem 2.5rem";
  }

  return style;
});
</script>

<template>
  <div class="inpt-component">
    <slot name="custom-info"></slot>

    <i
      v-if="props.iconLeft"
      :class="props.iconLeft"
      class="inpt-component__left-icon"
      @click="emit('left-icon-click')"
    ></i>

    <input
      v-model="model"
      :type="props.type"
      :style="inputStyle"
      :placeholder="props.placeholder"
    />

    <i
      v-if="props.iconRight"
      :class="props.iconRight"
      class="inpt-component__right-icon"
      @click="emit('right-icon-click')"
    ></i>
  </div>
</template>

<style lang="scss" scoped>
.inpt-component {
  position: relative;

  i {
    position: absolute;
    top: 50%;
    color: #a8abac;
  }

  &__right-icon {
    right: 10px;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  &__left-icon {
    left: 22px;
    transform: translate(-50%, -50%);
  }

  input {
    width: 100%;
    border-radius: 10px;
    border: none;
    background: #edf2f6;
    // padding: 1rem 25px 1rem 2.5rem;
    font-weight: 600;
    color: #3f3f3f;
    font-weight: 700;
    &:focus {
      outline: none;
    }
  }
}
</style>
