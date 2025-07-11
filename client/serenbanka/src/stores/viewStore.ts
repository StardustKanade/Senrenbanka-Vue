import { defineStore } from "pinia";
import { ref } from "vue";

type ViewType = "Op" | "Home";

const useViewStore = defineStore("view", () => {
  const view = ref<ViewType>("Op");

  const setView = (type: ViewType) => {
    view.value = type;
  };

  return { view, setView };
});

export default useViewStore;
