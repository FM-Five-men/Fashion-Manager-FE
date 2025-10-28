<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from "vue";
import axios from "axios";

const router = useRouter()

const signupId = ref("");
const signupPassword = ref("");
const signupEmail = ref("");
const signupName = ref("");
const signupGender = ref("");     // '남' | '여'
const signupAge = ref(null);      // ✅ 숫자형
const signupPhone = ref("");
const signupAddress = ref("");
const signupHeight = ref(null);   // ✅ 숫자형(선택)
const signupWeight = ref(null);   // ✅ 숫자형(선택)

const showModal = ref(false);
const check = ref(false);
const message = ref("");          // ✅ 서버/클라 메시지 표시
const loading = ref(false);

function normalize() {
  // 공백 제거
  const id = signupId.value?.trim();
  const email = signupEmail.value?.trim();
  const name = signupName.value?.trim();
  const gender = signupGender.value?.trim();
  const phone = signupPhone.value?.trim();
  const address = signupAddress.value?.trim();

  // 숫자 캐스팅 (null 허용인 항목은 null → undefined로 빼도 됨)
  const age = typeof signupAge.value === 'number'
    ? signupAge.value
    : Number(signupAge.value);

  const height = signupHeight.value === null || signupHeight.value === ""
    ? 0  // ← 정책: 미입력 시 0으로 보낼지(null로 둘지 결정하세요)
    : Number(signupHeight.value);

  const weight = signupWeight.value === null || signupWeight.value === ""
    ? 0
    : Number(signupWeight.value);

      return {
      memberId: id,
      memberPwd: signupPassword.value,
      memberEmail: email,
      memberName: name,
      memberAge: age,
      memberGender: gender,      // '남성'/'여성'
      memberPhone: phone,
      memberAddress: address,
      memberHeight: height,
      memberWeight: weight,
    };
}

const registerMember = async () => {
  try {
    message.value = "";
    check.value = false;
    loading.value = true;

    const data = normalize();

    // 클라이언트 측 기초 검증(서버 검증과 별개로 UX 개선)
    if (!data.memberId)  throw new Error("아이디를 입력하세요.");
    if (!data.memberEmail) throw new Error("이메일을 입력하세요.");
    if (!data.memberPwd) throw new Error("비밀번호를 입력하세요.");
    if (!data.memberName) throw new Error("이름을 입력하세요.");
    if (!data.memberGender) throw new Error("성별을 선택하세요.");
    if (!Number.isFinite(data.memberAge) || data.memberAge <= 0)
      throw new Error("나이는 1 이상 숫자여야 합니다.");

    const res = await axios.post(
      "/api/member-service/member/insertmember",
      data,
      { headers: { "Content-Type": "application/json" } }
    );

    check.value = true;
    message.value = "회원가입에 성공하였습니다.";
    showModal.value = true;
  } catch (err) {
    // 서버에서 내려준 메시지 우선 표시
    const serverMsg = err?.response?.data?.message
      || err?.response?.data?.error
      || err?.message
      || "회원가입에 실패했습니다.";
    message.value = serverMsg;
    check.value = false;
    showModal.value = true;
    console.error("회원가입 에러:", err);
  } finally {
    loading.value = false;
  }
};

const login = () => router.push('/');

const closeModal = () => { showModal.value = false; };
</script>

<template>
<div class="page">
  <div class="container">
    <!-- 왼쪽 패널 -->
    <div class="left-panel">
      <img class="background-img" src="/images/login-background.jpg" alt="배경 이미지" />
      <div class="overlay"></div>

      <div class="text-box">
        <div class="title">FASHION</div>
        <div class="title">MANAGER</div>
        <div class="line"></div>
        <div class="subtitle">THE VISIONARY PROJECT</div>
        <div class="tagline">Style. Substance. Success.</div>
      </div>
    </div>

    <!-- 오른쪽 회원가입 폼 -->
    <div class="signup-wrapper">
      <div class="title-wrapper">
        <div class="main-title">회원가입</div>
        <div class="subtitle">새로운 계정을 만들어보세요</div>
      </div>

      <div class="form-wrapper">
        <div class="form-group">
          <label>아이디</label>
          <div class="input-box">
            <input type="text" placeholder="example1234" v-model="signupId" />
          </div>
        </div>

        <div class="form-group">
          <label>비밀번호</label>
          <div class="input-box">
            <input type="password" placeholder="••••••••" v-model="signupPassword" />
          </div>
        </div>

        <div class="form-group">
          <label>이메일</label>
          <div class="input-box">
            <input type="email" placeholder="example@email.com" v-model="signupEmail" />
          </div>
        </div>

        <div class="form-group">
          <label>이름</label>
          <div class="input-box">
            <input type="text" placeholder="홍길동" v-model="signupName" />
          </div>
        </div>

        <!-- ✅ 성별 입력칸 추가 -->
        <div class="form-group">
          <label>성별</label>
          <div class="gender-box">
            <label><input type="radio" name="gender" value="남성" v-model="signupGender" /> 남성</label>
            <label><input type="radio" name="gender" value="여성" v-model="signupGender" /> 여성</label>
          </div>
        </div>

    <div class="form-group">
    <label>나이</label>
    <div class="input-box">
      <!-- ✅ 숫자 보장 -->
      <input type="number" placeholder="28" v-model.number="signupAge" min="1" />
    </div>
  </div>

  <!-- 전화번호 -->
  <div class="form-group">
    <label>전화번호</label>
    <div class="input-box">
      <input type="tel" placeholder="010-1234-5678" v-model="signupPhone" />
    </div>
  </div>

  <!-- 주소 -->
  <div class="form-group">
    <label>주소</label>
    <div class="input-box">
      <input type="text" placeholder="서울특별시 ○○구 ○○로 123" v-model="signupAddress" />
    </div>
  </div>

  <!-- 키 -->
  <div class="form-group">
    <label>키</label>
    <div class="input-box">
      <!-- ✅ 숫자 보장 (미입력 허용이면 빈값 가능) -->
      <input type="number" min="0" placeholder="175 (cm)" v-model.number="signupHeight" />
    </div>
  </div>

  <!-- 몸무게 -->
  <div class="form-group">
    <label>몸무게</label>
    <div class="input-box">
      <input type="number" min="0" placeholder="70 (kg)" v-model.number="signupWeight" />
    </div>
  </div>

  <button
    type="button"
    class="submit-btn"
    :disabled="loading"
    @click="registerMember">
    {{ loading ? '처리 중...' : '회원가입' }}
  </button>

  </div>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>메시지</h3>
        <p :style="{ color: check ? '#0a0' : '#c00' }">{{ message }}</p>
        <button @click="closeModal" class="close-btn">확인</button>
      </div>
    </div>
  </div>
