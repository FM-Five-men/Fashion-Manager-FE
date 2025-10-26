<template>
    <div class="filter-container">
        <!-- 헤더 -->
        <div class="filter-header">
        <div class="filter-icon"></div>
        <span class="filter-title">필터 및 검색</span>
        </div>

        <!-- 검색 + 카테고리 -->
        <div class="filter-body">
        <!-- 검색창 -->
        <div class="search-box">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
            </svg>
            <input
            v-model="searchQuery"
            type="text"
            placeholder="제목, 작성자, 카테고리로 검색..."
            class="search-input"
            />
        </div>

        <!-- 카테고리 필터 -->
        <div class="category-select">
            <select v-model="selectedCategory" class="category-dropdown">
            <option value="">전체</option>
            <option value="1">관리자</option>
            <option value="2">일반회원</option>
            <option value="3">인플루언서</option>
            </select>
        </div>
        </div>
    </div>

    <div 
        class="user-card"
        v-for="member in filteredMembers"
        :key="member.memberNum"
    >
        <div class="user-info">
            <div class="user-content">
                <!-- 상단: 이름 / 인플루언서 / 상세보기 버튼 -->
                <div class="user-header">
                    <div class="user-name">
                        <div class="name">{{ member.memberName }}</div>
                        <div class="id">{{ member.memberId }}</div>
                        <div class="role" v-if="member.memberStateNum == 1" style="background-color: #f3e8ff; color: #6e11b0">{{member.memberStateName}}</div>
                        <div class="role" v-if="member.memberStateNum == 2" style="background-color: rgba(86, 176, 17, 1); color: white">{{member.memberStateName}}</div>
                        <div class="role" v-if="member.memberStateNum == 3" style="background-color: rgba(189, 22, 108, 1); color: white">{{member.memberStateName}}</div>
                    </div>

                    <div class="detail-btn" @click="openModal(member)">상세보기</div>
                </div>

                <!-- 중간: 이메일 -->
                <div class="user-details">
                    <div class="info-item">
                        <div class="text">jisu.kim@email.com</div>
                    </div>
                    
                </div>
            </div>

            <!-- 프로필 이미지 -->
            <div class="profile-img">
                <img src="https://placehold.co/64x64" alt="프로필 이미지" />
            </div>
        </div>
    </div>
    

  <div>
    <!-- 🪟 모달 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- 기존 HTML 코드 삽입 -->
        <div class="profile-wrapper">
            <!-- 원본 HTML 구조 유지 -->
            <div
            style="width: 1384px; height: 931px; background: white; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex"
            >
            <div
                style="align-self: stretch; height: 931.33px; position: relative; background: #F9FAFB"
            >
                <!-- 🔹 닫기 버튼 -->
                <button class="close-btn" @click="closeModal">×</button>

                <!-- 🔹 원본 HTML 삽입 (김지수 프로필 부분) -->
                <div
                style="width: 1384px; height: 329.33px; left: 0px; top: 0px; position: absolute; background: linear-gradient(135deg, #0A0A0A 0%, #CBCBCC 100%); flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex"
                >
                <!-- (중략 - 원본 내부 HTML 그대로 유지) -->
                <!-- 너가 주신 나머지 div 코드는 그대로 여기에 들어감 -->
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const token = sessionStorage.getItem("token");

const memberId = ref("");
const memberEmail = ref("");
const memberState = ref("");

// 필터링용 상태값
const selectedCategory = ref(""); // "" = 전체, 1~4 = 카테고리 번호
const searchQuery = ref("");

const members = ref([]);
const selectedMember = ref({});

// onMounted에서 데이터 로드
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
    }

    const memberRes = await axios.get(
      "/api/member-service/member/selectmemberright",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(memberRes)
    members.value = memberRes.data;
  } catch (err) {
    console.error("Error loading reports:", err);
  }
});

// ✅ 필터링된 회원 목록 (검색 + 카테고리 적용)
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    const matchesCategory =
      !selectedCategory.value || member.memberStateNum == selectedCategory.value;

    const matchesSearch =
      !searchQuery.value ||
      member.memberName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      member.memberId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (member.memberStateName &&
        member.memberStateName
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()));

    return matchesCategory && matchesSearch;
  });
});

const showModal = ref(false);

function openModal(member) {
    selectedMember.value = member;
    showModal.value = true;
  
}

