<template>
  <div class="screen">
    <div class="login-form">
      <div class="container">
        <div class="div" />

        <div class="container-2" />

        <div class="container-3">
          <div class="container-4">
            

            <div class="container-5">
              <div class="div-wrapper">
                <div class="text-wrapper">FASHION</div>
              </div>

              <div class="div-wrapper">
                <div class="text-wrapper-2">MANAGER</div>
              </div>

              <div class="container-6" />

              <div class="paragraph">
                <div class="text-wrapper-3">ADMIN CONTROL PANEL</div>
              </div>

              <div class="div-wrapper">
                <div class="text-wrapper-4">
                  Secure Access for Administrators
                </div>
              </div>
            </div>
          </div>

          <div class="container-7">
            <div class="div-2">
              <div class="vector-wrapper">
                <img class="img" alt="Vector" :src="image" />
              </div>

              <div class="text">
                <div class="text-wrapper-5">
                  256-bit SSL Encrypted Connection
                </div>
              </div>
            </div>

            <div class="paragraph-2">
              <p class="p">
                © 2025 Fashion Manager. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="container-8">
        <div class="container-9">
          <div class="heading">
            <div class="text-wrapper-6">관리자 로그인</div>
          </div>

          <div class="paragraph-3">
            <div class="text-wrapper-7">
              관리자 권한으로 시스템에 접근합니다
            </div>
          </div>
        </div>

        

        <div class="form">
          <div class="container-12">
            <div class="div-2">
              <div class="text-wrapper-10">관리자 아이디</div>
            </div>

            <div class="container-13">
              <input
                class="input"
                type="text"
              />

              
            </div>
          </div>

          <div class="container-12">
            <div class="div-2">
              <div class="text-wrapper-10">관리자 비밀번호</div>
            </div>

            <div class="container-13">
              <input class="input-2"  type="text" />
            </div>
          </div>

          <div class="container-14">

          </div>

          <button class="button-3">

            <div class="text-wrapper-13">관리자 로그인</div>
          </button>
        </div>

        <div class="container-16">
          <div class="div-3">
            <button class="button-4">
              <div class="text-wrapper-14">아이디 찾기</div>
            </button>

            <div class="text-2">
              <div class="text-wrapper-15">•</div>
            </div>

            <button class="button-5">
              <div class="text-wrapper-16">회원 가입</div>
            </button>

            <div class="text-3">
              <div class="text-wrapper-15">•</div>
            </div>

            <button class="button-6">
              <div class="text-wrapper-17">비밀번호 찾기</div>
            </button>
          </div>
        </div>

        <div class="paragraph-5">
          <p class="text-wrapper-18">
            System Version 2.4.1 • Last Updated: Oct 17, 2025
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.screen {
  background-color: #ffffff;
  display: flex;
  min-height: 931px;
  min-width: 1384px;
  width: 100%;
}

.screen .login-form {
  background: linear-gradient(
    117deg,
    rgba(238, 242, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(250, 245, 255, 1) 100%
  );
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(1, minmax(0, 1fr));
  height: 931.33px;
  position: relative;
  width: 1384px;
}

.screen .container {
  background: linear-gradient(
    117deg,
    rgba(15, 23, 43, 1) 0%,
    rgba(29, 41, 61, 1) 50%,
    rgba(15, 23, 43, 1) 100%
  );
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  height: 931.33px;
  position: relative;
  width: 100%;
}

.screen .div {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(0, 0, 0, 0) 0%
  );
  height: 931px;
  left: 0;
  opacity: 0.1;
  position: absolute;
  top: 0;
  width: 692px;
}

.screen .container-2 {
  background: linear-gradient(
    117deg,
    rgba(225, 113, 0, 0.2) 0%,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 931px;
  left: 0;
  position: absolute;
  top: 0;
  width: 692px;
}

.screen .container-3 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 931px;
  justify-content: space-between;
  left: 0;
  padding: 48px 0px 0px 48px;
  position: absolute;
  top: 0;
  width: 692px;
}

