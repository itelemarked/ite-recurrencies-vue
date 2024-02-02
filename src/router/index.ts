import { createRouter, createWebHistory } from '@ionic/vue-router'

import HomePage from '@/modules/Home/views/HomePage.vue'
import RecurrencyPage from '@/modules/Recurrencies/views/RecurrencyPage.vue'
import AuthPage from '@/modules/Auth/views/AuthPage.vue'
import TestPage from '@/modules/Test/views/TestPage.vue'
import * as useAuth from '../modules/Auth/use/useAuth'
import { watch } from 'vue'

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


router.beforeEach(async (to, from) => {
  const isAuthenticated = await useAuth.getCurrentUser() !== null
  if (!isAuthenticated && to.meta.requiresAuth) return { name: 'auth' }
  return true
})


/** Redirect automatically to Auth if user is logged out */
useAuth.onChange((newUser) => {
  // console.log('user changed!')
  if(newUser === null) {
    router.replace({ path: '/auth' })
  }
})
