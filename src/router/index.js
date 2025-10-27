import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/management/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/management/RegisterMemberView.vue';
import FindIdView from '../components/management/FindIdView.vue';
import FindPasswordView from '../components/management/FindPasswordView.vue';
import AdminLoginView from '../components/management/AdminLoginView.vue';
import ChangePasswordView from '../components/management/ChangePasswordView.vue';

// Imports from HEAD branch (assuming these are the correct paths)
import MentoringBoardView from '../components/post/mentoring/MentoringBoardView.vue';
import RegistMentoringPostView from '../components/post/mentoring/RegistMentoringPostView.vue';
import MentoringPostView from '../components/post/mentoring/MentoringPostView.vue'; // 상세 보기
import ReviewBoardView from '../components/post/review/ReviewBoardView.vue';
import RegistReviewPostView from '../components/post/review/RegistReviewPostView.vue';
import ReviewPostView from '../components/post/review/ReviewPostView.vue'; // 상세 보기
import FashionBoardView from '../components/post/fashion/FashionBoardView.vue';
import FashionPostView from '../components/post/fashion/FashionPostView.vue'; // 상세 보기

import InfluencerPageView from '../components/influencer/InfluencerPageView.vue';

// Imports from features branch (assuming these are the correct paths)
import RegisterAdminView from '../components/management/RegisterAdminView.vue';
import MessageView from '../components/message/MessageView.vue';
import AdminView from '../components/management/AdminView.vue';
import ReportListView from '../components/report/ReportListView.vue';
import MemberListView from '../components/management/MemberListView.vue';
// import MyPageView from '../components/MyPageView.vue'; // 필요시 주석 해제 및 import

const routes = [
  // --- 공통 & 회원 관리 ---
  { path: '/', name: 'login', component: LoginView },
  { path: '/main', name: 'main', component: MainView },
  { path: '/registermember', name: 'registermember', component: RegisterMemberView },
  { path: '/findid', name: 'findid', component: FindIdView },
  { path: '/findpassword', name: 'findpassword', component: FindPasswordView },
  { path: '/changepassword', name: 'changepassword', component: ChangePasswordView },

  // --- 게시판 (목록, 작성, 상세) ---
  // Fashion
  { path: '/fashionboardview', name: 'fashionboardview', component: FashionBoardView },
  { path: '/fashionpost/:id', name: 'fashionpost', component: FashionPostView }, // 상세 보기

  // Review
  { path: '/reviewboard', name: 'reviewboard', component: ReviewBoardView },
  { path: '/registreviewpost', name: 'registreviewpost', component: RegistReviewPostView }, // 글 작성 (ID 없이)
  // { path: '/registreviewpost/:id', name: 'editreviewpost', component: RegistReviewPostView }, // 수정 경로 (필요시 별도 정의)
  // { // 기존 경로 주석 처리
  //   path: '/reviewpostview',
  //   name: 'reviewpostview',
  //   component: ReviewPostView
  // },
  { // 수정된 경로 추가
    path: '/reviewpost/:id', // 동적 파라미터 :id 추가
    name: 'reviewpost',       // 이름 변경 (선택 사항)
    component: ReviewPostView // 상세 보기 컴포넌트 연결
  },

  // Mentoring
  { path: '/mentoringboard', name: 'mentoringboard', component: MentoringBoardView },
  { path: '/registmentoringpost', name: 'registmentoringpost', component: RegistMentoringPostView },
  { // Mentoring 상세 경로는 이미 :id 포함
    path: '/mentoringpost/:id',
    name: 'mentoringpost',
    component: MentoringPostView
  },

  // --- 인플루언서 ---
  { path: '/influencerpage', name: 'influencerpage', component: InfluencerPageView },

  // --- 메시지 ---
  { path: '/message', name: 'message', component: MessageView },

  // --- 마이페이지 ---
  // { path: '/mypage', name: 'mypage', component: MyPageView }, // 필요시 주석 해제

  // --- 관리자 ---
  { path: '/adminlogin', name: 'adminlogin', component: AdminLoginView },
  { path: '/registeradmin', name: 'registeradmin', component: RegisterAdminView },
  { path: '/admin', name: 'admin', component: AdminView }, // 관리자 메인 (대시보드 등)
  { path: '/reportlist', name: 'reportlist', component: ReportListView }, // 신고 목록
  { path: '/memberlist', name: 'memberlist', component: MemberListView }  // 회원 목록
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router