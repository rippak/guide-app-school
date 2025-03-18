import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(createYmaps({
    apikey: import.meta.env.VITE_YMAPS_API_KEY,
    lang: 'ru_RU',
}));

app.mount('#app')
