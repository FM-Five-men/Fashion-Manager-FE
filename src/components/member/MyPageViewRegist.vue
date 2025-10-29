<template>
  <!-- 페이지 전체를 세로 플렉스로 감싸서 Footer를 하단에 고정 -->
  <div style="min-height:100vh;display:flex;flex-direction:column;">
    <HeaderView/>

    <!-- 본문 영역은 남은 공간을 차지 -->
    <div style="flex:1;display:flex;flex-direction:column;">
      <!-- 본문 -->
      <div
        style="
          width: 686px;
          height: auto; /* 고정값 → 자동 높이로 */
          padding-top: 80px;
          padding-bottom: 13px;
          padding-left: 270px;
          margin: 50px auto 0;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        "
      >
        <div style="width:404.67px;height:68px;position:relative;">
          <div style="width:120px;height:36px;left:142.33px;top:-3px;position:absolute;">
            <div
              style="
                left:50%;top:-3px;position:absolute;transform:translateX(-50%);
                text-align:center;color:#0A0A0A;font-size:30px;font-family:Arial;font-weight:400;line-height:36px;width:200px;
              "
            >
              계정정보
            </div>
          </div>

          <div
            style="
              width:100%;height:24px;left:50%;top:42.33px;position:absolute;transform:translateX(-50%);
            "
          >
            <div
              style="
                left:11px;top:-1.67px;position:absolute;text-align:center;color:#6A7282;
                font-size:16px;font-family:Arial;font-weight:400;line-height:24px;width:400px;
              "
            >
              개인정보를 안전하게 관리하세요
            </div>
          </div>
        </div>

        <!-- 메인 상대 컨테이너 -->
        <div style="width:404px;position:relative;display:flex;flex-direction:column;gap:16px;">

          <!-- 상단 프로필 카드 (고정 좌표 유지) -->
          <div style="width:396px;height:116px;left:-0.50px;top:0px;position:relative;">
            <div style="width:672px;height:64px;left:120px;top:34px;position:absolute;">
              <div
                style="
                  width:672px;height:24px;left:0px;top:0px;position:absolute;display:inline-flex;align-items:center;gap:12px;
                "
              >
                <div style="width:48px;height:24px;position:relative;">
                  <div
                    style="left:0px;top:-1.67px;position:absolute;color:#0A0A0A;font-size:16px;font-family:Arial;font-weight:400;line-height:24px;"
                  >
                    {{ user.memberName }}
                  </div>
                </div>

                <div
                  v-if="user.isInfluencer"
                  style="
                    width:77.33px;height:21.33px;padding:2px 8px;background:rgba(255,255,255,0.20);
                    border-radius:8px;outline:0.67px rgba(255,255,255,0.30) solid;display:flex;justify-content:center;align-items:center;gap:4px;
                  "
                >
                  <div style="color:white;font-size:12px;font-family:Arial;line-height:16px;">
                    인플루언서
                  </div>
                </div>
              </div>

              <div style="width:672px;height:24px;left:0px;top:32px;position:absolute;">
                <div
                  style="left:0px;top:-1.67px;position:absolute;color:#BE8FF0;font-size:16px;font-family:Arial;font-weight:400;line-height:24px;"
                >
                  {{ user.memberEmail }}
                </div>
              </div>

              <!-- 인플루언서 버튼 (위치 그대로) -->
              <button
            type="button"
            @click="onOpenInfluencer"
            style="
              width: 95px;        /* 🔹 가로폭 살짝 줄임 (110 → 95) */
              height: 28px;       /* 🔹 세로폭도 조금 줄임 (32 → 28) */
              left: 190px;        /* 🔹 오른쪽으로 이동 (162.5 → 190) */
              top: -6px;          /* 🔹 위아래도 살짝 정렬 맞춤 */
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
                top: 5px;
                position: absolute;
                color: white;
                font-size: 10px;   /* 🔹 글씨 크기도 약간 줄임 (12 → 11) */
                font-family: Arimo;
                line-height: 18px;
              "
            >
              인플루언서 페이지
            </div>
          </button>
            </div>

            <div style="width:96px;height:96px;left:0px;top:10px;position:absolute;">
              <div
                style="
                  width:96px;height:96px;left:0;top:0;position:absolute;box-shadow:0px 4px 6px -4px rgba(0,0,0,0.10);
                  overflow:hidden;border-radius:22369600px;outline:4px white solid;outline-offset:-4px;display:inline-flex;
                "
              >
                <div
                  style="
                    flex:1 1 0;height:88px;background:#ECECF0;border-radius:22369600px;display:flex;justify-content:center;align-items:center;
                  "
                >
                  <img style="width:88px;height:132px;" alt="profile" src="../../public/influencerPage/influencerImg8.png" />
                </div>
              </div>
            </div>
          </div>

          <!-- 프로필 폼 (표시/편집) -->
          <div
            style="
              width:404.67px;position:relative;display:inline-flex;flex-direction:column;gap:16px;
            "
          >
            <div style="align-self:stretch;height:27px;position:relative;">
              <div
                style="left:0;top:-1.67px;position:absolute;color:#0A0A0A;font-size:18px;font-family:Arial;line-height:27px;"
              >
                프로필
              </div>
            </div>

            <div style="display:flex;flex-direction:column;gap:16px;align-self:stretch;">

              <!-- ===== 기존 필드들 그대로 (회원ID/비밀번호/이름/이메일/전화번호/성별/나이/키/몸무게) ===== -->
              <!-- (아래 블록들은 사용자가 준 마크업을 그대로 유지) -->

              <!-- 회원 ID -->
              <div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
              <div style="display:inline-flex;align-items:center;height:20px;justify-content:flex-start;gap:8px;">
  <div style="height:20px;display:flex;align-items:center;">
    <div style="color:#0A0A0A;font-size:14px;font-family:Arial;line-height:20px;">
      회원 ID
    </div>
  </div>
  <!-- 필요하면 오른쪽 여백 유지용: flex 공간 차지 안 하게 폭만 둠 -->
  <div style="width:144.93px;height:20px;"></div>
