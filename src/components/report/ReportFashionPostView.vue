<template>
  <div class="report-detail-container">
    <!-- 상단 헤더 -->
    <div class="header">
      <div class="header-info">
        <div class="title-section">
          <div class="report-title">신고 작성</div>
        </div>
      </div>
    </div>

    <!-- 본문 -->
    <div class="report-body">
      <div class="divider"></div>

      <!-- 신고 정보 -->
      <div class="info-row">
        <div class="info-item">
          <div class="info-label">카테고리</div>
          <div class="info-value category">패션 게시물</div>
        </div>

        <div class="info-item">
          <div class="info-label">신고자</div>
          <div class="info-value">{{ memberId }}</div>
        </div>

        <div class="info-item">
          <div class="info-label">접수일시</div>
          <div class="info-value">{{ today.toLocaleDateString() }}</div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 신고 내용 -->
      <div class="section">
        <div class="section-label">신고 내용</div>
        <div class="section-box">
          <textarea
            v-model="reportContent"
            placeholder="신고 내용을 입력하세요"
            class="textarea-field"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 -->
    <div class="footer">
      <button class="btn back" @click="goBack">취소</button>
      <div class="btn-group">
        <button class="btn approve" @click="submitReport">신청</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const token = sessionStorage.getItem("token");

const memberId = ref("");
const memberEmail = ref("");
const memberState = ref("");
const memberName = ref("");

let today = new Date();

// 신고 제목, 내용 입력값
const reportTitle = ref("");
const reportContent = ref("");

onMounted(async () => {
  try {
    const authRes = await axios.get("/api/member-service/member/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!authRes.data.memberId) {
      router.push("/");
    } else {
        console.log(authRes)
      memberId.value = authRes.data.memberId;
      memberEmail.value = authRes.data.memberEmail;
      memberState.value = authRes.data.memberState;
      memberName.value = authRes.data.memberName;
    }
  } catch (err) {
    console.error("Error loading reports:", err);
  }
});

function toLocalDateTimeString(date) {
  const offset = date.getTimezoneOffset() * 60000; // 분 → ms
  const localTime = new Date(date - offset);
  return localTime.toISOString().slice(0, 19); // "2025-10-27T17:24:35"
}

// ✅ 신청(제출) 버튼 클릭 시 실행될 함수
const submitReport = async () => {
  if (!reportContent.value.trim()) {
    alert("내용을 입력해주세요.");
    return;
  }

  try {
    console.log(route.params.num);
    await axios.post("/api/manager-service/report/insertreport", {
      reportDate: toLocalDateTimeString(new Date()),
      reportContent: reportContent.value,
      reportState: "처리중",
      reportCategoryNum: 1,
      fashionPostNum: route.params.num
    }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(
      (res) => {
        console.log(res);
      }
    )

    alert("신고가 정상적으로 접수되었습니다!");
    router.go(-1)
  } catch (err) {
    console.error("신고 등록 오류:", err);
    alert("신고 접수 중 오류가 발생했습니다.");
  }
};

// ✅ 목록으로 이동
const goBack = () => {
  router.go(-1)
};
</script>

<style scoped>
.report-detail-container {
  background: #f9fafb;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
}

/* 헤더 */
.header {
  height: 120px;
  position: relative;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.back-text {
  color: #0a0a0a;
  font-size: 14px;
}

.header-info {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}

.title-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.report-title {
  font-size: 35px;
  color: #101828;
}

.report-number {
  color: #4a5565;
  font-size: 16px;
}

/* 본문 */
.report-body {
  background: white;
  border-radius: 14px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  width: 600px;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  color: #4a5565;
  font-size: 16px;
}

.status-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #dbeafe;
  border: 1px solid #bedbff;
  border-radius: 8px;
  padding: 4px 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border: 1px solid #193cb8;
  border-radius: 50%;
}

.status-text {
  color: #193cb8;
  font-size: 12px;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  color: #4a5565;
  font-size: 16px;
}

.info-value {
  color: #101828;
  font-size: 16px;
}

.category {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 6px 12px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-label {
  color: #4a5565;
  font-size: 16px;
}

.section-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px 24px;
  color: #101828;
  line-height: 1.6;
}

/* 푸터 버튼 */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
}

.btn.back {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-group {
  display: flex;
  gap: 8px;
}

.btn.approve {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.btn.reject {
  background: #d4183d;
  color: white;
}

.input-field {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
}

.textarea-field {
  width: 100%;
  height: 120px;
  border: none;
  background: transparent;
  font-size: 16px;
  resize: none;
  outline: none;
  line-height: 1.6;
}
</style>