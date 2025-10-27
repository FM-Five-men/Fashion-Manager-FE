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
        <div class="profile-container">
            <div class="profile-header">
            <div class="header-content">
                <div class="profile-info">
                <div class="avatar">
                    <img src="https://placehold.co/88x88" alt="프로필 이미지" />
                    <div class="edit-icon"></div>
                </div>
                <div class="profile-text">
                    <div class="profile-name">
                    <span>{{selectedMember.memberId}}</span>
                    <span class="badge">{{selectedMember.memberStateName}}</span>
                    </div>
                    <p class="email">{{selectedMember.memberEmail}}</p>
                </div>
                </div>
            </div>

            <div class="stats">
                
                <div class="stat-item">
                <div class="stat-number">{{ selectedMember.memberGoodCount }}</div>
                <div class="stat-label">좋아요</div>
                </div>
                
                <div class="stat-item">
                <div class="stat-number">{{ selectedMember.memberCheerCount }}</div>
                <div class="stat-label">힘내요</div>
                </div>

                <div class="stat-item">
                <div class="stat-number">{{ selectedMember.memberReportCount }}</div>
                <div class="stat-label">신고 당한 횟수</div>
                </div>
            </div>
            </div>

            <div class="profile-body">
            <div class="info-card">
                <h3>기본 정보</h3>
                <div class="info-grid">
                <div><label>이름</label><p>{{ selectedMember.memberName }}</p></div>
                <div><label>회원 등급</label><p>{{ selectedMember.memberStateName }}</p></div>
                <div><label>이메일</label><p>{{ selectedMember.memberEmail }}</p></div>
                <div><label>나이</label><p>{{ selectedMember.memberAge }}</p></div>
                <div><label>키</label><p>{{ selectedMember.memberHeight }}</p></div>
                <div><label>몸무게</label><p>{{ selectedMember.memberWeight }}</p></div>
                <div><label>활동 상태</label><p>{{ selectedMember.memberStatus }}</p></div>
                <div><label>메시지 수락 여부</label><p>{{ selectedMember.memberMessageAllow }}</p></div>
                </div>
            </div>

            <!-- ✅ 추가: 회원 등급 변경 -->
            <div class="info-card">
            <h3>회원 등급 변경</h3>
            <div class="status-change-box">
                <select v-model="selectedRight" class="status-dropdown">
                <option value="1">관리자</option>
                <option value="2">일반회원</option>
                <option value="3">인플루언서</option>
                </select>
                <button class="status-btn" @click="updateRight">변경</button>
            </div>
            </div>
            

            <!-- ✅ 추가: 활동 상태 변경 -->
            <div class="info-card">
            <h3>활동 상태 변경</h3>
            <div class="status-change-box">
                <select v-model="selectedStatus" class="status-dropdown">
                <option value="활동중">활동중</option>
                <option value="휴면">휴면</option>
                <option value="정지">정지</option>
                </select>
                <button class="status-btn" @click="updateStatus">변경</button>
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
const selectedStatus = ref("활동중");
const selectedRight = ref(2);

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

    const memberRes = await axios.get("/api/member-service/member/selectmemberright");
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

const updateStatus = () => {
    const data = new FormData();
    data.append("id",selectedMember.value.memberId)
    data.append("updateState",selectedStatus.value)
    axios.post('/api/member-service/member/updatestate',data).then(
        (res) => {
            console.log(res)
        }
    )
}

const updateRight = () => {
    const data = new FormData();
    data.append('num',selectedMember.value.memberNum)
    data.append('updateRight',selectedRight.value)
    axios.post('/api/member-service/member/updateright',data).then(
        (res) => {
            console.log(res)
        }
    )
}
</script>

<style scoped>
.filter-container {
  width: 800px;
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
  display: flex;
  justify-content: center;
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





.profile-container {
  width: 1384px;
  background: #f9fafb;
  color: #0a0a0a;
  font-family: Arial, sans-serif;
}

.profile-header {
  background: linear-gradient(135deg, #0a0a0a 0%, #cbcbcc 100%);
  color: white;
  padding: 48px 116px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar {
  position: relative;
  width: 96px;
  height: 96px;
}

.avatar img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.profile-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 12px;
}

.email {
  color: #f3e8ff;
  font-size: 14px;
}

.edit-button {
  background: white;
  color: #0a0a0a;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.stats {
  display: flex;
  gap: 24px;
  margin-top: 32px;
}

.stat-item {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  text-align: center;
  padding: 16px;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
}

.stat-label {
  font-size: 14px;
  color: #f3e8ff;
}

.profile-body {
  padding: 40px 148px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.info-card {
  background: white;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 1038px;
}

.info-card h3 {
  font-size: 16px;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 40px;
}

.info-grid label {
  color: #6a7282;
  font-size: 14px;
  display: block;
  margin-bottom: 4px;
}

.info-grid p {
  font-size: 16px;
  color: #0a0a0a;
  margin: 0;
}

.style-tag {
  display: inline-block;
  background: #f3e8ff;
  color: #8200db;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
}


/* ✅ 드롭다운 + 버튼 스타일 */
.status-change-box {
  display: flex;
  gap: 12px;
  align-items: center;
}

.status-dropdown {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.status-btn {
  background-color: #8200db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.status-btn:hover {
  background-color: #6e00b0;
}

.status-message {
  margin-top: 10px;
  font-size: 14px;
  color: #4a5565;
}
</style>