.screen .container-4 {
  height: 295px;
  position: relative;
  width: 596px;
}

.screen .icon-wrapper {
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(225, 113, 0, 1) 0%,
    rgba(255, 185, 0, 1) 100%
  );
  border-radius: 14px;
  display: flex;
  height: 64px;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 64px;
}

.screen .icon {
  height: 40px;
  position: relative;
  width: 40px;
}

.screen .vector {
  height: 83.35%;
  left: 12.50%;
  position: absolute;
  top: 4.17%;
  width: 66.67%;
}

.screen .container-5 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 207px;
  left: 0;
  position: absolute;
  top: 88px;
  width: 596px;
}

.screen .div-wrapper {
  display: flex;
  width: 596px;
}

.screen .text-wrapper {
  color: #ffffff;
  font-family: "Arial-Regular", Helvetica;
  font-size: 48px;
  font-weight: 400;
  height: 48px;
  letter-spacing: -1.20px;
  line-height: 48px;
  margin-top: -5px;
  white-space: nowrap;
  width: 204px;
}

.screen .text-wrapper-2 {
  color: #ffffff;
  font-family: "Arial-Regular", Helvetica;
  font-size: 48px;
  font-weight: 400;
  height: 48px;
  letter-spacing: -1.20px;
  line-height: 48px;
  margin-top: -5px;
  white-space: nowrap;
  width: 236px;
}

.screen .container-6 {
  background: linear-gradient(
    180deg,
    rgba(225, 113, 0, 1) 0%,
    rgba(255, 185, 0, 1) 100%
  );
  border-radius: 22369600px;
  height: 3px;
  width: 96px;
}

.screen .paragraph {
  display: flex;
  height: 36px;
  width: 596px;
}

.screen .text-wrapper-3 {
  color: #fffefecc;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0.35px;
  line-height: 20px;
  margin-top: 14.7px;
  white-space: nowrap;
  width: 173px;
}

.screen .text-wrapper-4 {
  color: #fe9a00;
  font-family: "Arial-Italic", Helvetica;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  height: 24px;
  letter-spacing: 0;
  line-height: 24px;
  margin-top: -1.7px;
  white-space: nowrap;
  width: 236px;
}

.screen .container-7 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 44px;
  position: relative;
  width: 596px;
}

.screen .div-2 {
  align-items: center;
  align-self: stretch;
  display: flex;
  gap: 8px;
  height: 20px;
  position: relative;
  width: 100%;
}

.screen .vector-wrapper {
  height: 16px;
  position: relative;
  width: 16px;
}

.screen .img {
  height: 83.35%;
  left: 12.50%;
  position: absolute;
  top: 4.16%;
  width: 66.67%;
}

.screen .text {
  height: 20px;
  position: relative;
  width: 218.02px;
}

.screen .text-wrapper-5 {
  color: #fffefe99;
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

.screen .paragraph-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  height: 16px;
  position: relative;
  width: 100%;
}

.screen .p {
  color: #fffefe66;
  flex: 1;
  font-family: "Arial-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  margin-top: -1.00px;
  position: relative;
}

.screen .container-8 {
  background-color: #ffffff;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  height: 931.33px;
  position: relative;
  width: 100%;
}

.screen .container-9 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 68px;
  left: 122px;
  position: absolute;
  top: 151px;
  width: 448px;
}

.screen .heading {
  align-self: stretch;
  height: 36px;
  position: relative;
  width: 100%;
}

.screen .text-wrapper-6 {
  color: #0a0a0a;
  font-family: "Arial-Regular", Helvetica;
  font-size: 30px;
  font-weight: 400;
  left: 137px;
  letter-spacing: 0;
  line-height: 36px;
  position: absolute;
  text-align: center;
  top: -3px;
  white-space: nowrap;
}

