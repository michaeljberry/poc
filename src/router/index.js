import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/blog',
      name: 'blog',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/blog/post/:slug/:id',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      // props: (route) => ({ post: { slug: route.params.slug, id: route.params.identifier } })
      props: true
    }
  ]
})

export default router
