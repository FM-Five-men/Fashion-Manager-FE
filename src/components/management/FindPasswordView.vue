<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref("");
const id = ref("");
const incorrect = ref(false);
const verifyCode = ref("");

const showModal = ref(false);

let verifyNum;

const verifyNumber = async () => {
    try{
        const data = new FormData();
        data.append("mail", email.value);
        data.append("id", id.value);

        axios.post('/api/member-service/validation/sendmailpassword',data).then(
            (res) => {
                console.log(res);
                verifyNum = res.data;
                showModal.value = true;
            }
        )
        
        
    }catch (err) {
        console.log("인증번호 전송 에러: ",err);
    }
    
}

const closeModal = () => {
  showModal.value = false;
};

const findId = () => {
    router.push('/findid')
}

const registerMember = () => {
    router.push('/registermember')
}

const findPassword = () => {
    if(verifyNum == verifyCode.value){
        router.push(`/changepassword?id=${encodeURIComponent(id.value)}`);
    }
}
</script>

<template>
  <div class="screen">

    <div class="container-5">
      <div class="paragraph">
        <div class="text-wrapper-6">비밀번호 찾기</div>
      </div>

      <div class="paragraph-2">
        <div class="text-wrapper-7">가입시 등록한 정보를 입력해주세요</div>
      </div>
    </div>

    <div class="container-6">
      <div class="container-7">
        <div class="paragraph-3">
          <div class="text-wrapper-8">아이디</div>
        </div>

        <div class="container-8">
          <div class="container-9">

            <div class="div-wrapper-2">
              <input class="text-wrapper-9" type="text" v-model="id" />
            </div>
          </div>

          <div class="container-10" />
        </div>
      </div>

      <div class="container-7">
        <div class="paragraph-3">
          <div class="text-wrapper-8">이메일</div>
        </div>

        <div class="container-8">
          <div class="container-9">

            <div class="div-wrapper-2">
              <input class="text-wrapper-9" type="text" v-model="email" />
            </div>
          </div>

          <div class="container-10" />
        </div>
      </div>

      <!-- 인증번호 입력 + 버튼 -->
      <div class="container-7">
        <div class="verify-container">
            <input
                class="verify-input"
                type="text"
                v-model="verifyCode"
                placeholder="인증번호"
            />
            <button class="verify-btn" @click="verifyNumber">인증번호 전송</button>
        </div>
      </div>

      <button class="paragraph-wrapper" @click="findPassword">
        <div class="div-2">
          <div class="text-wrapper-10">비밀번호 찾기</div>
        </div>
      </button>
    </div>

    <div class="container-11">
      <div class="container-12">
        <div class="container-13">
          <div class="paragraph-4">
            <div class="text-wrapper-11" @click="findId">아이디 찾기</div>
          </div>
        </div>

        <div class="paragraph-5">
          <div class="text-wrapper-12">•</div>
        </div>

        <div class="paragraph-6">
          <div class="text-wrapper-13" @click="registerMember">회원가입</div>
        </div>

        <div class="paragraph-7">
          <div class="text-wrapper-12">•</div>
        </div>

        <div class="container-14">
          <div class="paragraph-8">
            <div class="text-wrapper-13">고객센터</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ 모달 창 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>메시지</h3>
        <p v-if="verifyNum==0">존재하지 않는 회원의 이메일입니다.</p>
        <p v-else>인증번호가 발송되었습니다.</p>
        <button @click="closeModal" class="close-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 931px;
  min-width: 1666px;
  width: 100%;
}

.screen .header {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 65px;
  position: relative;
  width: 1666px;
}

.screen .container-wrapper {
  align-items: flex-start;
  align-self: stretch;
  background-color: #f2f2f2cc;
  border-bottom-style: solid;
  border-bottom-width: 0.67px;
  border-color: #0000001a;
  display: flex;
  flex-direction: column;
  height: 65px;
  padding: 0px 22px;
  position: relative;
  width: 100%;
}

.screen .container {
  align-items: center;
  align-self: stretch;
  display: flex;
  height: 64px;
  justify-content: space-between;
  padding: 0px 16px;
  position: relative;
  width: 100%;
}

.screen .div {
  align-items: center;
  display: flex;
  gap: 32px;
  height: 32px;
  position: relative;
  width: 343px;
}

