import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomePage from './Home/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ]
})

