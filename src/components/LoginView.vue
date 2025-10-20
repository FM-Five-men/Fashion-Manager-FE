<script setup>
import { ref } from "vue";
import axios from "axios";
import banner from "../assets/banner.jpg" // 배너 이미지 import
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref("login");

// 로그인 폼 데이터
const id = ref("");
const password = ref("");
const rememberMe = ref(false);

// 회원가입 폼 데이터
const name = ref("");
const signupEmail = ref("");
const signupPassword = ref("");
const signupPasswordConfirm = ref("");
const agree = ref(false);

// 로그인 함수
const login = async () => {
  try {
    
    const data = new FormData();
    data.append("memberId", id.value);
    data.append("memberPwd", password.value);

    console.log(data)
    const res = await axios.post("/api/member-service/member/memberlogin", data);
    
    if(res.data != "존재하지 않는 회원" && res.data != "비밀번호 불일치"){
      const token = res.data;
      sessionStorage.setItem("token", token);
      if(token){
        router.push('/main')
      }
    }
  } catch (err) {
    console.error("로그인 에러:", err);
  }
};

// 회원가입 함수
const signup = async () => {
  if (!agree.value) {
    alert("이용약관에 동의해야 합니다.");
    return;
  }
  console.log("회원가입 시도:", name.value, signupEmail.value);
};
</script>

<template>
  <div class="container">
    <!-- 왼쪽 배너 -->
    <div class="left-section"></div>

    <!-- 오른쪽 로그인/회원가입 -->
    <div class="right-section">
      <div class="tab-buttons">
        <button
          :class="activeTab === 'login' ? 'active' : 'inactive'"
          @click="activeTab = 'login'"
        >
          로그인
        </button>
        <button
          :class="activeTab === 'signup' ? 'active' : 'inactive'"
          @click="activeTab = 'signup'"
        >
          회원가입
        </button>
      </div>

      <!-- 로그인 폼 -->
      <div v-if="activeTab === 'login'" class="form-section">
        <h2>Welcome Back</h2>
        <p class="sub-text">패션의 세계로 돌아오신 것을 환영합니다</p>
        <form @submit.prevent="login">
          <label>아이디</label>
          <input type="text" v-model="id" />
          <label>비밀번호</label>
          <input type="password" v-model="password" placeholder="•••••••" />
          <div class="options">
            <label><input type="checkbox" v-model="rememberMe" /> 로그인 상태 유지</label>
            <a href="#">비밀번호 찾기</a>
          </div>
          <button type="submit" class="action-btn">로그인</button>
        </form>
      </div>

      <!-- 회원가입 폼 -->
      <div v-else class="form-section">
        <h2>Join Us</h2>
        <p class="sub-text">새로운 패션 여정을 시작하세요</p>
        <form @submit.prevent="signup">
          <label>이름</label>
          <input type="text" v-model="name" placeholder="홍길동" />
          <label>이메일</label>
          <input type="email" v-model="signupEmail" placeholder="example@email.com" />
          <label>비밀번호</label>
          <input type="password" v-model="signupPassword" placeholder="••••••••" />
          <p class="password-hint">8자 이상, 영문, 숫자, 특수문자 포함</p>
          <label>비밀번호 확인</label>
          <input type="password" v-model="signupPasswordConfirm" placeholder="••••••••" />
          <label class="agree-box">
            <input type="checkbox" v-model="agree" />
            이용약관 및 <span>개인정보처리방침</span>에 동의합니다
          </label>
          <button type="submit" class="action-btn">회원가입</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 화면 */
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

/* 왼쪽 배너 */
.left-section {
  flex: 1;
  background-image: url('../assets/banner.jpg');
  background-size: cover;
  background-position: center;
}

/* 오른쪽 로그인/회원가입 */
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  background-color: #fff;
}

/* 탭 버튼 */
.tab-buttons {
  display: flex;
  width: 100%;
  max-width: 400px;
  justify-content: center;
  margin-bottom: 30px;
}

.tab-buttons button {
  flex: 1;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  border-radius: 20px;
  margin: 0 5px;
}

.tab-buttons .active {
  background-color: black;
  color: white;
}

.tab-buttons .inactive {
  background-color: #f2f2f2;
  color: black;
}

/* 폼 스타일 */
.form-section {
  width: 100%;
  max-width: 400px;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 15px;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 20px;
}

.options a {
  color: #f0a500;
  text-decoration: none;
}

.password-hint {
  color: #999;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 15px;
}

.agree-box {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-bottom: 25px;
}

.agree-box input {
  margin-right: 8px;
}

.agree-box span {
  color: #f0a500;
  margin: 0 4px;
  cursor: pointer;
}

.action-btn {
  background-color: black;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  width: 100%;
}

.action-btn:hover {
  background-color: #333;
}

.sub-text {
  color: #777;
  margin-bottom: 30px;
  font-size: 13px;
}
</style>