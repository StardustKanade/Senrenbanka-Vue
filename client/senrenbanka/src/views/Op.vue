<template>
  <div class="op-box">
    <video
      id="op-video"
      ref="video"
      src="/static/index/OP.mp4"
      @click="toHome()"
      :muted="muted"
    ></video>

    <div class="muted-icon">
      <span
        class="iconfont"
        :class="muted ? 'icon-nosound-filling' : 'icon-sound-filling'"
        @click="muted = !muted"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const video = ref<HTMLVideoElement | undefined>();
const muted = ref(true);

const toHome = () => {
  router.push({ name: "Home" });
};

onMounted(() => {
  if (video.value) {
    video.value.play();
    video.value.addEventListener("ended", toHome);
  }
});

onUnmounted(() => {
  if (video.value) video.value?.removeEventListener("ended", toHome);
});
</script>

<style scoped lang="scss">
.op-box {
  position: relative;
  width: 100%;
  height: 100%;

  #op-video {
    width: 100%;
    height: 100%;
  }

  .muted-icon {
    position: absolute;
    top: 4%;
    right: 4%;
    .iconfont {
      font-size: 3vw;
    }
  }
}
</style>
