<template>
  <div class="load-card">
    <img class="card-bg" src="/static/loaddata/70461.png" alt="" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  saveData: string;
}>();
</script>

<style scoped lang="scss">
.load-card {
  position: relative;

  .card-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
