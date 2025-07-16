<template>
  <div class="load">
    <img src="/static/loaddata/70114.png" id="load-bg-1" alt="" />
    <img src="/static/loaddata/70112.png" id="load-bg-2" alt="" />

    <div class="load-container"></div>

    <div class="action-buttons">
      <ImgButton
        class="action-button"
        :default="'/static/loaddata/baseImages/12.png'"
        :hover="'/static/loaddata/hoverImages/12.png'"
        :active="'/static/loaddata/activeImages/12.png'"
        :hover-sound="'/static/sound/buttonhover.ogg'"
        @hover=""
        @click=""
      />
      <ImgButton
        class="action-button"
        :default="'/static/loaddata/baseImages/13.png'"
        :hover="'/static/loaddata/hoverImages/13.png'"
        :active="'/static/loaddata/activeImages/13.png'"
        :hover-sound="'/static/sound/buttonhover.ogg'"
        @hover=""
        @click=""
      />
      <ImgButton
        class="action-button"
        :default="'/static/loaddata/baseImages/14.png'"
        :hover="'/static/loaddata/hoverImages/14.png'"
        :active="'/static/loaddata/activeImages/14.png'"
        :hover-sound="'/static/sound/buttonhover.ogg'"
        @hover=""
        @click=""
      />
      <ImgButton
        class="action-button"
        :default="'/static/loaddata/baseImages/15.png'"
        :hover="'/static/loaddata/hoverImages/15.png'"
        :active="'/static/loaddata/activeImages/15.png'"
        :hover-sound="'/static/sound/buttonhover.ogg'"
        :click-sound="'/static/sound/buttonreturn.ogg'"
        @hover=""
        @click="router.push({ name: 'Home' })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImgButton from "@/components/ImgButton.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const defaultData = (index: number) => {
  // 计算主编号（前四位）
  const base = Math.floor((index - 1) / 12) + 1;
  // 计算子编号（后两位）
  const sub = ((index - 1) % 12) + 1;

  const id = `${base.toString().padStart(4, "0")}-${sub.toString().padStart(2, "0")}`;

  return {
    id,
    data: undefined,
  };
};

const loadDataList = ref(Array.from({ length: 120 }, (_, i) => defaultData(i + 1)));
</script>

<style scoped lang="scss">
.load {
  position: relative;
  width: 100%;
  height: 100%;

  #load-bg-1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  #load-bg-2 {
    position: absolute;
    top: 2%;
    left: 0;
    width: 97.2%;
  }

  .load-container {
    position: absolute;
    top: 17%;
    left: 35%;
    width: 60%;
    height: 67%;
    overflow: auto;
  }

  .action-buttons {
    position: absolute;
    right: 3.7%;
    bottom: 1.3%;
    height: 7%;
    display: flex;
    gap: 0.5%;
    align-items: center;

    .action-button {
      height: 100%;
    }
  }
}
</style>
