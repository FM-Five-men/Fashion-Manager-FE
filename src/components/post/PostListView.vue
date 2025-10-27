filter-icon<template>
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
          <option value="fashion">패션</option>
          <option value="review">후기</option>
          <option value="mentoring">멘토링</option>
        </select>
      </div>
    </div>
  </div>


  <!-- 게시물 리스트 -->
  <div
    class="post-card"
    v-for="post in filteredPosts"
    :key="post.num"
  >
    <!-- 썸네일 이미지 -->
    <div class="post-image">
      <img src="https://placehold.co/120x120" alt="게시물 이미지" />
    </div>

    <!-- 내용 -->
    <div class="post-content">
      <!-- 상단: 카테고리 + 제목 + 버튼 -->
      <div class="post-header">
        <div
          class="post-category"
          v-if="post.type == 'fashion'"
          style="background-color: #f3e8ff; color: #6e11b0"
        >
          패션
        </div>
        <div
          class="post-category"
          v-else-if="post.type == 'review'"
          style="background-color: rgba(86, 176, 17, 1); color: white"
        >
          후기
        </div>
        <div
          class="post-category"
          v-else-if="post.type == 'mentoring'"
          style="background-color: rgba(189, 22, 108, 1); color: white"
        >
          멘토링
        </div>
        <div class="post-title">{{ post.title }}</div>
        <div class="post-title">{{ post.name }}</div>
        <button class="post-detail-btn" v-if="post.type == 'fashion'" @click="moveFashion(post.num)">상세보기</button>
        <button class="post-detail-btn" v-else-if="post.type == 'review'">상세보기</button>
        <button class="post-detail-btn" v-else-if="post.type == 'mentoring'">상세보기</button>
    
        <button class="delete-btn" @click.stop="fashionDelete(post.num)" v-if="post.type == 'fashion'"></button>
        <button class="delete-btn" @click.stop="reviewDelete(post.num)" v-else-if="post.type == 'review'"></button>
        <button class="delete-btn" @click.stop="mentoringDelete(post.num)" v-else-if="post.type == 'mentoring'"></button>
      </div>

      <!-- 중단: 작성자, 작성일 -->
      <div class="post-meta">
        <div class="writer">{{ post.memberName }}</div>
        <div class="good-container">
            <div class="good" v-if="post.type == 'fashion' || post.type == 'review'">{{post.good}}</div>
            <div class="cheer" v-if="post.type == 'fashion' || post.type == 'review'">{{post.cheer}}</div>
            <div class="finish" v-if="post.type == 'mentoring'">{{ post.finish }}</div>
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

const posts = ref([]);
const selectedPost = ref({});

// 필터링용 상태값
const selectedCategory = ref(""); // "" = 전체, 1~4 = 카테고리 번호
const searchQuery = ref("");

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

    await axios.get("/api/manager-service/posts/fashion/all",{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
            res.data.forEach(item => {
                console.log(item);    
                item.type = "fashion";    
                posts.value.push(item); 
            });
        }
    )

    await axios.get("/api/manager-service/posts/review/all",{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
            res.data.forEach(item => {
                console.log(item);    
                item.type = "review";    
                posts.value.push(item); 
            });
        }
    )

    await axios.get("/api/manager-service/posts/mentoring/all",{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
            res.data.forEach(item => {
                console.log(item);    
                item.type = "mentoring";    
                posts.value.push(item); 
            });
        }
    )
  } catch (err) {
    console.error("Error loading reports:", err);
  }
});

// ✅ 필터된 게시물 목록
const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    // 1️⃣ 카테고리 필터
    const matchCategory =
      !selectedCategory.value || post.type === selectedCategory.value;

    // 2️⃣ 검색어 필터 (제목, 작성자, 카테고리명에서 검색)
    const query = searchQuery.value.toLowerCase();
    const matchSearch =
      post.title?.toLowerCase().includes(query) ||
      post.memberName?.toLowerCase().includes(query) ||
      post.type?.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });
});

const fashionDelete = (num) => {
    axios.delete(`/api/manager-service/posts/fashion/${num}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
        }
    )
}

const reviewDelete = (num) => {
    axios.delete(`/api/manager-service/posts/review/${num}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
        }
    )
}

const mentoringDelete = (num) => {
    axios.delete(`/api/manager-service/posts/mentoring/${num}`,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        (res) => {
            console.log(res)
        }
    )
}

const moveFashion = (num) => {
    router.push(`/fashionpost/${num}`);
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

/* 게시물 카드 */
.post-card {
  position: relative;
  width: 800px;
  height: 120px;
  display: flex;
  padding: 15px;
  gap: 20px;
  border-bottom: 1px solid #e5e7eb;
}

/* 이미지 */
.post-image {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 내용 영역 */
.post-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 상단 */
.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
}

.post-category {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 8px;
  flex-shrink: 0;
}

.post-title {
  font-size: 16px;
  color: #0a0a0a;
  margin-left: 12px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-detail-btn {
  width: 100px;
  height: 32px;
  background-color: white;
  border: 0.67px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: #0a0a0a;
  cursor: pointer;
}

/* 작성일 */
.post-meta {
  font-size: 14px;
  color: #4a5565;
  text-align: left;
}




/* ✅ 모달 배경 (어둡고 블러 효과 추가) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.5); /* 어두운 반투명 */
  backdrop-filter: blur(3px); /* 블러 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;
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

.info-item {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 8px;
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

/* Tabs */
.tab-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  background: #ececf0;
  padding: 4px;
  border-radius: 14px;
  margin-bottom: 24px;
}
.tab {
  background: white;
  border-radius: 14px;
  padding: 6px 20px;
  cursor: pointer;
  transition: 0.2s;
}
.tab.active {
  background: #030213;
  color: white;
}



.good-container {
  display: flex;              /* 가로 정렬 */
  align-items: center;
  padding-top: 10px;        /* 세로 가운데 정렬 */
  gap: 10px;                  /* 두 div 사이 간격 */
}

.good {
  background: #f55252;
  padding: 8px 12px;
  border-radius: 6px;
}

.cheer{
  background: #966def;
  padding: 8px 12px;
  border-radius: 6px;
}

.finish {
  background: #01cb52;
  padding: 8px 12px;
  border-radius: 6px;
}

.delete-btn {
  background: url('/images/icons/trashcan.svg') no-repeat center center;
  background-size: 20px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
}
</style>