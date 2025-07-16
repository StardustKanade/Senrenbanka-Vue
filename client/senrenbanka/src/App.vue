<template>
  <transition name="app-fade">
    <router-view />
  </transition>
</template>

<script setup></script>

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
