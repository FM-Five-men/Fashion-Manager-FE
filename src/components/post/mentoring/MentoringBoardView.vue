<template>
  <div class="page-container">
    <HeaderView/>

    <div class="main-content-area">
      <div class="banner" style="background-image: url('/images/MentoringBoardBanner.png');">
        <div class="banner-overlay"></div>
      </div>

      <div class="content-wrapper">
        <div class="cards-grid">
          <template v-if="!loading && posts.length">
            <div
              v-for="(post) in posts"
              :key="post.num"
              class="community-card"
              @click="goDetail(post.num)"
              style="cursor:pointer"
            >
              <div class="card-topbar" style="background: #6A5BFF;"></div>

              <img
                :src="fallbackImage"
                alt="게시글 이미지"
                class="card-image"
                @error="($event) => ($event.target.src = fallbackImage)"
              />

              <div class="card-content">
                <div class="card-title" :title="post.title">{{ post.title }}</div>

                <div class="meta-row">
                  <div class="author">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8c1.328 0 2.4-1.072 2.4-2.4S9.328 3.2 8 3.2 5.6 4.272 5.6 5.6 6.672 8 8 8Zm0 1.6c-1.94 0-5.333 0.971-5.333 2.8v0.933h10.666V12.4c0-1.829-3.393-2.8-5.333-2.8Z" stroke="#1E1E1E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="author-name">작성자 번호: {{ post.author_num }}</span>
                  </div>
                  <span class="chip-status" :class="{ finished: post.FINISH === 1 }">
                      {{ post.FINISH === 1 ? '마감' : '모집중' }}
                   </span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="loading">
            <div v-for="s in 12" :key="s" class="community-card skeleton"> {/* amount 값과 일치 */}
              <div class="card-topbar"></div>
              <div class="card-image sk"></div>
              <div class="card-content">
                <div class="sk sk-title"></div>
                <div class="sk sk-meta"></div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="empty-state">
              게시글이 없습니다.
            </div>
          </template>
        </div>

        </div>

      <div class="write-post-button" @click="goWrite">
        <div class="write-post-text">글 작성</div>
      </div>

      <div class="pagination-container">
        <div class="search-row">
          <div class="search-bar">
            <input
              v-model.trim="keyword"
              type="text"
              placeholder="제목 또는 내용 검색"
              class="search-input"
              @keyup.enter="applySearch"
            />
          </div>
          <button class="search-btn" @click="applySearch">
            <span>검색</span>
          </button>
        </div>

        <div class="page-row" v-if="totalPages > 1">
          <button
            class="arrow-btn"
            :disabled="pageNum === 1"
            @click="goPage(pageNum - 1)"
            aria-label="이전"
          >‹</button>

          <button
            v-for="p in totalPages"
            :key="p"
            class="page-num-btn"
            :class="{ active: pageNum === p }"
            @click="goPage(p)"
          >{{ p }}</button>

          <button
            class="arrow-btn"
            :disabled="pageNum === totalPages"
            @click="goPage(pageNum + 1)"
            aria-label="다음"
          >›</button>
        </div>
      </div> {/* pagination-container 끝 */}
    </div> {/* main-content-area 끝 */}

    <FooterView/>
  </div> {/* page-container 끝 */}
</template>

<script setup>
import HeaderView from '../../HeaderView.vue' // 경로 확인 필요
import FooterView from '../../FooterView.vue' // 경로 확인 필요
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

/* ================== axios 인스턴스 (json-server용 baseURL) ================== */
const api = axios.create({
  baseURL: 'http://localhost:3000', // json-server 주소
})

/* ===== 상태 ===== */
const loading = ref(false)
const posts = ref([])
const pageNum = ref(1)
const amount = ref(12); // <-- 페이지당 게시글 수를 12로 변경
const totalPages = ref(1)
const totalCount = ref(0)

const keyword = ref('')

/* ===== 기본 이미지 ===== */
const fallbackImage = '/images/defaultimage.png' // public 폴더 기준

/* ===== 라우팅 ===== */
const goWrite = () => router.push({ name: 'registMentoringPost' }) // 경로 확인
const goDetail = (num) => {
  if (!num) return
  router.push(`/mentoringpost/${num}`) // 경로 확인
}

/* ============ 데이터 불러오기 (json-server용) ============ */
const fetchMentoringPosts = async () => {
  loading.value = true
  try {
    const params = {
      _page: pageNum.value,
      _limit: amount.value,
      _sort: 'num',
      _order: 'desc',
    }
    if (keyword.value) {
      params.q = keyword.value
    }

    const response = await api.get('/Mentoring_Post', { params })

    posts.value = Array.isArray(response.data) ? response.data : []

    totalCount.value = Number(response.headers['x-total-count'] || 0)
    totalPages.value = Math.max(1, Math.ceil(totalCount.value / amount.value))

  } catch (e) {
    console.error('멘토링 게시글 조회 실패:', e)
    posts.value = []
    totalPages.value = 1
    totalCount.value = 0
  } finally {
    loading.value = false
  }
}

/* ===== 검색/페이지네이션 ===== */
const applySearch = () => { pageNum.value = 1; fetchMentoringPosts() }
const goPage = (p) => {
  if (p >= 1 && p <= totalPages.value && p !== pageNum.value) {
    pageNum.value = p
    fetchMentoringPosts()
  }
}