</div>

                <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                  <div
                    style="
                      width:404.67px;height:36px;padding-left:0;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                      display:inline-flex;align-items:center;z-index:1;
                    "
                  >
                    <div style="width:107.84px;height:36px;display:flex;align-items:center;">
                      <template v-if="!editMode">
                        <div style="width:141px;color:#717182;font-size:14px;font-family:Arial;margin-left:-28px;">
                          {{ user.memberId }}
                        </div>
                      </template>
                      <template v-else>
                        <input
                          v-model="editUser.memberId"
                          type="text"
                          style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827; margin-left:10px;"
                        />
                      </template>
                    </div>
                  </div>
                  <div style="width:404.67px;height:36px;left:0;top:0;position:absolute;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
                </div>
              </div>

              <!-- 비밀번호 -->
              <div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
                <div style="display:inline-flex;align-items:center;height:20px;">
                  <div style="width:100px;height:20px;position:relative;">
                    <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">비밀번호 변경</div>
                  </div>
                </div>

                <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                  <div
                    style="
                      width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                      display:inline-flex;align-items:center;z-index:1;
                    "
                  >
                    <div style="width:107.84px;height:36px;display:flex;align-items:center;">
                      <template v-if="!editMode">
                        <div style="color:#717182;font-size:14px;font-family:Arial;">
                          ---- 보안처리 ----
                        </div>
                      </template>
                      <template v-else>
                        <input
                          v-model="editUser.memberPwd"
                          type="text"
                          autocomplete="new-password"
                          style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
                        />
                      </template>
                    </div>
                  </div>
                  <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
                </div>
              </div>

              <!-- 이름 -->
              <div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
                <div style="display:inline-flex;align-items:center;height:20px;">
                  <div style="width:28px;height:20px;position:relative;">
                    <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">이름</div>
                  </div>
                </div>

                <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                  <div
                    style="
                      width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                      display:inline-flex;align-items:center;z-index:1;
                    "
                  >
                    <div style="width:107.84px;height:36px;display:flex;align-items:center;">
                      <template v-if="!editMode">
                        <div style="color:#717182;font-size:14px;font-family:Arial;">
                          {{ user.memberName }}
                        </div>
                      </template>
                      <template v-else>
                        <input
                          v-model="editUser.memberName"
                          type="text"
                          style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
                        />
                      </template>
                    </div>
                  </div>
                  <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
                </div>
              </div>

                        <!-- 이메일 -->
            <div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
              <div style="display:inline-flex;align-items:center;height:20px;">
                <div style="width:42px;height:20px;position:relative;">
                  <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">이메일</div>
                </div>
              </div>

              <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                <div
                  style="
                    width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                    display:inline-flex;align-items:center;z-index:1;
                  "
                >
                  <div style="width:107.84px;height:36px;display:flex;align-items:center;width:400px;">
                    <template v-if="!editMode">
                      <div style="color:#717182;font-size:14px;font-family:Arial;">
                        {{ user.memberEmail }}
                      </div>
                    </template>
                    <template v-else>
                      <input
                        v-model="editUser.memberEmail"
                        type="email"
                        style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
                      />
                    </template>
                  </div>
                </div>
                <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
              </div>
            </div>

              <!-- 전화번호 -->
              <div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
                <div style="display:inline-flex;align-items:center;height:20px;">
                  <div style="width:56px;height:20px;position:relative;">
                    <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">전화번호</div>
                  </div>
                </div>

                <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                  <div
                    style="
                      width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                      display:inline-flex;align-items:center;z-index:1;
                    "
                  >
                    <div style="width:107.84px;height:36px;display:flex;align-items:center;">
                      <template v-if="!editMode">
                        <div style="color:#717182;font-size:14px;font-family:Arial;">
                          {{ user.memberPhone }}
                        </div>
                      </template>
                      <template v-else>
                        <input
                          v-model="editUser.memberPhone"
                          type="text"
                          style="width:100%;height:20px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
                        />
                      </template>
                    </div>
                  </div>
                  <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
                </div>
              </div>

              <!-- 성별 -->
