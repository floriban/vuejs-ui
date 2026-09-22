import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/app-ui.css'
import { initializeTheme } from './composables/useTheme'

initializeTheme()
createApp(App).use(router).mount('#app')