function closeModal() {
  showModal.value = false;
}
</script>

<style scoped>
.filter-container {
  width: 100%;
  max-width: 1232px;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

/* 헤더 */
.filter-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.filter-title {
  font-size: 16px;
  font-weight: 500;
  color: #0a0a0a;
}

/* 본문 */
.filter-body {
  display: flex;
  gap: 16px;
}

/* 검색창 */
.search-box {
  display: flex;
  align-items: center;
  width: 50%;
  background-color: #f3f3f5;
  border-radius: 8px;
  padding: 0 12px;
  height: 36px;
}

.search-icon {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #374151;
  outline: none;
}

/* 카테고리 선택 */
.category-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  background-color: #f3f3f5;
  border-radius: 8px;
  padding: 0 12px;
  height: 36px;
}

.category-dropdown {
  width: 100%;
  background-color: transparent;
  border: none;
  font-size: 14px;
  color: #0a0a0a;
  outline: none;
  cursor: pointer;
}




.user-card {
  width: 800px;
  height: 150px;
  padding: 24px;
  background: white;
  border-radius: 10px;
  border: 0.7px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.user-info {
  display: flex;
  position: relative;
  height: 240px;
}

.user-content {
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 1100px;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.user-name {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.name {
  font-size: 16px;
  color: #0a0a0a;
}

.role {
  background: #f3e8ff;
  border: 0.7px solid #e9d4ff;
  color: #6e11b0;
  font-size: 12px;
  border-radius: 8px;
  padding: 2px 8px;
  width: fit-content;
}

.detail-btn {
  padding: 6px 12px;
  border: 0.7px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #0a0a0a;
}

.detail-btn:hover {
  background: #f4f4f4;
}

/* 사용자 정보 리스트 */
.user-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 16px;
  height: 16px;
  border: 1.3px solid #4a5565;
  border-radius: 2px;
}

/* 실제 아이콘 대신 단순한 형태 유지 */
.email-icon {
    
}
.phone-icon {
  border-radius: 50%;
}
.location-icon {
  clip-path: circle(40% at 50% 50%);
}
.join-icon {
  border-radius: 3px;
}

.text {
  font-size: 14px;
  color: #4a5565;
}

/* 하단 스타일 */
.user-footer {
  border-top: 0.7px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  margin-top: 8px;
}

.footer-item {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 14px;
  color: #6a7282;
}

.value {
  font-size: 14px;
  color: #0a0a0a;
}

/* 프로필 이미지 */
.profile-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.profile-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}



/* 모달 배경 - 중앙 정렬 + 어두운 효과 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 모달 내용 */
.modal-content {
  background: white;
  border-radius: 12px;
  padding: 16px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  position: relative;
}

/* ✅ 모달 박스 (정중앙 위치) */
.modal-box {
  background: white;
  border-radius: 14px;
  width: 700px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transform: scale(0.95);
  animation: popup 0.3s ease forwards;
}

/* ✅ 간단한 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popup {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ✅ 열기 버튼 */
.open-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.open-btn:hover {
  background-color: #1d4ed8;
}

/* 닫기 버튼 */
.close-btn {
  position: absolute;
  top: 12px;
  right: 20px;
  background: none;
  border: none;
  font-size: 32px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.close-btn:hover {
  color: #8200db;
}

/* ✅ 신고 상세 내용 */
.report-detail-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 상단 */
.report-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-btn {
  border: none;
  background: none;
  font-size: 14px;
  cursor: pointer;
  color: #0a0a0a;
  text-align: left;
}

.report-title .title {
  font-size: 24px;
  color: #101828;
}

.report-title .report-id {
  font-size: 16px;
  color: #4a5565;
}

/* 본문 */
.report-body {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.status-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  font-size: 16px;
  color: #4a5565;
}

.status-badge {
  background: #dbeafe;
  color: #193cb8;
  font-size: 12px;
  border: 1px solid #bedbff;
  border-radius: 8px;
  padding: 4px 8px;
}

.info-section {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 16px;
}

.label {
  font-size: 16px;
  color: #4a5565;
}

.value,
.value-box {
  font-size: 16px;
  color: #101828;
}

.value-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  width: fit-content;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px;
  font-size: 16px;
  color: #101828;
}

.divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
}

/* 하단 버튼 */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-small {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.btn-group {
  display: flex;
  gap: 8px;
}

.approve {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.reject {
  background: #d4183d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>