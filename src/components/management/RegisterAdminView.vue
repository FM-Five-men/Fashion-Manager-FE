<script setup>
import { useRouter } from 'vue-router'
import { ref } from "vue";
import axios from "axios";

const router = useRouter()

const signupId = ref("");
const signupPassword = ref("");
const signupEmail = ref("");
const signupName = ref("");
const signupGender = ref("");
const signupAge = ref("");

const showModal = ref(false);

const check = ref(false);

const registerMember = async () => {
    try{
        var data = {
            memberId: signupId.value,
            memberPwd: signupPassword.value,
            memberEmail: signupEmail.value,
            memberName: signupName.value,
            memberAge: signupAge.value,
            memberGender: signupGender.value,
            memberMessageAllow: 1,
            ReportCount: 0,
            DailyReportCount: 0
        }

        const res = await axios.post("/api/member-service/member/insertadmin",data);
        console.log(res.status)
        if(res.status == 200){
            check.value = true;
            showModal.value = true;
        }else{
            showModal.value = true;
        }
        
        console.log(res);
    }catch (err){
        console.log("회원가입 에러: ",err);
        showModal.value = true;
    }
    
}


const login = () => {
    router.push('/adminlogin')
}

const closeModal = () => {
  showModal.value = false;
};

</script>

<template>
  <div class="container">
    <!-- 왼쪽 패널 -->
    <div class="left-panel">
      <img class="background-img" src="/images/banner.jpg" alt="배경 이미지" />
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
        <div class="main-title">관리자 회원가입</div>
        <div class="subtitle">새로운 관리자가 되어 보세요.</div>
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
            <input type="number" placeholder="28" v-model="signupAge" />
          </div>
        </div>


        <button class="submit-btn" @click="registerMember">회원가입</button>

        <p class="login-link">
          이미 계정이 있으신가요?
          <span class="link" @click="login">로그인</span>
        </p>
      </div>
    </div>

    <!-- ✅ 모달 창 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>메시지</h3>
        <p v-if="!check">회원가입에 실패했습니다.</p>
        <p v-else>회원가입에 성공하였습니다.</p>
        <button @click="closeModal" class="close-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 1440px;
  height: 931px;
  background: white;
  display: flex; /* 가로 배치 */
  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
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