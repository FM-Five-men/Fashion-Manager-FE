<template>
  <div style="width: 100%; height: 100%; padding-right: 22px; background: rgba(242.99, 242.99, 242.99, 0.80); border-bottom: 0.67px rgba(0, 0, 0, 0.10) solid; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
    <div style="align-self: stretch; height: 64px; padding-left: 16px; padding-right: 16px; justify-content: space-between; align-items: center; display: inline-flex">

      <div style="/* width: 343px; */ height: 32px; justify-content: flex-start; align-items: center; gap: 32px; display: flex">
        <div style="/* width: 189px; */ height: 32px; justify-content: flex-start; align-items: center; gap: 8px; display: flex">
          <router-link to="/main">
            <img style="width: 125px; height: 52px; display: block;" :src="logoUrl" alt="Logo" />
          </router-link>
        </div>
        <div style="flex: 1 1 0; height: 20px; justify-content: flex-start; align-items: center; gap: 24px; display: flex">
          <router-link v-for="item in navItems" :key="item.name" :to="item.path" style="text-decoration: none; color: #0A0A0A; font-size: 14px; font-family: Arimo; font-weight: 400; line-height: 20px; word-wrap: break-word">
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <div style="width: 448px; height: 36px; position: relative; display: flex; align-items: center; justify-content: flex-end;">

        <div style="width: 20px; height: 20px; margin-right: 15px; cursor: pointer; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex" @click="search">
          <div style="align-self: stretch; height: 20px; position: relative; overflow: hidden">
            <div style="width: 3.62px; height: 3.62px; left: 13.88px; top: 13.88px; position: absolute; outline: 1.67px black solid; outline-offset: -0.83px"></div>
            <div style="width: 13.33px; height: 13.33px; left: 2.50px; top: 2.50px; position: absolute; outline: 1.67px black solid; outline-offset: -0.83px"></div>
          </div>
        </div>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 로고 이미지 URL
const logoUrl = ref('/images/logo.png');
const userProfilePic = ref('/images/default_avatar.png');
const notificationIcon = ref('/images/notification.png');

// 네비게이션 메뉴 항목 배열 (이름과 경로 포함)
const navItems = ref([
  { name: '패션', path: '/fashionpost' },     // 수정됨
  { name: '후기', path: '/reviewpost' },     // 수정됨
  { name: '멘토링', path: '/mentoringpost' }, // 수정됨
  { name: '인플루언서', path: '/influencerpage' } // 수정됨
]);

// --- 실제 구현 시 수정 필요 ---
const isLoggedIn = ref(false);
const newNotification = ref(true);
// --------------------------

// 검색 기능 (예시)
const search = () => {
  console.log("검색 기능 실행");
  // 검색 로직 구현
};

// 로그아웃 기능
const logout = () => {
  console.log("로그아웃 실행");
  // sessionStorage 또는 localStorage에서 토큰 제거
  sessionStorage.removeItem('token');
  // localStorage.removeItem('token');

  // 로그인 상태 업데이트 (필요시 상태 관리 라이브러리 사용)
  isLoggedIn.value = false; // 간단 예시

  // 로그인 페이지('/')로 이동
  router.push('/');
};

// 컴포넌트 마운트 시 로그인 상태 확인 (예시)
import { onMounted } from 'vue';
onMounted(() => {
  const token = sessionStorage.getItem('token');
  // const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    // 사용자 정보나 알림 상태 등 추가 API 호출 가능
  } else {
    isLoggedIn.value = false;
  }
});

</script>

<style scoped>
img {
  user-select: none;
  -webkit-user-drag: none;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>