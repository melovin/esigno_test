import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from '@/layouts/default.vue'
import Auth from '@/layouts/auth.vue'

createApp(App).use(router).component('default-layout', Default).component('auth-layout', Auth).mount('#app')
