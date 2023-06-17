import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from '@/layouts/default.vue'
import Auth from '@/layouts/auth.vue'
import VOtpInput from "vue3-otp-input";

createApp(App).use(router).component('default-layout', Default).component('auth-layout', Auth).component('v-otp-input', VOtpInput).mount('#app')
