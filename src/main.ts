import { createApp } from 'vue'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import 'flatpickr/dist/flatpickr.min.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import { initializeTheme } from './composables/useTheme'

initializeTheme()
const app = createApp(App)

app.use(router)

app.mount('#app')
