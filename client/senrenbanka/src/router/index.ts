import { createRouter, createWebHistory } from "vue-router";

export type ViewName = "Op" | "Home" | "Game" | "Load";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "OP",
      component: () => import("@/views/Op.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/load",
      name: "Load",
      component: () => import("@/views/Load.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = import.meta.env.VITE_APP_TITLE;
  next();
});

export default router;
