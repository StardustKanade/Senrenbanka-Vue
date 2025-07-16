import { defineStore } from "pinia";
import { ref } from "vue";

type SoundKey = "BGM" | "SOUND" | "VOICE";

type SoundItem = {
  audio: HTMLAudioElement; // 音频对象
  isPlaying: boolean; // 是否正在播放
  src: string; // 音频源
  fadeAnimationId?: number; // 淡入淡出动画ID
};

// 淡入淡出参数类型
type FadeOptions = {
  duration?: number; // 淡入淡出持续时间(毫秒)
  startVolume?: number; // 起始音量(0-1)
  endVolume?: number; // 结束音量(0-1)
};

const useSoundStore = defineStore("sound", () => {
  const sounds = ref<Map<SoundKey, SoundItem>>(new Map());

  const play = async (key: SoundKey, src: string, loop?: boolean, fadeOptions?: FadeOptions) => {
    let item = sounds.value.get(key);

    // 情况1: 音频不存在 - 创建新音频
    if (!item) {
      const audio = new Audio(src);
      audio.loop = loop ?? false;
      // 如果有淡入效果，设置起始音量，否则设为1
      audio.volume = fadeOptions?.startVolume ?? 1;
      item = { audio, isPlaying: false, src };
      sounds.value.set(key, item);
    }
    // 情况2: 音频存在但src不同 - 复用对象更新源
    else if (item.src !== src) {
      // 停止当前播放
      item.audio.pause();
      item.audio.currentTime = 0;

      // 更新音频源
      item.audio.src = src;
      item.src = src;
      item.audio.loop = loop ?? false;
      // 如果有淡入效果，设置起始音量，否则设为1
      item.audio.volume = fadeOptions?.startVolume ?? 1;

      // 加载新音频
      item.audio.load();
    }
    // 情况3: 音频存在且src相同 - 更新循环设置
    else {
      item.audio.loop = loop ?? false;
    }

    // 播放音频
    item.audio.currentTime = 0;

    try {
      await item.audio.play();

      // 只有在提供了fadeOptions时才应用淡入效果
      if (fadeOptions) {
        await fadeAudio(item.audio, fadeOptions);
      }

      item.isPlaying = true;
    } catch (error) {
      console.error(`播放音频失败 (${key}):`, error);
    }
  };

  const pause = async (
    key: SoundKey,
    fadeOptions?: FadeOptions, // 改为可选参数
  ) => {
    const item = sounds.value.get(key);
    if (!item) return;

    // 只有在提供了fadeOptions时才应用淡出效果
    if (fadeOptions) {
      await fadeAudio(item.audio, {
        ...fadeOptions,
        startVolume: item.audio.volume,
        endVolume: fadeOptions.endVolume ?? 0,
      });
    }

    item.audio.pause();
    item.isPlaying = false;
  };

  const stop = async (key: SoundKey, fadeOptions?: FadeOptions) => {
    const item = sounds.value.get(key);
    if (!item) return;

    if (fadeOptions) {
      await fadeAudio(item.audio, {
        ...fadeOptions,
        startVolume: item.audio.volume,
        endVolume: fadeOptions.endVolume ?? 0,
      });
    }

    item.audio.pause();
    item.audio.currentTime = 0;
    item.isPlaying = false;
  };

  const stopAll = async (fadeOptions?: FadeOptions) => {
    const promises: Promise<void>[] = [];

    sounds.value.forEach((item) => {
      if (item.isPlaying) {
        promises.push(
          (async () => {
            if (fadeOptions) {
              await fadeAudio(item.audio, {
                ...fadeOptions,
                startVolume: item.audio.volume,
                endVolume: fadeOptions.endVolume ?? 0,
              });
            }

            item.audio.pause();
            item.audio.currentTime = 0;
            item.isPlaying = false;
          })(),
        );
      }
    });

    await Promise.all(promises);
  };

  const isPlaying = (key: SoundKey) => {
    return !!sounds.value.get(key)?.isPlaying;
  };

  const fadeAudio = (audio: HTMLAudioElement, options: FadeOptions = {}): Promise<void> => {
    // 清除之前的淡入淡出动画
    const existingItem = Array.from(sounds.value.values()).find((item) => item.audio === audio);
    if (existingItem && existingItem.fadeAnimationId) {
      cancelAnimationFrame(existingItem.fadeAnimationId);
      existingItem.fadeAnimationId = undefined;
    }

    const { duration = 1000, startVolume = audio.volume, endVolume = 1 } = options;

    // 设置起始音量
    audio.volume = startVolume;

    return new Promise((resolve) => {
      const startTime = performance.now();

      const animateFade = (timestamp: number) => {
        // 计算经过的时间
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 线性计算当前音量
        audio.volume = startVolume + (endVolume - startVolume) * progress;

        // 存储动画ID以便取消
        const currentItem = Array.from(sounds.value.values()).find((item) => item.audio === audio);
        if (currentItem) {
          // 如果未完成，继续动画
          if (progress < 1) {
            currentItem.fadeAnimationId = requestAnimationFrame(animateFade);
          } else {
            currentItem.fadeAnimationId = undefined;
            resolve();
          }
        } else {
          resolve();
        }
      };

      // 启动动画
      const animationId = requestAnimationFrame(animateFade);

      // 存储初始动画ID
      const currentItem = Array.from(sounds.value.values()).find((item) => item.audio === audio);
      if (currentItem) {
        currentItem.fadeAnimationId = animationId;
      }
    });
  };

  return {
    sounds,
    play,
    pause,
    stop,
    stopAll,
    isPlaying,
  };
});

export default useSoundStore;
