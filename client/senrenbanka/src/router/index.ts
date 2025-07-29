import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Game",
      component: () => import("@/views/Op.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = import.meta.env.VITE_APP_TITLE;
  next();
});

export default router;
