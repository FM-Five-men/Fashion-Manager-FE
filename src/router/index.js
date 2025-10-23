import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/RegisterMemberView.vue';
import FindIdView from '../components/FindIdView.vue';
import FindPasswordView from '../components/FindPasswordView.vue';
import AdminLoginView from '../components/AdminLoginView.vue';
import ChangePasswordView from '../components/ChangePasswordView.vue';
import RegisterAdminView from '../components/RegisterAdminView.vue';
import MessageView from '../components/MessageView.vue';


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },{
    path: '/main',
    name: 'main',
    component: MainView
  },{
    path: '/registermember',
    name: 'registermember',
    component: RegisterMemberView
  },{
    path: '/findid',
    name: 'findid',
    component: FindIdView
  },{
    path: '/findpassword',
    name: 'findpassword',
    component: FindPasswordView
  },{
     path: '/adminlogin',
     name: 'adminlogin',
     component: AdminLoginView
  },{
    path: '/changepassword',
    name: 'changepassword',
    component: ChangePasswordView
  },{
    path: '/registeradmin',
    name: 'registeradmin',
    component: RegisterAdminView
  },{
    path: '/message',
    name: 'message',
    component: MessageView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router