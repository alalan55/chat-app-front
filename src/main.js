import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
app.mount('#app')
