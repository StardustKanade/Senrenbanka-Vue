import { defineStore } from "pinia";
import { ref } from "vue";

const useGameStore = defineStore("game", () => {
  const showHomeAnimation = ref(true);

  const setHomeAnimation = (value: boolean) => {
    showHomeAnimation.value = value;
  };

  return { showHomeAnimation, setHomeAnimation };
});

export default useGameStore;