<div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
  <div style="display:inline-flex;align-items:center;height:20px;">
    <div style="width:56px;height:20px;position:relative;">
      <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">성별</div>
    </div>
  </div>

  <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
    <div
      style="
        width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;
        overflow:visible;border-radius:8px;display:inline-flex;align-items:center;z-index:1;
      "
    >
      <div style="width:107.84px;height:36px;display:flex;align-items:center;">
        <template v-if="!editMode">
          <div style="color:#717182;font-size:14px;font-family:Arial;">
            {{ user.memberGender }}
          </div>
        </template>
        <template v-else>
          <select
            v-model="editUser.memberGender"
            style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
          >
            <option value="">선택</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </template>
      </div>
    </div>
    <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
  </div>
</div>
<!-- 나이 -->
<div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
  <div style="display:inline-flex;align-items:center;height:20px;">
    <div style="width:56px;height:20px;position:relative;">
      <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">나이</div>
    </div>
  </div>

  <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
    <div
      style="
        width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;
        overflow:visible;border-radius:8px;display:inline-flex;align-items:center;z-index:1;
      "
    >
      <div style="width:107.84px;height:36px;display:flex;align-items:center;">
        <template v-if="!editMode">
          <div style="color:#717182;font-size:14px;font-family:Arial;">
            {{ user.memberAge }}
          </div>
        </template>
        <template v-else>
          <input
            v-model.number="editUser.memberAge"
            type="number"
            min="0"
            max="120"
            inputmode="numeric"
            style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
          />
        </template>
      </div>
    </div>
    <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
  </div>
</div>

             <!-- 키 -->
