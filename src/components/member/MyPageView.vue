<template>
  <HeaderView/>

  <!-- 본문 -->
  <div
    style="
      width: 686px;
      height: 1288px; /* 1048 → 1288 (블록+gap 증가 총 +240) */
      padding-top: 80px;
      padding-bottom: 13px;
      padding-left: 155px;
      margin: 103px 0 0 604px;
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
    "
  >
    <div style="width: 404.67px; height: 68px; position: relative;">
      <div style="width: 120px; height: 36px; left: 142.33px; top: -3px; position: absolute;">
        <div
          style="
            left: 50%;
            top: -3px;
            position: absolute;
            transform: translateX(-50%);
            text-align: center;
            color: #0A0A0A;
            font-size: 30px;
            font-family: Arial;
            font-weight: 400;
            line-height: 36px;
            width: 200px;
          "
        >
          계정정보
        </div>
      </div>

      <div
        style="
          width: 100%;
          height: 24px;
          left: 50%;
          top: 42.33px;
          position: absolute;
          transform: translateX(-50%);
        "
      >
        <div
          style="
            left: 11px;
            top: -1.67px;
            position: absolute;
            text-align: center;
            color: #6A7282;
            font-size: 16px;
            font-family: Arial;
            font-weight: 400;
            line-height: 24px;
            width: 400px;
          "
        >
          개인정보를 안전하게 관리하세요
        </div>
      </div>
    </div>

    <div style="width: 404px; height: 900px; position: relative;">
      <!-- 상단 프로필 카드 -->
      <div
        style="
          width: 396px;
          height: 116px;
          left: -0.50px;
          top: 0px;
          position: absolute;
        "
      >
        <div style="width: 672px; height: 64px; left: 120px; top: 34px; position: absolute;">
          <div
            style="
              width: 672px;
              height: 24px;
              left: 0px;
              top: 0px;
              position: absolute;
              display: inline-flex;
              align-items: center;
              gap: 12px;
            "
          >
            <div style="width: 48px; height: 24px; position: relative;">
              <div
                style="
                  left: 0px;
                  top: -1.67px;
                  position: absolute;
                  color: #0A0A0A;
                  font-size: 16px;
                  font-family: Arial;
                  font-weight: 400;
                  line-height: 24px;
                "
              >
                {{ user.memberName }}
              </div>
            </div>

            <div
              v-if="user.isInfluencer"
              style="
                width: 77.33px;
                height: 21.33px;
                padding: 2px 8px;
                background: rgba(255,255,255,0.20);
                border-radius: 8px;
                outline: 0.67px rgba(255,255,255,0.30) solid;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 4px;
              "
            >
              <div style="color: white; font-size: 12px; font-family: Arial; line-height: 16px;">
                인플루언서
              </div>
            </div>
          </div>

          <div style="width: 672px; height: 24px; left: 0px; top: 32px; position: absolute;">
            <div
              style="
                left: 0px;
                top: -1.67px;
                position: absolute;
                color: #BE8FF0;
                font-size: 16px;
                font-family: Arial;
                font-weight: 400;
                line-height: 24px;
              "
            >
              {{ user.memberEmail }} 
            </div>
          </div>

          <button
            type="button"
            @click="onOpenInfluencer"
            style="
              width: 110px;
              height: 32px;
              left: 162.50px;
              top: -8px;
              position: absolute;
              background: #D33AE0;
              border-radius: 8px;
              border: none;
              cursor: pointer;
            "
          >
            <div
              style="
                left: 5px;
                top: 6px;
                position: absolute;
                color: white;
                font-size: 12px;
                font-family: Arimo;
                line-height: 20px;
              "
            >
              인플루언서 페이지
            </div>
          </button>
        </div>

        <div style="width: 96px; height: 96px; left: 0px; top: 10px; position: absolute;">
          <div
            style="
              width: 96px;
              height: 96px;
              left: 0;
              top: 0;
              position: absolute;
              box-shadow: 0px 4px 6px -4px rgba(0,0,0,0.10);
              overflow: hidden;
              border-radius: 22369600px;
              outline: 4px white solid;
              outline-offset: -4px;
              display: inline-flex;
            "
          >
            <div
              style="
                flex: 1 1 0;
                height: 88px;
                background: #ECECF0;
                border-radius: 22369600px;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <img
                style="width: 88px; height: 132px;"
                alt="profile"
                src="../../public/influencerPage/influencerImg8.png"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 프로필 폼 (표시용) -->
      <div
        style="
          width: 404.67px;
          height: 747px; /* 507 → 747 (블록 3*64 + gap 3*16 = +240) */
          left: -0.50px;
          top: 160px;
          position: absolute;
          display: inline-flex;
          flex-direction: column;
          gap: 16px;
        "
      >
        <div style="align-self: stretch; height: 27px; position: relative;">
          <div
            style="
              left: 0;
              top: -1.67px;
              position: absolute;
              color: #0A0A0A;
              font-size: 18px;
              font-family: Arial;
              line-height: 27px;
            "
          >
            프로필
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; align-self: stretch;">
          <!-- 회원 ID -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; justify-content: space-between; align-items: center; height: 20px;">
              <div style="width: 41.82px; height: 20px; position: relative;">
                <div
                  style="
                    left: 0;
                    top: -1.33px;
                    position: absolute;
                    color: #0A0A0A;
                    font-size: 14px;
                    font-family: Arial;
                    line-height: 20px;
                    width: 200px;
                  "
                >
                  회원 ID
                </div>
              </div>
              <div style="width: 144.93px; height: 20px; position: relative;"></div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 78.96px; height: 18.67px; display: flex;">
                  <div style="width: 141px; color: #717182; font-size: 14px; font-family: Arial;">
                    {{ user.memberId }} 
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 비밀번호 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 56px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  비밀번호
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 197.16px; height: 18.67px; display: flex;">
                  <div style="color: #717182; font-size: 14px; font-family: Arial;">
                    {{ user.memberPwd }} 
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 이름 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 28px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  이름
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 39.90px; height: 18.67px; display: flex; width: 200px;">
                  <div style="color: #717182; font-size: 14px; font-family: Arial;">
                    {{ user.memberName }} 
                  </div>
                </div>
              </div>
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- ▼ 닉네임 제거 + 아래 4개 추가 ▼ -->

          <!-- 성별 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 42px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  성별
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 72.93px; height: 18.67px; display: flex;">
                  <div style="color: #717182; font-size: 14px; font-family: Arial;">
                    {{ user.memberGender }} 
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 나이 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 42px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  나이
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="color: #717182; font-size: 14px; font-family: Arial;">
                  {{ user.memberAge }} 
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 키 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 42px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  키
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="color: #717182; font-size: 14px; font-family: Arial;">
                  {{ user.memberHeight }} 
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 몸무게 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 56px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  몸무게
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="color: #717182; font-size: 14px; font-family: Arial;">
                  {{ user.memberWeight }} 
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 이메일 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 42px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  이메일
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 107.84px; height: 18.67px; display: flex;">
                  <div style="width: 147px; color: #717182; font-size: 14px; font-family: Arial;">
                    {{ user.memberEmail }} 
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>

          <!-- 전화번호 -->
          <div style="display: flex; flex-direction: column; gap: 8px; align-self: stretch; height: 64px;">
            <div style="display: inline-flex; align-items: center; height: 20px;">
              <div style="width: 56px; height: 20px; position: relative;">
                <div style="left: 0; top: -1.33px; position: absolute; color: #0A0A0A; font-size: 14px; font-family: Arial;">
                  전화번호
                </div>
              </div>
            </div>

            <div
              style="
                align-self: stretch;
                height: 36px;
                position: relative;
                background: #F3F3F5;
                border-radius: 8px;
              "
            >
              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  padding-left: 12px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  overflow: hidden;
                  border-radius: 8px;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <div style="width: 87.49px; height: 18.67px; display: flex; width:400px;">
                  <div style="color: #717182; font-size: 14px; font-family: Arial; ">
                    {{ user.memberPhone }} 
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 404.67px;
                  height: 36px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  border-radius: 8px;
                  border: 0.67px #D1D5DC solid;
                "
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 구분선: top +240 -->
      <div
        style="
          width: 404.67px;
          height: 51.67px;
          padding-top: 24.67px;
          left: 0px;
          top: 846.67px; /* 606.67 → 846.67 */
          position: absolute;
          border-top: 0.67px #F3F4F6 solid;
        "
      ></div>

      <!-- 주소: top +240 -->
      <div
        style="
          width: 404.67px;
          height: 64px;
          left: 1.50px;
          top: 927px; /* 687 → 927 */
          position: absolute;
          display: inline-flex;
          flex-direction: column;
          gap: 8px;
        "
      >
        <div
          style="
            align-self: stretch;
            height: 20px;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div style="width: 56px; height: 20px; position: relative;">
            <div
              style="
                left: 0;
                top: -1.33px;
                position: absolute;
                color: #0A0A0A;
                font-size: 14px;
                font-family: Arial;
              "
            >
              주소
            </div>
          </div>
        </div>
        <div
          style="
            align-self: stretch;
            height: 36px;
            position: relative;
            background: #F3F3F5;
            border-radius: 8px;
          "
        >
          <div
            style="
              width: 404.67px;
              height: 36px;
              padding-left: 12px;
              position: absolute;
              left: 0;
              top: 0;
              overflow: hidden;
              border-radius: 8px;
              display: inline-flex;
              align-items: center;
            "
          >
            <div style="width: 87.49px; height: 18.67px; display: flex; width: 300px;">
              <div style="color: #717182; font-size: 14px; font-family: Arial;">
                {{ user.memberAddress }} 
              </div>
            </div>
          </div>
          <div
            style="
              width: 404.67px;
              height: 36px;
              position: absolute;
              left: 0;
              top: 0;
              border-radius: 8px;
              border: 0.67px #D1D5DC solid;
            "
          ></div>
        </div>
      </div>

      <!-- 수정하기 버튼: top +240 -->
      <button
        type="button"
        @click="onEdit"
        style="
          width: 404.67px;
          height: 44px;
          left: 0.50px;
          top: 1020px; /* 780 → 1020 */
          position: absolute;
          background: black;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        "
      >
        <div
          style="
            width: 404.67px;
            height: 20px;
            left: 0.50px;
            top: 12px;
            position: absolute;
          "
        >
          <div
            style="
              left: 168px;
              top: -0.33px;
              position: absolute;
              color: white;
              font-size: 14px;
              font-family: Arial;
              line-height: 20px;
            "
          >
            수정하기
          </div>
        </div>
      </button>

      <!-- 푸터 링크: top +240 -->
      <div
        style="
          width: 404.67px;
          height: 45.67px;
          padding-top: 24.67px;
          left: 0.50px;
          top: 1064px; /* 824 → 1064 */
          position: absolute;
          border-top: 0.67px #F3F4F6 solid;
          display: inline-flex;
          flex-direction: column;
        "
      >
        <div style="align-self: stretch; height: 21px; position: relative;">
          <div
            style="
              width: 42px;
              height: 20px;
              left: 95.48px;
              top: 0.50px;
              position: absolute;
              color: #6A7282;
              font-size: 14px;
              font-family: Arial;
            "
          >
            내정보
          </div>
          <div style="width: 5.85px; height: 21px; left: 149.48px; top: 0px; position: absolute; color: #6A7282; font-size: 14px;">
            •
          </div>
          <div
            style="
              width: 56px;
              height: 20px;
              left: 167.33px;
              top: 0.50px;
              position: absolute;
              color: #6A7282;
              font-size: 14px;
              font-family: Arial;
            "
          >
            보안센터
          </div>
          <div style="width: 5.85px; height: 21px; left: 235.33px; top: 0px; position: absolute; color: #6A7282; font-size: 14px;">
            •
          </div>
          <div
            style="
              width: 56px;
              height: 20px;
              left: 253.19px;
              top: 0.50px;
              position: absolute;
              color: #6A7282;
              font-size: 14px;
              font-family: Arial;
            "
          >
            고객센터
          </div>
        </div>
      </div>
    </div>
  </div>

  <FooterView/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import FooterView from './FooterView.vue';
import HeaderView from './HeaderView.vue';

const user = ref({});

onMounted(async () => {
  try {
    const res = await axios.get('/api/member-service/member/membernum/13');
    user.value = res.data;
  } catch (error) {
    console.error('회원 정보 불러오기 실패:', error);
  }
});

function onEdit() {
  alert('프로필 수정 화면으로 이동합니다.');
}

function onOpenInfluencer() {
  alert('인플루언서 페이지로 이동합니다.');
}
</script>

<style scoped>
/* 인라인 스타일 유지 — 별도 스타일 없음 */
</style>
