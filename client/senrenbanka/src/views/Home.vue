<template>
  <div class="home">
    <img class="img-bg" src="/static/index/bg.png" alt="" />

    <div class="ch-container">
      <img src="/static/index/ch4.png" class="ch-img ch4" ref="ch4" />
      <img src="/static/index/ch3.png" class="ch-img ch3" ref="ch3" />
      <img src="/static/index/ch2.png" class="ch-img ch2" ref="ch2" />
      <img src="/static/index/ch1.png" class="ch-img ch1" ref="ch1" />
    </div>

    <div class="menu-bg">
      <div class="menu-container">
        <img src="/static/index/side.png" class="img-side" ref="img-side" />

        <div class="menu-items" ref="menu-items">
          <ImgButton
            v-for="(item, index) in menuList"
            class="menu-item"
            :key="index"
            :default="item.default"
            :hover="item.hover"
            :active="item.active"
            :hover-sound="'/static/sound/buttonhover.ogg'"
            :click-sound="'/static/sound/buttonclick.ogg'"
            @click="() => menuClick(item)"
          />
        </div>
      </div>
    </div>

    <img class="img-logo" src="/static/index/2170.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useSoundStore from "@/stores/soundStore";
import ImgButton from "@/components/ImgButton.vue";
import { type PageName, usePageStore } from "@/stores/pageStore";

const soundStore = useSoundStore();
const pageStore = usePageStore();

let timer: number | null = null;

type MenuItem = {
  default: string;
  hover: string;
  active: string;
  view: PageName;
};
const menuList: MenuItem[] = [
  {
    default: "/static/index/2285.png",
    hover: "/static/index/2052.png",
    active: "/static/index/2059.png",
    view: "Op",
  },
  {
    default: "/static/index/2282.png",
    hover: "/static/index/2073.png",
    active: "/static/index/2066.png",
    view: "Load",
  },
  {
    default: "/static/index/2279.png",
    hover: "/static/index/2087.png",
    active: "/static/index/2080.png",
    view: "Op",
  },
  {
    default: "/static/index/2276.png",
    hover: "/static/index/2101.png",
    active: "/static/index/2094.png",
    view: "Op",
  },
  {
    default: "/static/index/2273.png",
    hover: "/static/index/2155.png",
    active: "/static/index/2148.png",
    view: "Op",
  },
  {
    default: "/static/index/2270.png",
    hover: "/static/index/2169.png",
    active: "/static/index/2162.png",
    view: "Op",
  },
];

const menuClick = (item: MenuItem) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  pageStore.pageTo(item.view);
};

const showAnimation = () => {
  if (sessionStorage.getItem("showAnimation")) return;

  sessionStorage.setItem("showAnimation", "true");
};

onMounted(() => {
  console.log(soundStore.isPlaying("BGM"));
  if (soundStore.isPlaying("BGM")) return;
  timer = setTimeout(() => {
    if (timer) soundStore.play("BGM", "/static/sound/serenbanka.ogg");
  }, 500);

  timer = setTimeout(() => {
    if (timer) soundStore.play("BGM", "/static/sound/yuzu.ogg");
  }, 2000);

  timer = setTimeout(() => {
    if (timer) soundStore.play("BGM", "/static/bgm/BGM61.wav", true);
  }, 3500);
});
</script>

<style scoped lang="scss">
.home {
  position: relative;
  width: 100%;
  height: 100%;

  .img-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .ch-container {
    .ch-img {
      position: absolute;
      bottom: 0;
      width: 48%;

      &.ch1 {
        left: 32%;
      }
      &.ch2 {
        left: 17%;
      }
      &.ch3 {
        left: 54%;
      }
      &.ch4 {
        left: 56%;
      }
    }
  }

  .menu-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 25%;
    height: 100%;
    background: linear-gradient(
      to right,
      #fff 70%,
      rgba(255, 255, 255, 0.7) 85%,
      rgba(255, 255, 255, 0) 100%
    );

    .menu-container {
      position: absolute;
      top: 30%;
      height: 60%;
      width: 100%;
      .img-side {
        position: relative;
        top: 0;
        left: 0;
        height: 100%;
      }

      .menu-items {
        position: absolute;
        top: 0;
        left: 10%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .menu-item {
          height: 10%;
          text-align: left;
        }
        img {
          height: 100%;
        }
      }
    }
  }

  .img-logo {
    position: absolute;
    top: 6%;
    left: 2%;
    width: 20%;
  }
}
</style>
