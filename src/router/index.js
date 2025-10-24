import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/RegisterMemberView.vue';
import FindIdView from '../components/FindIdView.vue';
import FindPasswordView from '../components/FindPasswordView.vue';
import AdminLoginView from '../components/AdminLoginView.vue';
import ChangePasswordView from '../components/ChangePasswordView.vue';

// Imports from HEAD branch
import MentoringBoardView from '../components/post/mentoring/MentoringBoardView.vue';
import RegistMentoringPostView from '../components/post/mentoring/RegistMentoringPostView.vue';
import MentoringPostView from '../components/post/mentoring/MentoringPostView.vue';
import ReviewBoardView from '../components/post/review/ReviewBoardView.vue';
import RegistReviewPostView from '../components/post/review/RegistReviewPostView.vue';
import ReviewPostView from '../components/post/review/ReviewPostView.vue';
import FashionBoardView from '../components/post/fashion/FashionBoardView.vue';
import FashionPostView from '../components/post/fashion/FashionPostView.vue';

import InfluencerPageView from '../components/influencer/InfluencerPageView.vue';

// Placeholders/Imports from features branch (Uncomment and complete as needed)
// import FashionPostView from '../components/FashionPostView.vue'; // Likely replaced by FashionBoardView or similar
// import MessageView from '../components/MessageView.vue'; // 예시
// import MyPageView from '../components/MyPageView.vue'; // 예시

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/main', name: 'main', component: MainView },
  { path: '/registermember', name: 'registermember', component: RegisterMemberView },
  { path: '/findid', name: 'findid', component: FindIdView },
  { path: '/findpassword', name: 'findpassword', component: FindPasswordView },
  { path: '/adminlogin', name: 'adminlogin', component: AdminLoginView },
  { path: '/changepassword', name: 'changepassword', component: ChangePasswordView }, // Corrected typo from features

  // Routes primarily from HEAD branch (more specific)
  {
    path: '/mentoringboard',
    name: 'mentoringboard',
    component: MentoringBoardView
  }, {
    path: '/registmentoringpost',
    name: 'registmentoringpost',
    component: RegistMentoringPostView
  }, {
    // Kept '/mentoringpost' from HEAD as it has a component linked
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
    // Using '/reviewpostview' from HEAD
    path: '/reviewpostview',
    name: 'reviewpostview',
    component: ReviewPostView
  }, {
    // Using '/fashionboardview' from HEAD
    path: '/fashionboardview',
    name: 'fashionboardview',
    component: FashionBoardView
  },

  // Routes primarily from features branch
  {
    path: '/influencerpage',
    name: 'influencerpage',
    component: InfluencerPageView
  },{
    path: '/message',
    name: 'message',
    // component: MessageView // 실제 컴포넌트로 연결 필요
  },{
    path: '/mypage',
    name: 'mypage',
    // component: MyPageView // 실제 컴포넌트로 연결 필요
  }
  // '/fashionpost' and '/reviewpost' from features were likely superseded
  // by '/fashionboardview' and '/reviewpostview' from HEAD. Adjust if needed.
  ,{
    path: '/fashionpost',
    name: 'fashionpost',
    component: FashionPostView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router