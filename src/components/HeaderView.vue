<template>
  <div style="width: 100%; height: 100%; padding-right: 22px; background: rgba(242.99, 242.99, 242.99, 0.80); border-bottom: 0.67px rgba(0, 0, 0, 0.10) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
    <div style="align-self: stretch; height: 64px; padding-left: 16px; padding-right: 16px; justify-content: space-between; align-items: center; display: inline-flex">

      <div style="height: 32px; justify-content: flex-start; align-items: center; gap: 32px; display: flex">
        <div style="height: 32px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <router-link to="/"> <img style="width: 125px; height: 52px; display: block;" :src="logoUrl" alt="Logo" />
          </router-link>
        </div>
        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
          <router-link v-for="item in navItems" :key="item.name" :to="item.path" style="text-decoration: none; color: #0A0A0A; font-size: 14px; font-family: Arimo; font-weight: 400; line-height: 20px; word-wrap: break-word">
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <div style="width: 448px; height: 36px; position: relative; display: flex; align-items: center; justify-content: flex-end;">

        <router-link to="/message" style="position: relative; margin-right: 15px; display: flex; align-items: center;">
          <img style="width: 28px; height: 28px;" :src="notificationIcon" alt="Notifications" />
          <div v-if="newNotification" style="width: 4px; height: 4px; position: absolute; top: -1px; right: -1px; background: #E17100; border-radius: 50%;"></div>
        </router-link>

        <div v-if="isLoggedIn" style="display: flex; align-items: center; gap: 8px;">
          <router-link to="/mypage">
            <div style="width: 32px; height: 32px; overflow: hidden; border-radius: 50%; justify-content: flex-start; align-items: flex-start; display: inline-flex">
              <img style="width: 100%; height: 100%; object-fit: cover;" :src="userProfilePic" alt="Profile" />
            </div>
          </router-link>
          <button @click="logout" style="padding: 1px 14px; background: #B1B1B1; border-radius: 8px; border:none; cursor: pointer;">
            <div style="color: white; font-size: 12px; font-family: Arimo; font-weight: 400; line-height: 20px; word-wrap: break-word">로그아웃</div>
          </button>
        </div>

        <div v-else>
          <router-link to="/">로그인</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 이미지 경로를 public/images 기준으로 수정
const logoUrl = ref('/images/logo.jpg'); // 로고 이미지 경로 수정
const userProfilePic = ref('/images/influencer_page/influencerImg14.png'); // 기본 프로필 이미지 (필요시 수정)
const notificationIcon = ref('/images/mail.jpg'); // 알림(메일) 아이콘 경로 수정

// 네비게이션 경로 확인 및 수정 (라우터 설정과 일치해야 함)
const navItems = ref([
  { name: '패션', path: '/fashionboardview' }, // 라우터 경로 확인
  { name: '후기', path: '/reviewboardview' },     // 라우터 경로 확인
  { name: '멘토링', path: '/mentoringboardview' }, // 라우터 경로 확인
  { name: '인플루언서', path: '/influencerpage' } // 라우터 경로 확인
]);

// --- 실제 구현 시 수정 필요 ---
const isLoggedIn = ref(false); // 기본값 false
const newNotification = ref(true); // 새 알림 표시 여부
// --------------------------

const search = () => { console.log("검색 기능 실행"); };

const logout = () => {
  console.log("로그아웃 실행");
  sessionStorage.removeItem('token');
  isLoggedIn.value = false;
  router.push('/'); // 로그인 페이지로 이동
};

onMounted(() => {
  // 페이지 로드 시 로그인 상태 확인
  const token = sessionStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    // 사용자 정보 API 호출하여 userProfilePic 업데이트 등
  } else {
    isLoggedIn.value = false;
  }
});
</script>

<style scoped>
img { user-select: none; -webkit-user-drag: none; }
a { text-decoration: none; color: inherit; }
</style>