import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },{
    path: '/main',
    name: 'main',
    component: MainView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router