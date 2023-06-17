import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