/* ===== onMounted ===== */
onMounted(async () => {
  await fetchMentoringPosts()
})
</script>

<style scoped>
/* ===== 레이아웃 기본 ===== */
.page-container {
  width: 1440px; /* 필요시 디자인에 맞게 조정 */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}
.main-content-area {
  flex-grow: 1;
  width: 100%;
  padding: 20px 57px; /* 필요시 조정 */
  box-sizing: border-box;
  position: relative;
}

/* ===== 배너 ===== */
.banner {
  width: calc(100% + 114px); /* 양쪽 패딩만큼 확장 */
  height: 200px; /* 필요시 조정 */
  margin: 0 -57px 24px -57px; /* 패딩 상쇄 및 하단 마진 */
  /* background-image 는 template에서 인라인 스타일로 설정 */
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,0) 100%);
}

/* ===== 본문 ===== */
.content-wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 28px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

/* ===== 카드 그리드 ===== */
.cards-grid {
  width: 100%; /* 사이드바 없을 경우 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(236px, 1fr)); /* 너비에 맞춰 자동 배치 */
  gap: 16px;
  margin-top: 8px;
  justify-content: center; /* 카드들을 중앙 정렬 (옵션) */
}

/* ===== 카드 (크기 수정됨) ===== */
.community-card {
  width: 236px; /* 너비 고정 */
  height: 211px; /* 높이 고정 */
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  transition: transform .15s ease, box-shadow .15s ease;
  display: flex;
  flex-direction: column;
}
.community-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,.10);
}
.card-topbar {
  height: 6px;
  width: 100%;
  flex-shrink: 0;
}
.card-image {
  width: 100%;
  height: 100px; /* 이미지 높이 조절 */
  object-fit: cover;
  display: block;
  background-color: #f3f4f6;
  flex-shrink: 0;
}
.card-content {
  padding: 10px 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 제목과 메타정보 사이 공간 최대화 */
}
.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  height: 39px; /* 두 줄 높이 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 6px; /* 아래쪽 여백 */
}
.meta-row {
  margin-top: auto; /* 제목 아래 남은 공간 밀어내고 맨 아래 배치 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color:#334155;
  font-size: 12px;
}
.author-name {
   max-width: 120px; /* 이름 최대 너비 제한 */
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   display: inline-block;
   vertical-align: middle;
 }
.chip-status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  font-weight: 500;
  background-color: #e0f2fe; /* 모집중 */
  color: #0c4a6e;
}
.chip-status.finished {
  background-color: #f3f4f6; /* 마감 */
  color: #4b5563;
}

/* 스켈레톤 */
.skeleton .card-image.sk { height: 100px; }
.sk-title { height: 16px; width: 80%; margin-bottom: 6px; background: #f3f4f6; border-radius: 4px; }
.sk-meta { height: 12px; width: 60%; background: #f3f4f6; border-radius: 4px; margin-top: auto; }
.skeleton .card-content { justify-content: flex-start; } /* 스켈레톤은 위에서부터 채움 */


.empty-state {
  grid-column: 1 / -1; /* 그리드 전체 너비 차지 */
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
  font-size: 15px;
}

/* ===== 글작성 버튼 ===== */
.write-post-button {
  position: absolute;
  top: 235px; /* 배너 높이 등 고려하여 위치 조정 */
  right: 57px;  /* 페이지 오른쪽 패딩 고려 */
  width: 92px; height: 36px;
  background: #111827;
  color:#fff;
  border-radius: 8px;
  display:flex; align-items:center; justify-content:center;
  cursor: pointer;
  z-index: 5;
  font-size: 14px;
}

/* ===== 검색/페이지네이션 ===== */
.pagination-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 32px; /* 카드 그리드와 간격 조정 */
  margin-bottom: 30px;
}
.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px; /* 페이지네이션과의 간격 조정 */
}
.search-bar {
  display: flex;
  align-items: center;
  background: #f6f6f8;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  width: 400px; /* 검색창 너비 조정 */
  height: 40px;
}

.search-input {
  flex: 1; border: none; background: transparent; font-size: 14px; color:#374151;
}
.search-input:focus { outline: none; }
.search-btn {
  background: #111827; color:#fff; border:none; border-radius: 8px;
  min-width: 62px; height: 40px; padding: 0 14px; font-size: 14px; font-weight: 700; cursor:pointer;
}

/* 페이지네이션 버튼 스타일 (FashionBoardView.vue 참고) */
.page-row {
  display:flex; align-items:center; gap: 8px; font-size: 14px; color:#222; margin-top: 10px;
}
.arrow-btn {
  background: #fff; border: 1px solid #e5e7eb; color:#374151; cursor:pointer; padding: 6px 10px; border-radius: 8px; line-height: 1; /* 아이콘 수직 정렬 */
}
.arrow-btn:disabled { opacity: .35; cursor: default; }
.page-num-btn {
  background:#fff; border: 1px solid #e5e7eb; color:#111827; cursor:pointer; padding: 6px 10px; min-width: 32px; border-radius: 8px; text-align: center;
}
.page-num-btn.active { background:#111827; color:#fff; border-color:#111827; font-weight: 700; }

/* 기타 불필요 요소 숨김 */
.empty-div-placeholder, .empty-div { display: none; }
</style>