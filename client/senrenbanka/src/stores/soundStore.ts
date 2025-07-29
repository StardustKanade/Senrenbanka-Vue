import { defineStore } from "pinia";
import { Howl } from "howler";

type SoundKey = "BGM" | "SOUND" | "VOICE";

// 淡入淡出参数类型
type FadeOptions = {
  duration?: number; // 淡入淡出持续时间(毫秒)
  startVolume?: number; // 起始音量(0-1)
  endVolume?: number; // 结束音量(0-1)
};

type SoundItem = {
  id: number;
  sound: Howl;
  src: string;
};

const useSoundStore = defineStore("sound", () => {
  const sounds = new Map<SoundKey, SoundItem>();

  const play = (key: SoundKey, src: string, loop?: boolean, fadeOptions?: FadeOptions) => {
    let item = sounds.get(key);
    let sound: Howl;

    // 情况1: 音频不存在 - 创建新音频
    if (!item) {
      sound = new Howl({
        src: [src],
        loop: loop ?? false,
        volume: fadeOptions?.startVolume ?? 1,
        onload: () => {
          // 音频加载完成后的回调
        },
        onloaderror: (id, error) => {
          console.error(`音频加载失败 (${key}):`, error);
        },
        onplayerror: (id, error) => {
          console.error(`音频播放失败 (${key}):`, error);
        },
      });
    } else if (item.src !== src) {
      item.sound.unload();
      sound = new Howl({
        src: [src],
        loop: loop ?? false,
        volume: fadeOptions?.startVolume ?? 1,
        onload: () => {
          // 音频加载完成后的回调
        },
        onloaderror: (id, error) => {
          console.error(`音频加载失败 (${key}):`, error);
        },
        onplayerror: (id, error) => {
          console.error(`音频播放失败 (${key}):`, error);
        },
      });
    } else {
      sound = item.sound;
      sound.loop(loop ?? false);
      // 更新起始音量
      if (fadeOptions?.startVolume !== undefined) {
        sound.volume(fadeOptions.startVolume);
      }
    }

    try {
      const id = sound.play();
      sounds.set(key, { sound, id, src });
      if (fadeOptions) {
        // 执行淡入效果
        item?.sound.once("play", () => {
          item.sound.fade(
            fadeOptions.startVolume ?? 0,
            fadeOptions.endVolume ?? 1,
            fadeOptions.duration ?? 1000,
            id,
          );
        });
      }
    } catch (error) {
      console.error(`音频播放失败 (${key}):`, error);
    }
  };

  const pause = async (key: SoundKey, fadeOptions?: FadeOptions) => {
    const item = sounds.get(key);
    if (!item || !item.sound.playing(item.id)) return;

    if (fadeOptions) {
      const currentVolume = item.sound.volume();
      item.sound.fade(currentVolume, fadeOptions.endVolume ?? 0, fadeOptions.duration ?? 1000);
      // 淡出完成后暂停
      item.sound.once("fade", () => {
        item.sound.pause();
        // 重置音量以便下次播放
        item.sound.volume(currentVolume);
      });
    } else {
      item.sound.pause();
    }
  };

  const resume = (key: SoundKey, fadeOptions?: FadeOptions) => {
    const item = sounds.get(key);
    if (!item) return;

    if (item.sound.playing(item.id)) return;

    try {
      const id = item.sound.play();
      // 更新存储的ID
      sounds.set(key, {
        ...item,
        id,
      });

      if (fadeOptions) {
        // 执行淡入效果
        item.sound.once("play", () => {
          item.sound.fade(
            fadeOptions.startVolume ?? 0,
            fadeOptions.endVolume ?? 1,
            fadeOptions.duration ?? 1000,
            id,
          );
        });
      }
    } catch (error) {
      console.error(`音频恢复播放失败 (${key}):`, error);
    }
  };

  const stop = async (key: SoundKey, fadeOptions?: FadeOptions) => {
    const item = sounds.get(key);
    if (!item) return;

    if (fadeOptions) {
      // 执行淡出效果后再停止
      const currentVolume = item.sound.volume();
      item.sound.fade(currentVolume, fadeOptions.endVolume ?? 0, fadeOptions.duration ?? 1000);
      item.sound.once("fade", () => {
        item.sound.stop(item.id);
        // 重置音量以便下次播放
        item.sound.volume(currentVolume);
      });
    } else {
      item.sound.stop();
    }
  };

  const stopAll = async (fadeOptions?: FadeOptions) => {
    sounds.forEach((item) => {
      if (item.sound.playing(item.id)) {
        if (fadeOptions) {
          const currentVolume = item.sound.volume();
          item.sound.fade(currentVolume, fadeOptions.endVolume ?? 0, fadeOptions.duration ?? 1000);

          item.sound.once("fade", () => {
            item.sound.stop();
            item.sound.volume(currentVolume);
          });
        } else {
          item.sound.stop();
        }
      }
    });
  };

  const isPlaying = (name: SoundKey) => {
    const item = sounds.get(name);
    if (!item) return false;
    return item.sound.playing(item.id);
  };

  const setVolume = (key: SoundKey, volume: number) => {
    const item = sounds.get(key);
    if (!item) return;
    item.sound.volume(volume);
  };

  // 清理所有音频资源
  const clear = () => {
    sounds.forEach((item) => {
      item.sound.unload();
    });
    sounds.clear();
  };

  return {
    sounds,
    play,
    pause,
    resume,
    stop,
    stopAll,
    setVolume,
    isPlaying,
    clear,
  };
});

export default useSoundStore;