<div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
  <div style="display:inline-flex;align-items:center;height:20px;">
    <div style="width:56px;height:20px;position:relative;">
      <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">키</div>
    </div>
  </div>

  <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
    <div
      style="
        width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;
        overflow:visible;border-radius:8px;display:inline-flex;align-items:center;z-index:1;
      "
    >
      <div style="width:107.84px;height:36px;display:flex;align-items:center;">
        <template v-if="!editMode">
          <div style="color:#717182;font-size:14px;font-family:Arial;">
            {{ user.memberHeight }}
          </div>
        </template>
        <template v-else>
          <input
            v-model.number="editUser.memberHeight"
            type="number"
            min="0"
            max="300"
            step="0.1"
            inputmode="decimal"
            style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
          />
        </template>
      </div>
    </div>
    <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
  </div>
</div>

             <!-- 몸무게 -->
<div style="display:flex;flex-direction:column;gap:8px;align-self:stretch;height:64px;">
  <div style="display:inline-flex;align-items:center;height:20px;">
    <div style="width:56px;height:20px;position:relative;">
      <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">몸무게</div>
    </div>
  </div>

  <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
    <div
      style="
        width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;
        overflow:visible;border-radius:8px;display:inline-flex;align-items:center;z-index:1;
      "
    >
      <div style="width:107.84px;height:36px;display:flex;align-items:center;">
        <template v-if="!editMode">
          <div style="color:#717182;font-size:14px;font-family:Arial;">
            {{ user.memberWeight }}
          </div>
        </template>
        <template v-else>
          <input
            v-model.number="editUser.memberWeight"
            type="number"
            min="0"
            max="500"
            step="0.1"
            inputmode="decimal"
            style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
          />
        </template>
      </div>
    </div>
    <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
  </div>
</div>

            </div> <!-- /필드들 -->

            <!-- 주소 (겹침 해소: absolute 제거, 자연 배치) -->
            <div
              style="
                width:404.67px;position:relative;display:inline-flex;flex-direction:column;gap:8px;
              "
            >
              <div style="align-self:stretch;height:20px;display:inline-flex;justify-content:space-between;align-items:center;">
                <div style="width:56px;height:20px;position:relative;">
                  <div style="left:0;top:-1.33px;position:absolute;color:#0A0A0A;font-size:14px;font-family:Arial;">
                    주소
                  </div>
                </div>
              </div>
              <div style="align-self:stretch;height:36px;position:relative;background:#F3F3F5;border-radius:8px;">
                <div
                  style="
                    width:404.67px;height:36px;padding-left:12px;position:absolute;left:0;top:0;overflow:visible;border-radius:8px;
                    display:inline-flex;align-items:center;z-index:1;
                  "
                >
                  <div style="width:107.84px;height:36px;display:flex;align-items:center;width:300px;">
                    <template v-if="!editMode">
                      <div style="color:#717182;font-size:14px;font-family:Arial;">
                        {{ user.memberAddress }}
                      </div>
                    </template>
                    <template v-else>
                      <input
                        v-model="editUser.memberAddress"
                        type="text"
                        style="width:100%;height:28px;border:none;outline:none;background:transparent;font-size:14px;color:#111827;"
                      />
                    </template>
                  </div>
                </div>
                <div style="width:404.67px;height:36px;position:absolute;left:0;top:0;border-radius:8px;border:.67px #D1D5DC solid;pointer-events:none;"></div>
              </div>
            </div>

            <!-- 수정하기 / 저장하기 버튼 (겹침 해소: absolute 제거, 가로 100%) -->
            <button
              type="button"
              @click="onEditOrSave"
              style="
                width:404.67px;height:44px;margin-top:16px;background:black;border-radius:8px;border:none;cursor:pointer;color:white;font-size:14px;font-family:Arial;
              "
            >
              {{ editMode ? '저장하기' : '수정하기' }}
            </button>

            <!-- 푸터 링크 (겹침 해소: absolute 제거, 상단 보더 유지) -->
            <div
              style="
                width:404.67px;padding-top:24.67px;margin-top:16px;border-top:0.67px #F3F4F6 solid;
                display:inline-flex;justify-content:center;gap:16px;color:#6A7282;font-size:14px;font-family:Arial;
              "
            >
              <div>내정보</div>
              <div>•</div>
              <div>보안센터</div>
              <div>•</div>
              <div>고객센터</div>
            </div>

          </div> <!-- /프로필 폼 -->

        </div> <!-- /메인 상대 컨테이너 -->
      </div> <!-- /본문 래퍼 -->
    </div>

    <FooterView/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from 'vue-router';