.screen .link {
  align-items: center;
  display: flex;
  gap: 8px;
  height: 32px;
  position: relative;
  width: 189px;
}

.screen .element {
  aspect-ratio: 2.39;
  height: 52px;
  margin-bottom: -10.00px;
  margin-top: -10.00px;
  position: relative;
  width: 125px;
}

.screen .navigation {
  flex: 1;
  flex-grow: 1;
  height: 20px;
  position: relative;
}

.screen .group {
  height: 20px;
  left: -73px;
  position: relative;
  width: 238px;
}

.screen .text-wrapper {
  color: #c6a33b;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.screen .text-wrapper-2 {
  color: #0a0a0a;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 52px;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.screen .text-wrapper-3 {
  color: #0a0a0a;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 104px;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.screen .text-wrapper-4 {
  color: #0a0a0a;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 165px;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.screen .container-2 {
  height: 36px;
  position: relative;
  width: 448px;
}

.screen .container-3 {
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 256px;
}

.screen .button {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 20px;
  left: 240px;
  position: absolute;
  top: 8px;
  width: 20px;
}

.screen .div-2 {
  align-self: stretch;
  height: 20px;
  position: relative;
  width: 100%;
}

.screen .vector {
  height: 18.08%;
  left: 65.25%;
  position: absolute;
  top: 65.25%;
  width: 18.08%;
}

.screen .img {
  height: 66.67%;
  left: 8.33%;
  position: absolute;
  top: 8.33%;
  width: 66.67%;
}

.screen .group-2 {
  height: 28px;
  left: 277px;
  position: absolute;
  top: 4px;
  width: 30px;
}

.screen .image {
  aspect-ratio: 1;
  height: 28px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 28px;
}

.screen .header-2 {
  background-color: #e17100;
  border-radius: 22369600px;
  height: 4px;
  left: 26px;
  position: absolute;
  top: 1px;
  width: 4px;
}

.screen .container-4 {
  height: 32px;
  left: 340px;
  position: absolute;
  top: 3px;
  width: 124px;
}

.screen .button-wrapper {
  all: unset;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  gap: 6px;
  height: 32px;
  justify-content: center;
  left: calc(50.00% - 11px);
  padding: 0px 12px;
  position: absolute;
  top: calc(50.00% - 16px);
  width: 80px;
}

.screen .div-wrapper {
  all: unset;
  align-items: center;
  background-color: #b1b1b1;
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  margin-left: -3.00px;
  margin-right: -3.00px;
  padding: 1px 14px;
  position: relative;
}

.screen .text-wrapper-5 {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Arimo-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  width: fit-content;
}

.screen .primitive-span {
  align-items: flex-start;
  border-radius: 22369600px;
  display: flex;
  height: 32px;
  left: 4px;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 32px;
}

.screen .ellipse {
  aspect-ratio: 1;
  height: 32px;
  position: relative;
  width: 32px;
}

.screen .container-5 {
  display: flex;
  flex-direction: column;
  gap: 9.3px;
  height: 68px;
  margin-left: 25%;
  margin-top: 186px;
  width: 653px;
}

.screen .paragraph {
  display: flex;
  margin-left: 128.8px;
  margin-top: -3px;
  width: 190.55px;
}

.screen .text-wrapper-6 {
  color: #0a0a0a;
  font-family: "Arial-Regular", Helvetica;
  font-size: 30px;
  font-weight: 400;
  height: 36px;
  letter-spacing: 0;
  line-height: 36px;
  margin-left: 8px;
  margin-top: -3px;
  text-align: center;
  white-space: nowrap;
  width: 174px;
}

.screen .paragraph-2 {
  display: flex;
  margin-left: 95.8px;
  width: 256.88px;
}

.screen .text-wrapper-7 {
  color: #6a7282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 24px;
  letter-spacing: 0;
  line-height: 24px;
  margin-left: 11px;
  margin-top: -1.7px;
  text-align: center;
  white-space: nowrap;
  width: 235px;
}

.screen .container-6 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 245px;
  margin-left: 25%;
  margin-top: 10px;
  padding: 0px 205px 0px 0px;
  position: relative;
  width: 653px;
}

.screen .container-7 {
  align-self: stretch;
  height: 50px;
  position: relative;
  width: 100%;
}

.screen .paragraph-3 {
  display: flex;
  height: 20px;
  left: 0;
  position: absolute;
  top: 0;
  width: 42px;
}

