<template>
  <div class="load">
    <img src="/static/loaddata/70114.png" id="load-bg-1" alt="" />
    <img src="/static/loaddata/70112.png" id="load-bg-2" alt="" />

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
        @click="viewStore.setView('Home')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImgButton from "@/components/ImgButton.vue";
import useViewStore from "@/stores/viewStore";

const viewStore = useViewStore();
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
    top: 0;
    left: 0;
    width: 100%;
  }

  .action-buttons {
    position: absolute;
    right: 0.5%;
    bottom: 1.3%;
    height: 7.2%;
    display: flex;
    align-items: center;

    .action-button {
      height: 100%;
    }
  }
}
</style>
