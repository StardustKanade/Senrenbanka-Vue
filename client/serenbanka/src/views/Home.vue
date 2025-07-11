<template>
  <div class="home">
    <img class="img-bg" src="/static/index/bg.png" alt="" />

    <div class="ch-container">
      <img src="/static/index/ch4.png" class="ch-img ch4" />
      <img src="/static/index/ch3.png" class="ch-img ch3" />
      <img src="/static/index/ch2.png" class="ch-img ch2" />
      <img src="/static/index/ch1.png" class="ch-img ch1" />
    </div>

    <div class="menu-bg">
      <div class="menu-container">
        <img src="/static/index/side.png" class="img-side" />

        <div class="menu-items">
          <button
            class="menu-item"
            v-for="(item, index) in menuList"
            :key="index"
            @mouseenter="setStatus(index, 'hover')"
            @mouseleave="setStatus(index, 'default')"
            @mousedown="setStatus(index, 'active')"
            @mouseup="setStatus(index, 'default')"
            draggable="false"
          >
            <img :src="getImgSrc(index)" class="img-menu" />
          </button>
        </div>
      </div>
    </div>

    <img class="img-logo" src="/static/index/2170.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import useSoundStore from "@/stores/soundStore";

const soundStore = useSoundStore();

const menuList = [
  {
    default: "/static/index/2285.png",
    hover: "/static/index/2052.png",
    active: "/static/index/2059.png",
  },
  {
    default: "/static/index/2282.png",
    hover: "/static/index/2073.png",
    active: "/static/index/2066.png",
  },
  {
    default: "/static/index/2279.png",
    hover: "/static/index/2087.png",
    active: "/static/index/2080.png",
  },
  {
    default: "/static/index/2276.png",
    hover: "/static/index/2101.png",
    active: "/static/index/2094.png",
  },
  {
    default: "/static/index/2273.png",
    hover: "/static/index/2155.png",
    active: "/static/index/2148.png",
  },
  {
    default: "/static/index/2270.png",
    hover: "/static/index/2169.png",
    active: "/static/index/2162.png",
  },
];

const statusList = ref<string[]>(Array(menuList.length).fill("default"));
const setStatus = (index: number, status: "default" | "hover" | "active") => {
  statusList.value[index] = status;
  if (status === "hover") soundStore.play("SOUND1", "/static/sound/buttonhover.ogg");
  if (status === "active") soundStore.play("SOUND1", "/static/sound/buttonclick.ogg");
};
const getImgSrc = (index: number) => {
  const item = menuList[index];
  const status = statusList.value[index];
  if (status === "hover") return item.hover;
  if (status === "active") return item.active;
  return item.default;
};

onMounted(() => {
  setTimeout(() => {
    soundStore.play("BGM", "/static/sound/serenbanka.ogg");
  }, 500);

  setTimeout(() => {
    soundStore.play("BGM", "/static/sound/yuzu.ogg");
  }, 2000);

  setTimeout(() => {
    soundStore.play("BGM", "/static/sound/SongOp.ogg", true);
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