.screen .text-wrapper-8 {
  color: #0a0a0a;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 39px;
}

.screen .container-8 {
  background-color: #f3f3f5;
  border-radius: 8px;
  height: 36px;
  left: 0;
  position: absolute;
  top: 28px;
  width: 448px;
}

.screen .container-9 {
  border-radius: 8px;
  display: flex;
  gap: 10px;
  height: 36px;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 448px;
}

.screen .icon-wrapper {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 16px;
  margin-left: 12px;
  margin-top: 10px;
  position: relative;
  width: 16px;
}

.screen .icon {
  align-self: stretch;
  height: 16px;
  position: relative;
  width: 100%;
}

.screen .group-3 {
  height: 75.00%;
  left: 20.83%;
  position: relative;
  top: 12.50%;
  width: 58.33%;
}

.screen .vector-2 {
  height: 33.33%;
  left: -7.14%;
  position: absolute;
  top: 61.11%;
  width: 100%;
}

.screen .vector-3 {
  height: 44.44%;
  left: 14.28%;
  position: absolute;
  top: -5.56%;
  width: 57.14%;
}

.screen .div-wrapper-2 {
  align-items: center;
  display: flex;
  height: 18.67px;
  margin-top: 8.7px;
  position: relative;
  width: 398px;
}

.screen .text-wrapper-9 {
  color: #71708180;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: normal;
  position: relative;
  white-space: nowrap;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  z-index: 2;
}

.screen .container-10 {
  border: 0.67px solid;
  border-color: #d1d5dc;
  border-radius: 8px;
  height: 36px;
  left: 0;
  position: absolute;
  top: 0;
  width: 448px;
}

.screen .group-4 {
  height: 66.67%;
  left: 8.33%;
  position: relative;
  top: 16.67%;
  width: 83.33%;
}

.screen .vector-4 {
  height: 37.48%;
  left: -5.00%;
  position: absolute;
  top: 12.50%;
  width: 100%;
}

.screen .vector-5 {
  height: 100%;
  left: -5.00%;
  position: absolute;
  top: -6.25%;
  width: 100%;
}

.screen .paragraph-wrapper {
  all: unset;
  align-items: flex-start;
  align-self: stretch;
  background-color: #000000;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 44px;
  padding: 12px 179.54px 0px 179.54px;
  position: relative;
  width: 69%;
  cursor: pointer;
}

.screen .text-wrapper-10 {
  color: #ffffffff;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: -1px;
  white-space: nowrap;
}

.screen .container-11 {
  border-color: #f2f4f6;
  border-top-style: solid;
  border-top-width: 0.67px;
  display: flex;
  height: 57px;
  margin-left: 25%;
  margin-top: 10px;
  width: 27%;
}

.screen .container-12 {
  display: flex;
  margin-top: 16px;
  width: 786px;
}

.screen .container-13 {
  display: flex;
  margin-left: 58px;
  margin-top: -0.3px;
  width: 96px;
}

.screen .paragraph-4 {
  display: flex;
  margin-top: -1.3px;
  width: 74.93px;
}

.screen .text-wrapper-11 {
  color: #6a7282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 69px;
  cursor: pointer;
}

.screen .paragraph-5 {
  display: flex;
  margin-left: 19px;
  margin-top: -1.3px;
  width: 5.85px;
}

.screen .text-wrapper-12 {
  color: #6a7282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 5px;
}

.screen .paragraph-6 {
  display: flex;
  margin-left: 14.1px;
  margin-top: -1.6px;
  width: 56px;
}

.screen .text-wrapper-13 {
  color: #6a7282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 52px;
  cursor: pointer;
}

.screen .paragraph-7 {
  display: flex;
  margin-left: 16px;
  margin-top: -1.3px;
  width: 5.85px;
}

.screen .container-14 {
  display: flex;
  margin-left: 21.1px;
  margin-top: -0.3px;
  width: 77px;
}

.screen .paragraph-8 {
  display: flex;
  margin-top: -1.3px;
  width: 56px;
}

.verify-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  width: 448px;
}

.verify-input {
  flex: 1;
  background-color: #f3f3f5;
  border: 0.67px solid #d1d5dc;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #717081;
  outline: none;
}

.verify-btn {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  height: 36px;
  white-space: nowrap;
}

.verify-btn:hover {
  background-color: #333;
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