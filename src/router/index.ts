import { createRouter, createWebHistory } from "@ionic/vue-router";
import RecipeListView from '@/views/RecipeListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'recipes',
      component: RecipeListView,
    },
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: () => import("../views/RecipeDetailView.vue"),
    },
  ],
})

export default router
