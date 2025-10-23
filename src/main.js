import { createApp } from 'vue'
import './style.css' // 전역 CSS import
import router from './router' // 라우터 import
import App from './App.vue'

// Vue 앱 생성 및 라우터 사용 설정, #app 요소에 마운트
createApp(App).use(router).mount('#app')