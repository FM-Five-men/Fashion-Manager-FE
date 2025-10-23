import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/RegisterMemberView.vue';
import FindIdView from '../components/FindIdView.vue';
import FindPasswordView from '../components/FindPasswordView.vue';
import AdminLoginView from '../components/AdminLoginView.vue';
import ChangePasswordView from '../components/ChangePasswordView.vue';
import MentoringBoardView from '../components/post/mentoring/MentoringBoardView.vue';
import RegistMentoringPostView from '../components/post/mentoring/RegistMentoringPostView.vue';
import MentoringPostView from '../components/post/mentoring/MentoringPostView.vue';
import ReviewBoardView from '../components/post/review/ReviewBoardView.vue';
import RegistReviewPostView from '../components/post/review/RegistReviewPostView.vue';
import ReviewPostView from '../components/post/review/ReviewPostView.vue';
import FashionBoardView from '../components/post/fashion/FashionBoardView.vue';

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
  }, {
    path: '/mentoringboard',
    name: 'mentoringboard',
    component: MentoringBoardView
  }, {
    path: '/registmentoringpost',
    name: 'registmentoringpost',
    component: RegistMentoringPostView
  }, {
    path: '/mentoringpost',
    name: 'mentoringpost',
    component: MentoringPostView
  }, {
    path: '/reviewboard',
    name: 'reviewboard',
    component: ReviewBoardView
  }, {
    path: '/registreviewpost',
    name: 'registreviewpost',
    component: RegistReviewPostView
  }, {
    path: '/reviewpostview',
    name: 'reviewpostview',
    component: ReviewPostView
  }, {
    path: '/fashionboardview',
    name: 'fashionboardview',
    component: FashionBoardView
  } 
  // {
  //   path: '/reviewpostview',
  //   name: 'reviewpostview',
  //   component: ReviewPostView
  // }, {
  //   path: '/reviewpostview',
  //   name: 'reviewpostview',
  //   component: ReviewPostView
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router