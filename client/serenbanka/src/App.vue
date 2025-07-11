<template>
  <transition name="app-fade">
    <component :is="Component"></component>
  </transition>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import useViewStore from "@/stores/viewStore";

const viewStore = useViewStore();

const Component = computed(() => {
  console.log(viewStore.view);
  if (!viewStore.view) return null;
  return defineAsyncComponent(() => import(`@/views/${viewStore.view}.vue`));
});
</script>

<style>
.app-fade-enter-active {
  transition: opacity 1s ease;
  position: absolute;
  width: 100%;
  opacity: 0;
}

.app-fade-leave-active {
  transition: opacity 1s ease;
  position: absolute;
  width: 100%;
}

.app-fade-enter,
.app-fade-leave-to {
  opacity: 0;
}

.app-fade-enter-to,
.app-fade-leave {
  opacity: 1;
}
</style>