.screen .paragraph-3 {
  align-self: stretch;
  height: 24px;
  position: relative;
  width: 100%;
}

.screen .text-wrapper-7 {
  color: #6a7282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  left: 100px;
  letter-spacing: 0;
  line-height: 24px;
  position: absolute;
  text-align: center;
  top: -2px;
  white-space: nowrap;
}

.screen .container-wrapper {
  align-items: flex-start;
  background-color: #fff7ed;
  border: 0.67px solid;
  border-color: #ffd6a7;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 89px;
  left: 122px;
  padding: 16.67px 16.67px 0.67px 16.67px;
  position: absolute;
  top: 251px;
  width: 448px;
}

.screen .container-10 {
  align-self: stretch;
  height: 56px;
  position: relative;
  width: 100%;
}

.screen .img-wrapper {
  height: 20px;
  left: 0;
  position: absolute;
  top: 2px;
  width: 20px;
}

.screen .container-11 {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 56px;
  left: 32px;
  position: absolute;
  top: 0;
  width: 383px;
}

.screen .div-3 {
  align-self: stretch;
  height: 20px;
  position: relative;
  width: 100%;
}

.screen .text-wrapper-8 {
  color: #9f2d00;
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

.screen .paragraph-4 {
  align-self: stretch;
  height: 32px;
  position: relative;
  width: 100%;
}

.screen .text-wrapper-9 {
  color: #c93400;
  font-family: "Arial-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  left: 0;
  letter-spacing: 0;
  line-height: 16px;
  position: absolute;
  top: -1px;
  width: 377px;
}

.screen .form {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 284px;
  left: 122px;
  position: absolute;
  top: 372px;
  width: 448px;
}

.screen .container-12 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 72px;
  position: relative;
  width: 100%;
}

.screen .text-wrapper-10 {
  color: #0a0a0a;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.screen .container-13 {
  align-self: stretch;
  height: 44px;
  position: relative;
  width: 100%;
}

.screen .input {
  background-color: #f3f3f5;
  border: 0.67px solid;
  border-color: #d1d5dc;
  border-radius: 8px;
  color: #717182;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 44px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  overflow: hidden;
  padding: 4px 12px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 448px;
}

.screen .icon-2 {
  height: 16px;
  left: 12px;
  position: absolute;
  top: 14px;
  width: 16px;
}

.screen .vector-2 {
  height: 25.00%;
  left: 16.67%;
  position: absolute;
  top: 58.33%;
  width: 58.33%;
}

.screen .vector-3 {
  height: 33.33%;
  left: 29.17%;
  position: absolute;
  top: 8.33%;
  width: 33.33%;
}

.screen .input-2 {
  background-color: #f3f3f5;
  border: 0.67px solid;
  border-color: #d1d5dc;
  border-radius: 8px;
  color: #717182;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 44px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  overflow: hidden;
  padding: 4px 12px;
  position: absolute;
  top: 0;
  white-space: nowrap;
  width: 448px;
}

.screen .vector-4 {
  height: 45.83%;
  left: 8.33%;
  position: absolute;
  top: 41.67%;
  width: 75.00%;
}

.screen .vector-5 {
  height: 37.50%;
  left: 25.00%;
  position: absolute;
  top: 4.17%;
  width: 41.67%;
}

.screen .button {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 16px;
  left: 420px;
  position: absolute;
  top: 14px;
  width: 16px;
}

.screen .icon-3 {
  align-self: stretch;
  height: 16px;
  position: relative;
  width: 100%;
}

.screen .vector-6 {
  height: 58.33%;
  left: 4.16%;
  position: absolute;
  top: 16.67%;
  width: 83.34%;
}

.screen .vector-7 {
  height: 25.00%;
  left: 33.33%;
  position: absolute;
  top: 33.33%;
  width: 25.00%;
}

