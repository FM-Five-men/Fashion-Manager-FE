import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/RegisterMemberView.vue';
import FindIdView from '../components/FindIdView.vue';
import FindPasswordView from '../components/FindPasswordView.vue';
import AdminLoginView from '../components/AdminLoginView.vue';
import ChangePasswordView from '../components/ChangePasswordView.vue';
import FashionPostView from '../components/FashionPostView.vue';
// ReviewPostView, MentoringPostView, InfluencerPageView 등 필요한 컴포넌트 import 추가
// import ReviewPostView from '../components/ReviewPostView.vue'; // 예시
// import MentoringPostView from '../components/MentoringPostView.vue'; // 예시
// import InfluencerPageView from '../components/InfluencerPageView.vue'; // 예시
// import MessageView from '../components/MessageView.vue'; // 예시
// import MyPageView from '../components/MyPageView.vue'; // 예시

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/main', name: 'main', component: MainView },
  { path: '/registermember', name: 'registermember', component: RegisterMemberView },
  { path: '/findid', name: 'findid', component: FindIdView },
  { path: '/findpassword', name: 'findpassword', component: FindPasswordView },
  { path: '/adminlogin', name: 'adminlogin', component: AdminLoginView },
  { path: '/changepassword', name: 'changepassword', component: ChangePasswordView }, // 오타 수정: changepsword -> changepassword
  {
    path: '/fashionpost', // 수정: /posts/fashion -> /fashionpost
    name: 'fashionpost',
    component: FashionPostView
  },{
    path: '/reviewpost', // 수정: /posts/review -> /reviewpost
    name: 'reviewpost',
    // component: ReviewPostView // 실제 컴포넌트로 연결 필요
  },{
    path: '/mentoringpost', // 수정: /posts/mentoring -> /mentoringpost
    name: 'mentoringpost',
    // component: MentoringPostView // 실제 컴포넌트로 연결 필요
  },{
    path: '/influencerpage', // 수정: influencerPage -> /influencerpage (일관성을 위해 슬래시 추가)
    name: 'influencerpage',
    // component: InfluencerPageView // 실제 컴포넌트로 연결 필요
  },{
    path: '/message',
    name: 'message',
    // component: MessageView // 실제 컴포넌트로 연결 필요
  },{
    path: '/mypage',
    name: 'mypage',
    // component: MyPageView // 실제 컴포넌트로 연결 필요
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router