<template>
  <transition name="app-fade" mode="out-in">
    <component :is="pageStore.pageComponent" :key="pageStore.pageName" />
  </transition>
</template>

<script setup>
import { usePageStore } from "@/stores/pageStore";

const pageStore = usePageStore();
</script>

<style>
.app-fade-enter-active {
  transition: opacity 1s ease;
  position: absolute !important;
  opacity: 0;
}

.app-fade-leave-active {
  transition: opacity 1s ease;
  position: absolute !important;
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
