<template>
    <HeaderView/>
    <div class="wrapper">
        <div class="container-1" @click="goTo('/admin')">
            <div class="title-wrapper">
            <div class="title">전체 회원 조회</div>
            </div>
        </div>
        <div class="container-2" @click="goTo('/admin/reportlist')">
            <div class="title-wrapper">
                <div class="title">신고 목록 조회</div>
            </div>
        </div>
        <div class="container-3" @click="goTo('/admin/postlist')">
            <div class="title-wrapper">
                <div class="title">게시물 조회</div>
            </div>
        </div>
        <div class="container-4">
            <div class="title-wrapper">
                <div class="title">인플루언서 신청</div>
            </div>
        </div>
    </div>
    <router-view/>
    <FooterView/>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import FooterView from "../FooterView.vue";
import HeaderView from "../HeaderView.vue";

const router = useRouter();
const token = sessionStorage.getItem("token");

const memberId = ref("");
const memberEmail = ref("");
const memberState = ref("");

function goTo(path) {
  router.push(path);
}


onMounted(async () => {
  try {
    const authRes = await axios.get("/api/member-service/member/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!authRes.data.memberId) {
      router.push("/");
    } else {
      memberId.value = authRes.data.memberId;
      memberEmail.value = authRes.data.memberEmail;
      memberState.value = authRes.data.memberState;
      if(authRes.data.memberState != "관리자"){
        router.push("/");
      }
    }
  } catch (err) {
    console.error("Error loading reports:", err);
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 20px; /* 🔹 두 박스 간의 간격 (원하면 30px 등으로 조정 가능) */
}

.container-1 {
  align-self: stretch;
  height: 97px;
  padding: 24.67px;
  background: white;
  border-radius: 10px;
  outline: 0.67px solid rgba(0, 0, 0, 0.1);
  outline-offset: -0.67px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
}

.container-2 {
  align-self: stretch;
  height: 97.33px;
  padding: 24.67px;
  background: #FAF5FF;
  border-radius: 10px;
  outline: 0.67px solid #E9D4FF;
  outline-offset: -0.67px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
}

.container-3 {
  align-self: stretch;
  height: 97.33px;
  padding: 24.67px;
  background: #FEFCE8; /* 연노랑 배경 */
  border-radius: 10px;
  outline: 0.67px solid #FFF085; /* 노란색 외곽선 */
  outline-offset: -0.67px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
}

.container-4 {
  align-self: stretch;
  height: 97.33px;
  padding: 24.67px;
  background: #EFF6FF; /* 연한 하늘색 배경 */
  border-radius: 10px;
  outline: 0.67px solid #BEDBFF; /* 파란색 외곽선 */
  outline-offset: -0.67px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  cursor: pointer;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 135px;
}

.title {
  color: #101828;
  font-size: 20px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}


</style>