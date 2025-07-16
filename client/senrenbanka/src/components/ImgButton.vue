<template>
  <button
    class="button-box"
    @mouseenter="mouseEnter"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mouseleave="mouseLeave"
  >
    <img :src="img" class="img-button" />
  </button>
</template>

<script setup lang="ts">
import soundStore from "@/stores/soundStore";
import { ref } from "vue";

const props = defineProps<{
  default: string;
  hover: string;
  active: string;
  hoverSound?: string;
  clickSound?: string;
}>();

const emit = defineEmits<{
  (e: "hover"): void;
  (e: "click"): void;
}>();

const sound = soundStore();

const img = ref<string>(props.default);
const mouseEnter = () => {
  img.value = props.hover;
  if (props.hoverSound) sound.play("SOUND", props.hoverSound);
};

const mouseLeave = () => {
  img.value = props.default;
};

const mouseUp = () => {
  img.value = props.hover;
  emit("click");
};

const mouseDown = () => {
  img.value = props.active;
  if (props.clickSound) sound.play("SOUND", props.clickSound);
};
</script>

<style scoped lang="scss">
.button-box {
  .img-button {
    height: 100%;
  }
}
</style>
