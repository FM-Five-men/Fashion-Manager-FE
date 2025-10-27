<template>
  <div class="pagination-container">

    <!-- 🔍 검색바 + 버튼 -->
    <div class="search-row">
      <div class="search-bar">
        <select v-model="searchType" class="search-select">
          <option value="all">전체</option>
          <option value="name">이름</option>
          <option value="content">내용</option>
        </select>

        <input
          v-model="keyword"
          type="text"
          placeholder="검색어를 입력하세요"
          class="search-input"
          @keyup.enter="emitSearch"
        />
      </div>

      <button class="search-btn" @click="emitSearch">
        <span class="search-icon"></span>
        <span>검색</span>
      </button>
    </div>

    <!-- 📄 페이지네이션 줄 -->
    <div class="page-row">
      <button
        class="arrow-btn"
        :disabled="currentPage === 1"
        @click="emitPage(currentPage - 1)"
      >
        ‹
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        class="page-num-btn"
        :class="{ active: currentPage === page }"
        @click="emitPage(page)"
      >
        {{ page }}
      </button>

      <button
        class="arrow-btn"
        :disabled="currentPage === totalPages"
        @click="emitPage(currentPage + 1)"
      >
        ›
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  currentPage: { type: Number, default: 1 },
  totalPages: { type: Number, default: 10 },
});

const emit = defineEmits(["update:page", "search"]);

const keyword = ref("");
const searchType = ref("all");

function emitPage(page) {
  // 경계 체크 (1 ~ totalPages)
  if (page < 1) return;
  if (page > props.totalPages) return;
  emit("update:page", page);
}

function emitSearch() {
  emit("search", {
    type: searchType.value,
    keyword: keyword.value,
  });
}
</script>

<style scoped>
.pagination-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 24px;
  margin-bottom: 30px; /* footer와 간격 */
}

/* 🔍 검색 줄 전체 래퍼 */
.search-row {
  display: flex;
  align-items: center; /* search-bar와 버튼 수직 가운데 맞춤 */
  gap: 12px;
  margin-bottom: 16px;
}

/* 검색 바 (셀렉트 + 인풋) */
.search-bar {
  display: flex;
  align-items: center;
  background: #f6f6f8;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 12px;       /* 위아래 padding 제거 */
  min-width: 480px;
  height: 38px;          /* 고정 높이 */
  box-sizing: border-box;
  gap: 12px;
}

/* 드롭다운 */
.search-select {
  background: transparent;
  border: none;
  padding: 0 24px 0 0;   /* 오른쪽은 아이콘 자리 */
  font-size: 14px;
  color: #000;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;

  /* 브라우저 기본 화살표 제거 */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  /* ▼ 커스텀 화살표 (검정 벡터) */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='black' d='M0 0l5 6 5-6z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0px center;
  background-size: 10px 6px;
}

.search-select:focus {
  outline: none;
}

/* 검색 인풋 */
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  font-size: 14px;
  color: #444;
  line-height: 1;
  padding: 0;
}
.search-input::placeholder {
  color: #999;
  font-weight: 400;
}
.search-input:focus {
  outline: none;
}

/* 🔍 검색 버튼 */
.search-btn {
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;

  min-width: 54px;
  height: 38px;          /* search-bar와 동일 */
  line-height: 38px;     /* 텍스트를 수직 가운데에 고정 */
  padding: 0 12px;

  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

/* 아이콘 span은 현재 비어있지만 혹시 나중에 돋보기 넣을 때 대비 */
.search-icon {
  font-size: 14px;
  line-height: 1;
}

/* 📄 페이지 줄 */
.page-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #222;
  user-select: none;
}

/* ‹ › 버튼 */
.arrow-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  line-height: 1;
  color: #444;
  cursor: pointer;
  padding: 4px 6px;
}
.arrow-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

/* 페이지 숫자 */
.page-num-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  line-height: 1;
  color: #222;
  cursor: pointer;
  padding: 4px 6px;
  min-width: 20px;
  border-radius: 6px;
}

/* 현재 페이지 하이라이트 (검정 pill) */
.page-num-btn.active {
  background: #000;
  color: #fff;
  border-radius: 6px;
  padding: 6px 8px;
  font-weight: 500;
}

</style>
