import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Op.vue'),
      meta: {
        title: '千恋万花 - Web版',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;
  next();
});

export default router;
