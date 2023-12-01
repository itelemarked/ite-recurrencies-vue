import './main.css'

import { IonicVue } from '@ionic/vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(createPinia())
// scrollAssist: false --> fix delayed ion-input focus
app.use(IonicVue, { scrollAssist: false })
app.use(router)

router.isReady().then(() => {
  app.mount('#app');
});