.screen .container-14 {
  align-items: center;
  align-self: stretch;
  display: flex;
  height: 20px;
  justify-content: flex-end;
  padding: 0px -8.39e-05px 0px 0px;
  position: relative;
  width: 100%;
}

.screen .container-15 {
  align-items: center;
  display: flex;
  gap: 8px;
  height: 20px;
  position: relative;
  width: 131.84px;
}

.screen .primitive-button {
  background-color: #f3f3f5;
  border: 0.67px solid;
  border-color: #d1d5dc;
  border-radius: 4px;
  box-shadow: 0px 1px 2px #0000000d;
  height: 16px;
  position: relative;
  width: 16px;
}

.screen .primitive-label {
  align-items: center;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 8px;
  height: 20px;
  position: relative;
}

.screen .text-wrapper-11 {
  color: #4a5565;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.screen .button-2 {
  all: unset;
  box-sizing: border-box;
  height: 20px;
  position: relative;
  width: 88.93px;
}

.screen .text-wrapper-12 {
  color: #e17100;
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

.screen .button-3 {
  all: unset;
  align-self: stretch;
  background: linear-gradient(
    180deg,
    rgba(225, 113, 0, 1) 0%,
    rgba(209, 102, 0, 1) 100%
  );
  border-radius: 8px;
  box-shadow: 0px 4px 6px -4px #ffd6a7, 0px 10px 15px -3px #ffd6a7;
  box-sizing: border-box;
  height: 48px;
  position: relative;
  width: 100%;
}

.screen .icon-4 {
  height: 16px;
  left: 164px;
  position: absolute;
  top: 16px;
  width: 16px;
}

.screen .text-wrapper-13 {
  color: #ffffff;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  left: 196px;
  letter-spacing: 0;
  line-height: 20px;
  position: absolute;
  top: 13px;
  white-space: nowrap;
}

.screen .container-16 {
  align-items: flex-start;
  border-color: #f2f4f6;
  border-top-style: solid;
  border-top-width: 0.67px;
  display: flex;
  flex-direction: column;
  height: 45px;
  left: 122px;
  padding: 24.67px 0px 0px;
  position: absolute;
  top: 688px;
  width: 448px;
}

.screen .button-4 {
  all: unset;
  box-sizing: border-box;
  display: flex;
  height: 20px;
  left: 74px;
  position: absolute;
  top: 0;
  width: 75px;
}

.screen .text-wrapper-14 {
  color: #697282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 69px;
}

.screen .text-2 {
  display: flex;
  height: 20px;
  left: 165px;
  position: absolute;
  top: 0;
  width: 6px;
}

.screen .text-wrapper-15 {
  color: #697282;
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

.screen .button-5 {
  all: unset;
  box-sizing: border-box;
  display: flex;
  height: 20px;
  left: 187px;
  position: absolute;
  top: 0;
  width: 61px;
}

.screen .text-wrapper-16 {
  color: #697282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 56px;
}

.screen .text-3 {
  display: flex;
  height: 20px;
  left: 263px;
  position: absolute;
  top: 0;
  width: 6px;
}

.screen .button-6 {
  all: unset;
  box-sizing: border-box;
  display: flex;
  height: 20px;
  left: 285px;
  position: absolute;
  top: 0;
  width: 89px;
}

.screen .text-wrapper-17 {
  color: #697282;
  font-family: "Arial-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
  letter-spacing: 0;
  line-height: 20px;
  margin-top: -1.3px;
  white-space: nowrap;
  width: 82px;
}

.screen .paragraph-5 {
  align-items: flex-start;
  display: flex;
  height: 16px;
  left: 122px;
  position: absolute;
  top: 765px;
  width: 448px;
}

.screen .text-wrapper-18 {
  color: #99a1ae;
  flex: 1;
  font-family: "Arial-Regular", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 16px;
  margin-top: -1.00px;
  position: relative;
  text-align: center;
}
</style>