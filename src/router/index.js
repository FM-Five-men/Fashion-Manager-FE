import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/management/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/management/RegisterMemberView.vue';
import FindIdView from '../components/management/FindIdView.vue';
import FindPasswordView from '../components/management/FindPasswordView.vue';
import AdminLoginView from '../components/management/AdminLoginView.vue';
import ChangePasswordView from '../components/management/ChangePasswordView.vue';

// 게시글 관련 컴포넌트
import MentoringBoardView from '../components/post/mentoring/MentoringBoardView.vue';
import RegistMentoringPostView from '../components/post/mentoring/RegistMentoringPostView.vue'; // 수정 시 재활용
import MentoringPostView from '../components/post/mentoring/MentoringPostView.vue';
import ReviewBoardView from '../components/post/review/ReviewBoardView.vue';
import RegistReviewPostView from '../components/post/review/RegistReviewPostView.vue'; // 수정 시 재활용
import ReviewPostView from '../components/post/review/ReviewPostView.vue';
import FashionBoardView from '../components/post/fashion/FashionBoardView.vue';
// import RegistFashionPostView from '../components/post/fashion/RegistFashionPostView.vue'; // 패션 글쓰기/수정 컴포넌트 (파일이 있다면 import)
import FashionPostView from '../components/post/fashion/FashionPostView.vue';

import InfluencerPageView from '../components/influencer/InfluencerPageView.vue';
import RegisterAdminView from '../components/management/RegisterAdminView.vue';
import MessageView from '../components/message/MessageView.vue';
import AdminView from '../components/management/AdminView.vue';
import ReportListView from '../components/report/ReportListView.vue';
import MemberListView from '../components/management/MemberListView.vue';
// import MyPageView from '../components/MyPageView.vue';

const routes = [
  // --- 공통 & 회원 관리 ---
  { path: '/', name: 'login', component: LoginView },
  { path: '/main', name: 'main', component: MainView },
  { path: '/registermember', name: 'registermember', component: RegisterMemberView },
  { path: '/findid', name: 'findid', component: FindIdView },
  { path: '/findpassword', name: 'findpassword', component: FindPasswordView },
  { path: '/changepassword', name: 'changepassword', component: ChangePasswordView },

  // --- 게시판 (목록, 작성, 상세, 수정) ---
  // Fashion
  { path: '/fashionboardview', name: 'fashionboardview', component: FashionBoardView },
  // { path: '/registfashionpost', name: 'registfashionpost', component: RegistFashionPostView }, // 패션 글쓰기 경로 (컴포넌트 확인 필요)
  // { path: '/editfashionpost/:id', name: 'editfashionpost', component: RegistFashionPostView }, // *** 패션 글수정 경로 추가 ***
  { path: '/fashionpost/:id', name: 'fashionpost', component: FashionPostView },

  // Review
  { path: '/reviewboard', name: 'reviewboard', component: ReviewBoardView },
  { path: '/registreviewpost', name: 'registreviewpost', component: RegistReviewPostView }, // 글 작성
  { path: '/editreviewpost/:id', name: 'editreviewpost', component: RegistReviewPostView }, // *** 글 수정 경로 추가 ***
  { path: '/reviewpost/:id', name: 'reviewpost', component: ReviewPostView },

  // Mentoring
  { path: '/mentoringboard', name: 'mentoringboard', component: MentoringBoardView },
  { path: '/registmentoringpost', name: 'registmentoringpost', component: RegistMentoringPostView }, // 글 작성
  { path: '/editmentoringpost/:id', name: 'editmentoringpost', component: RegistMentoringPostView }, // *** 글 수정 경로 추가 ***
  { path: '/mentoringpost/:id', name: 'mentoringpost', component: MentoringPostView },

  // --- 인플루언서 ---
  { path: '/influencerpage', name: 'influencerpage', component: InfluencerPageView },

  // --- 메시지 ---
  { path: '/message', name: 'message', component: MessageView },

  // --- 마이페이지 ---
  // { path: '/mypage', name: 'mypage', component: MyPageView },

  // --- 관리자 ---
  { path: '/adminlogin', name: 'adminlogin', component: AdminLoginView },
  { path: '/registeradmin', name: 'registeradmin', component: RegisterAdminView },
  { path: '/admin', name: 'admin', component: AdminView },
  { path: '/reportlist', name: 'reportlist', component: ReportListView },
  { path: '/memberlist', name: 'memberlist', component: MemberListView }
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router