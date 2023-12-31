import { createRouter, createWebHistory } from '@ionic/vue-router'

import HomePage from '@/views/HomePage.vue'
import RecurrencyPage from '@/views/RecurrencyPage.vue'
import AuthPage from '@/modules/Auth/views/AuthPage.vue'
import TestPage from '@/modules/Test/views/TestPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/recurrency', name: 'recurrency', component: RecurrencyPage },
    { path: '/auth', name: 'auth', component: AuthPage },
    { path: '/test', name: 'test', component: TestPage },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ]
})