</div>  
</div>

</template>

<style scoped>
/* 전역 여백 제거 (scoped여도 global로 적용) */
:global(html, body, #app) {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 🧱 화면 전체를 덮는 부모 박스 */
.page {
  width: 100%;
  height: 100vh;                /* 브라우저 높이 전체 */
  display: flex;                /* 자식(.container) 중앙 배치용 */
  justify-content: center;      /* 가로 가운데 */
  align-items: center;          /* 세로 가운데 */
  background: #f5f5f5;          /* (선택) 확인용 배경색 */
}

/* 🎯 실제 회원가입 컨테이너 */
.container {
  width: 1440px;
  height: 931px;
  background: white;
  display: flex;                /* 기존 가로 배치 유지 */
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
  border-radius: 8px;           /* (선택) 예쁘게 */
  box-shadow: 0 4px 20px rgba(0,0,0,0.1); /* (선택) 그림자 */
}

/* 왼쪽 검은 배경 패널 */
.left-panel {
  position: relative;
  width: 720px;
  height: 931px;
  background: black;
  overflow: hidden;
}

/* 배경 이미지 */
.background-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}

/* 검은 그라데이션 오버레이 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 720px;
  height: 931px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* 텍스트 그룹 */
.text-box {
  position: absolute;
  top: 95px;
  left: 49px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
}

/* 큰 제목 */
.title {
  font-size: 48px;
  font-family: Arial, sans-serif;
  letter-spacing: 1.8px;
  line-height: 48px;
}

/* 주황색 라인 */
.line {
  width: 128px;
  height: 2px;
  background: linear-gradient(180deg, #e17100 0%, #ffb900 100%);
  margin-top: 12px;
}

/* 부제목 */
.subtitle {
  font-size: 14px;
  opacity: 0.9;
  letter-spacing: 1.4px;
  margin-top: 12px;
}

/* 태그라인 */
.tagline {
  font-size: 18px;
  color: #fe9a00;
  font-style: italic;
  margin-top: 20px;
}

/* 오른쪽 회원가입 박스 */
.signup-wrapper {
  width: 720px;
  height: 931px;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  overflow-y: auto;
}

/* 제목 */
.title-wrapper {
  width: 402px;
  height: 68px;
  margin-top: 41px;
  text-align: center;
}

.main-title {
  font-size: 30px;
  color: #0A0A0A;
  line-height: 36px;
}

.subtitle {
  font-size: 16px;
  color: #6A7282;
  line-height: 24px;
  margin-top: 6px;
}

/* 폼 */
.form-wrapper {
  width: 402px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  padding-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.form-group label {
  font-size: 14px;
  color: #0A0A0A;
  text-align: left;
}

/* 입력 박스 스타일 */
.input-box {
  width: 100%;
  height: 36px;
  background: #F3F3F5;
  border-radius: 8px;
  border: 0.67px solid #D1D5DC;
  display: flex;
  align-items: center;
  padding-left: 12px;
  box-sizing: border-box;
}

.input-box .placeholder {
  font-size: 14px;
  color: #717182;
}

/* 이용약관 */
.terms {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4A5565;
  margin-top: 10px;
}

/* 버튼 */
.submit-btn {
  margin-top: 24px;
  width: 100%;
  background: black;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:hover {
  background: #222;
}

/* 로그인 링크 */
.login-link {
  text-align: center;
  margin-top: 12px;
  color: #6A7282;
  font-size: 14px;
}

.login-link .link {
  color: #E17100;
  cursor: pointer;
  margin-left: 4px;
}

.login-link .link:hover {
  text-decoration: underline;
}

.input-box input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #0A0A0A;
}

.input-box input::placeholder {
  color: #717182;
}

.gender-box {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #F3F3F5;
  border: 0.67px solid #D1D5DC;
  border-radius: 8px;
  height: 36px;
  padding-left: 12px;
  box-sizing: border-box;
}

.gender-box label {
  font-size: 14px;
  color: #0A0A0A;
  display: flex;
  align-items: center;
  gap: 6px;
}

.gender-box input[type="radio"] {
  accent-color: #E17100; /* ✅ 주황색 라디오 버튼 */
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: fadeIn 0.25s ease-in-out;
  width: 320px;
}

.modal h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #000;
}

.modal p {
  color: #555;
  font-size: 14px;
  margin-bottom: 20px;
}

.close-btn {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.close-btn:hover {
  background-color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>