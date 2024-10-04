import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)
app.provide('hostname', import.meta.env.VITE_HOSTNAME)

app.use(createPinia())
app.use(router)

app.mount('#app')