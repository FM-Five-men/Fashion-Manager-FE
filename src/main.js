import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
//import Login from './components/LoginView.vue'

createApp(App).use(router).mount('#app')
