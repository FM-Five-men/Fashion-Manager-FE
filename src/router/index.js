import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../components/management/LoginView.vue';
import MainView from '../components/MainView.vue';
import RegisterMemberView from '../components/management/RegisterMemberView.vue';
import FindIdView from '../components/management/FindIdView.vue';
import FindPasswordView from '../components/management/FindPasswordView.vue';
import AdminLoginView from '../components/management/AdminLoginView.vue';
import ChangePasswordView from '../components/management/ChangePasswordView.vue';

// Imports from HEAD branch
import MentoringBoardView from '../components/post/mentoring/MentoringBoardView.vue';
import RegistMentoringPostView from '../components/post/mentoring/RegistMentoringPostView.vue';
import MentoringPostView from '../components/post/mentoring/MentoringPostView.vue';
import ReviewBoardView from '../components/post/review/ReviewBoardView.vue';
import RegistReviewPostView from '../components/post/review/RegistReviewPostView.vue';
import ReviewPostView from '../components/post/review/ReviewPostView.vue';
import FashionBoardView from '../components/post/fashion/FashionBoardView.vue';
import FashionPostView from '../components/post/fashion/FashionPostView.vue';
import RegistFashionPostView from '../components/post/fashion/RegistFashionPostView.vue';

// influencerPage
import InfluencerPageView from '../components/influencer/01_Page/InfluencerPageView.vue';  // 인플루언서 리스트 페이지
import InfluencerProfileView from '../components/influencer/01_Page/InfluencerProfileView.vue';  // 인플루언서 상세 페이지
import InfluencerApplyView from '../components/influencer/01_Page/InfluencerApplyView.vue'; // 인플루언서 신청 페이지
import MenteeApplyView from '../components/influencer/01_Page/MenteeApplyView.vue'; // 멘토링 신청 페이지

// Placeholders/Imports from features branch (Uncomment and complete as needed)
// import FashionPostView from '../components/FashionPostView.vue'; // Likely replaced by FashionBoardView or similar
// import MessageView from '../components/MessageView.vue'; // 예시
// import MyPageView from '../components/MyPageView.vue'; // 예시
import RegisterAdminView from '../components/management/RegisterAdminView.vue';
import MessageView from '../components/message/MessageView.vue';
import AdminView from '../components/management/AdminView.vue';
import ReportListView from '../components/report/ReportListView.vue';
import MemberListView from '../components/management/MemberListView.vue';
import PostListView from '../components/post/PostListView.vue';
import InfluencerListView from '../components/influencer/InfluencerListView.vue';
import ModifyFashionPostView from '../components/post/fashion/ModifyFashionPostView.vue';


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
    path: '/mentoringboardview',
    name: 'mentoringboardview',
    component: MentoringBoardView
  }, {
    path: '/registmentoringpost',
    name: 'registmentoringpost',
    component: RegistMentoringPostView
  }, {
    // Kept '/mentoringpost' from HEAD as it has a component linked
    path: '/mentoringpost/1',
    name: 'mentoringpost',
    component: MentoringPostView
  }, {
    path: '/reviewboardview',
    name: 'reviewboardview',
    component: ReviewBoardView
  }, {
    path: '/registreviewpost',
    name: 'registreviewpost',
    component: RegistReviewPostView
  }, {
    // Using '/reviewpostview' from HEAD
    path: '/reviewpostview/1',
    name: 'reviewpostview',
    component: ReviewPostView
  }, {
    // Using '/fashionboardview' from HEAD
    path: '/fashionboardview',
    name: 'fashionboardview',
    component: FashionBoardView
  },

  // influencerPage 
  {
    path: '/influencerpage',
    name: 'influencerpage',
    component: InfluencerPageView
  }, {
    path: '/influencerpage/:num',
    name: 'influencerpage-profile',
    component: InfluencerProfileView,
    props: true
  }, { 
    path: '/influencerapply',
    name: 'influencerapply',
    component: InfluencerApplyView,
    props: true
  }, { 
    path: '/menteeapply',
    name: 'menteeapply',
    component: MenteeApplyView,
    props: true
  },
  
  
  {
    path: '/message',
    name: 'message',
    // component: MessageView // 실제 컴포넌트로 연결 필요
  },{
    path: '/mypage',
    name: 'mypage',
    // component: MyPageView // 실제 컴포넌트로 연결 필요
  },{
    path: '/fashionpost/:id',
    name: 'fashionpost',
    component: FashionPostView
  }, {
    path: '/registfashionpost',
    name: 'registfashionpost',
    component: RegistFashionPostView
  },{
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
  },{
    path: '/influencerlist',
    name: 'influencerlist',
    component: InfluencerListView
  },{
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
                {
                  path: '',
                  name: 'memberlist',
                  component: MemberListView
                },{
                  path: 'reportlist',
                  name: 'reportlist',
                  component: ReportListView
                },{
                  path: 'postlist',
                  name: 'postlist',
                  component: PostListView
                }
    ]
  }, {
    path: '/fashion/posts/:postNum/edit',
    name: 'modifyfashionpostview',
    component: ModifyFashionPostView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router