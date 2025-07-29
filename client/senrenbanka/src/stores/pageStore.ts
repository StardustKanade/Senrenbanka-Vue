import { defineStore } from "pinia";
import { ref, computed, defineAsyncComponent } from "vue";

const pageMap = new Map([
  ["Op", () => import("@/views/Op.vue")],
  ["Home", () => import("@/views/Home.vue")],
  ["Load", () => import("@/views/Load.vue")],
] as const);

export type PageName = typeof pageMap extends Map<infer K, any> ? K : never;

export const usePageStore = defineStore("page", () => {
  const pageName = ref<PageName>("Op");

  const pageComponent = computed(() => {
    const component = pageMap.get(pageName.value) || pageMap.get("Op");
    return defineAsyncComponent(component!);
  });

  const pageTo = (name: PageName) => {
    if (pageMap.has(name)) pageName.value = name;
  };

  return { pageName, pageComponent, pageTo };
});
