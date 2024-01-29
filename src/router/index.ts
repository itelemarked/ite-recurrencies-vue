import { createRouter, createWebHistory } from '@ionic/vue-router'

import HomePage from '@/modules/Home/views/HomePage.vue'
import RecurrencyPage from '@/views/RecurrencyPage.vue'
import AuthPage from '@/modules/Auth/views/AuthPage.vue'
import TestPage from '@/modules/Test/views/TestPage.vue'
import { useAuth } from '../modules/Auth/use/useAuth'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/recurrency', name: 'recurrency', component: RecurrencyPage, meta: { requiresAuth: true } },
    { path: '/auth', name: 'auth', component: AuthPage },
    { path: '/test', name: 'test', component: TestPage },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ]
})


router.beforeEach((to, from) => {
  const isAuthenticated = useAuth().user.value !== null
  if (!isAuthenticated && to.meta.requiresAuth) return {name: 'auth'}
  return true
})

