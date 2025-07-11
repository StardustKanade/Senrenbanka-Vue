import { defineStore } from "pinia";
import { ref } from "vue";

export type ViewType = "Op" | "Home" | "Game" | "Load";

const useViewStore = defineStore("view", () => {
  const view = ref<ViewType>("Op");

  const setView = (type: ViewType) => {
    view.value = type;
  };

  return { view, setView };
});

export default useViewStore;
