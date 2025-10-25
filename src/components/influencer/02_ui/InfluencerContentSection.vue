<template>
  <section class="content-wrapper">
    <div class="gradient-bg"></div>

    <!-- 탭 영역 -->
    <div class="tabs-row">
      <div class="tab-item active">Posts</div>
      <div class="tab-item">Mentoring</div>
    </div>

    <!-- 카드 리스트 영역 -->
    <div class="cards-row">
      <div
        v-for="(post, idx) in highlightPosts"
        :key="idx"
        class="post-card"
      >
        <div class="thumb-area">
          <img
            v-if="post.imgUrl"
            class="thumb-img"
            :src="post.imgUrl"
            alt="post thumbnail"
          />
          <div
            v-else
            class="thumb-bg"
            :style="bgStyleFor(post.bgUrl)"
          >
            <img
              v-if="post.innerImgUrl"
              class="thumb-inner"
              :src="post.innerImgUrl"
            />
          </div>
        </div>

        <div class="card-body">
          <div class="card-title">
            {{ post.title }}
          </div>
          <div class="card-desc">
            {{ post.desc }}
          </div>

          <div class="metrics-row">
            <div class="metric">
              <span class="metric-text">👍 {{ formatNumber(post.likes) }}</span>
            </div>
            <div class="metric">
              <span class="metric-text">💬 {{ formatNumber(post.comments) }}</span>
            </div>
            <div class="metric hot">
              <span class="metric-text">{{ post.hotRate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색 + 페이지네이션 -->
    <div class="search-and-pagination">
      <div class="search-bar">
        <div class="primitive-button">
          <div class="primitive-span2">
            <div class="div20">제목 ▼</div>
          </div>
        </div>

        <div class="input">
          <input
            class="search-input-field"
            :value="searchKeyword"
            @input="$emit('update:searchKeyword', $event.target.value)"
            placeholder="검색어를 입력하세요"
          />
        </div>

        <button class="button-search" @click="$emit('search')">
          검색
        </button>
      </div>

      <Pagination
        v-model:page="internalPage"
        :total-pages="totalPages"
        class="custom-pagination-wrapper"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import Pagination from "./Pagination.vue";

const props = defineProps({
  highlightPosts: {
    type: Array,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  searchKeyword: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  "update:page",
  "update:searchKeyword",
  "search",
]);

// Pagination에 v-model:page 연결용 proxy
const internalPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  },
});

const formatNumber = (n) => {
  if (n === null || n === undefined) return "0";
  return Number(n).toLocaleString();
};

const bgStyleFor = (url) => {
  if (!url) return "";
  return `
    background: url('${url}') center;
    background-size: cover;
    background-repeat: no-repeat;
  `;
};
</script>

<style scoped>
.content-wrapper {
  width: 100%;
  position: relative;
  margin-top: 64px;
  padding-top: 16px;
  padding-bottom: 80px;
  background: transparent;
}

/* 상단 그라데이션 영역 */
.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 260px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.63) 0%,
    rgba(217, 217, 217, 0.63) 60%,
    rgba(115, 115, 115, 0.18) 100%
  );
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

/* 탭 */
.tabs-row {
  position: relative;
  width: 121px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 20px;
  color: #000;
}
.tab-item {
  cursor: pointer;
}
.tab-item.active {
  border-bottom: 1px solid #000;
}

/* 카드들 */
.cards-row {
  position: relative;
  margin-top: 24px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  gap: 24px;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 128px;
  flex-shrink: 0;
}

.post-card {
  background: #ffffff;
  border-radius: 8px;
  width: 255px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0,0,0,0.05);
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.thumb-area {
  width: 100%;
  height: 204px;
  background: #eee;
  position: relative;
  overflow: hidden;
}
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-bg {
  width: 100%;
  height: 100%;
  position: relative;
}
.thumb-inner {
  position: absolute;
  width: 100%;
  top: -40px;
  left: 0;
  object-fit: cover;
}

.card-body {
  background: #fff;
  padding: 16px 16px 12px;
  min-height: 151px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}
.card-title {
  color: #000;
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
}
.card-desc {
  color: #636363;
  font-size: 11px;
  line-height: 16px;
  font-weight: 400;
  margin-top: 12px;
  min-height: 48px;
}

/* 좋아요/댓글/핫율 */
.metrics-row {
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
  line-height: 16px;
  color: #4a5565;
}
.metric-text {
  font-size: 12px;
  line-height: 16px;
  color: #4a5565;
}
.metric.hot .metric-text {
  color: #4a5565;
}

/* 검색과 페이지네이션 블럭 */
.search-and-pagination {
  position: relative;
  margin: 32px auto 0;
  width: 896px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.search-bar {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  width: 100%;
  height: 36px;
}
.primitive-button {
  background: #f3f3f5;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0 12px;
  display: flex;
  align-items: center;
  min-width: 80px;
  height: 36px;
  font-size: 14px;
}
.primitive-span2 {
  display: flex;
  align-items: center;
  gap: 8px;
}
.div20 {
  color: #0a0a0a;
  font-size: 14px;
  line-height: 20px;
}
.input {
  background: #f3f3f5;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 4px 12px;
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
}
.search-input-field {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #0a0a0a;
}
.search-input-field::placeholder {
  color: #717182;
}
.button-search {
  background: #000;
  color: #fff;
  border-radius: 8px;
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 20px;
  border: none;
  cursor: pointer;
}

.custom-pagination-wrapper {
  align-self: flex-start;
}
</style>