import { watch } from 'vue';

import FooterView from "../FooterView.vue";
import HeaderView from "../HeaderView.vue";

const user = ref({});
const editMode = ref(false);
const router = useRouter()

const token = sessionStorage.getItem('token');
let memberNum = ref("");
let memberId = ref("");
let memberEmail = ref("");
let memberState = ref("");

// 편집 버퍼 (닉네임 제거, 성별/나이/키/몸무게 추가)
const editUser = ref({
  memberId: "",
  memberPwd: "",
  memberName: "",
  memberEmail: "",
  phoneMasked: "",
  address: "",
  gender: "",
  age: null,
  height: null,
  weight: null,
});

onMounted(async () => {
   try {
    



    axios.get('/api/member-service/member/auth',{
    headers: {
        Authorization: `Bearer ${token}`
    }
    }).then((res) => {
      console.log(res)
      if(res.data.memberId == null){
        router.push('/')
      }else{
        memberNum.value = res.data.memberNum
        memberId.value = res.data.memberId
        memberEmail.value = res.data.memberEmail
        memberState.value = res.data.memberState
      }
    })

    watch(memberNum, async (current,old) => {
      const res = await axios.get(`/api/member-service/member/membernum/${memberNum.value}`);
      user.value = res.data;
    })
  } catch (error) {
    console.error('회원 정보 불러오기 실패:', error);
  }
});




function onOpenInfluencer() {
  alert("인플루언서 페이지로 이동합니다.");
}

function fillEditBufferFromUser() {
  editUser.value.memberId    = user.value.memberId    || "";
  editUser.value.memberPwd = "";
  editUser.value.memberName  = user.value.memberName  || "";
  editUser.value.memberEmail = user.value.memberEmail || "";
  editUser.value.memberPhone = user.value.memberPhone|| "";
  editUser.value.memberAddress = user.value.memberAddress     || "";
  editUser.value.memberGender      = user.value.memberGender      || "";
  editUser.value.memberAge         = user.value.memberAge ?? "";
  editUser.value.memberHeight      = user.value.memberHeight ?? "";
  editUser.value.memberWeight      = user.value.memberWeight ?? "";
}

async function saveMember() {
  try {
    if (!user.value?.memberNum) {
      throw new Error("회원 고유번호(memberNum)가 없습니다.");
    }
    const token = localStorage.getItem("accessToken");
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const payload = {
      memberNum:   user.value.memberNum,
      memberId:    editUser.value.memberId,
      memberPwd:   editUser.value.memberPwd,
      memberName:  editUser.value.memberName,
      memberEmail: editUser.value.memberEmail,
      memberPhone: editUser.value.memberPhone,
      memberAddress:     editUser.value.memberAddress,
      memberGender:      editUser.value.memberGender,
      memberAge:         editUser.value.memberAge,
      memberHeight:      editUser.value.memberHeight,
      memberWeight:      editUser.value.memberWeight,
    };

    const url = `/api/member-service/member/membernum/${encodeURIComponent(user.value.memberNum)}`;
    await axios.put(url, payload, { headers });

    user.value = { ...user.value, ...payload };
    alert("회원정보가 성공적으로 수정되었습니다.");
    editMode.value = false;
  } catch (error) {
    console.error("회원정보 수정 실패:", error?.response?.data || error.message || error);
    alert("회원정보 수정에 실패했습니다.");
  }
}

function onEditOrSave() {
  if (!editMode.value) {
    fillEditBufferFromUser();
    editMode.value = true;
  } else {
    saveMember();
  }
}
</script>

<style scoped>
/* 전달받은 디자인을 최대한 유지하기 위해 별도 클래스는 최소화했습니다. */
</style>
