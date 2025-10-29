<template>
  <div class="page-container">
    <HeaderView/>

    <div class="main-content-area">
      <!-- 배너 -->
      <div class="banner">
        <div class="banner-overlay"></div>
      </div>

      <div class="content-wrapper">
        <!-- 카드 그리드 -->
        <div class="cards-grid">
          <!-- 목록 -->
          <template v-if="!loading && posts.length">
            <div
              v-for="(post, idx) in posts"
              :key="post.num"
              class="community-card"
              @click="goDetail(post.num)"
              style="cursor:pointer"
            >
              <!-- 상단 컬러 스트립 -->
              <div class="card-topbar" :style="{ background: colorByTemp(temperature(post.good, post.cheer)) }"></div>

              <!-- '인기' 라벨 (온도 60% 이상 예시) -->
              <div v-if="temperature(post.good, post.cheer) >= 60" class="badge-hot">인기</div>

              <img
                :src="post._thumb || fallbackImage"
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
                    <span class="author-name">{{ post.memberName }}</span>
                  </div>

                  <div class="chip-temp">
                    {{ temperature(post.good, post.cheer) }}°
                  </div>
                </div>

                <div class="stat-row">
                  <div class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.333 2.667H4A1.333 1.333 0 0 0 2.667 4v9.333L8 10.667 13.333 13.333V4A1.333 1.333 0 0 0 12 2.667h-1.667Z" stroke="#4B5563" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>{{ post.good }}</span>
                  </div>
                  <div class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.667 1.333C2.985 1.333 0 4.318 0 8s2.985 6.667 6.667 6.667c3.682 0 6.666-2.985 6.666-6.667M16 3.333 8 11.333 5.333 8.667" stroke="#4B5563" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>{{ post.cheer }}</span>
                  </div>

                  <div class="pill">
                    {{ temperature(post.good, post.cheer) }}% 🔥
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- 로딩 -->
          <template v-else-if="loading">
            <div v-for="s in 8" :key="s" class="community-card skeleton">
              <div class="card-topbar"></div>
              <div class="card-image sk"></div>
              <div class="card-content">
                <div class="sk sk-title"></div>
                <div class="sk sk-meta"></div>
                <div class="sk sk-stat"></div>
              </div>
            </div>
          </template>

          <!-- 빈 상태 -->
          <template v-else>
            <div class="empty-state">
              게시글이 없습니다.
            </div>
          </template>
        </div>

        <!-- 사이드바 -->
        <aside class="sidebar">
          <div class="sidebar-header">
            <div class="sidebar-icon-container">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 10H17.5V17.5H12.5V10Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 17.5V5.833C2.5 5.398 2.676 4.981 2.988 4.668A1.667 1.667 0 0 1 4.167 4.167h5C9.616 4.167 10.033 4.356 10.345 4.668c.313.313.488.73.488 1.166V17.5H2.5Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="sidebar-title-container">
              <div class="sidebar-title-text">인기 게시물</div>
            </div>
            <span class="sidebar-badge">실시간</span>
          </div>

          <div class="sidebar-article-list">
            <div
              v-for="(article, idx) in sidebarPosts"
              :key="article.num ?? idx"
              class="sidebar-article-item"
              @click="goDetail(article.num)"
            >
              <div class="article-title-wrapper">
                <div class="article-title">{{ article.title }}</div>
              </div>
              <div class="article-meta">
                <div class="meta-author"><div class="meta-text">{{ article.memberName }}</div></div>
                <div class="meta-separator"><div class="meta-text">•</div></div>
                <div class="meta-time"><div class="meta-text">최신</div></div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      <!-- 글 작성 버튼 -->
      <div class="write-post-button" @click="goWrite">
        <div class="write-post-text">글 작성</div>
      </div>

      <!-- 검색 + 페이지네이션 -->
      <div class="pagination-container">
        <!-- 검색 -->
        <div class="search-row">
          <div class="search-bar">
            <!-- 드롭다운 -->
            <select v-model="searchType" class="search-select">
              <option value="TW">전체</option>
              <option value="T">제목</option>
              <option value="W">작성자</option>
            </select>

            <input
              v-model.trim="keyword"
              type="text"
              placeholder="검색어를 입력하세요"
              class="search-input"
              @keyup.enter="applySearch"
            />
          </div>

          <button class="search-btn" @click="applySearch">
            <span>검색</span>
          </button>
        </div>

        <!-- 페이지네이션 -->
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
      </div>
    </div>

    <FooterView/>
  </div>
</template>

<script setup>
import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()


const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해 주세요.')
      router.push('/')
    }
    return Promise.reject(err)
  }
)

/* ===== 상태 ===== */
const loading = ref(false)
const posts = ref([])
const sidebarPosts = ref([])
const pageNum  = ref(1)
const amount   = ref(8)
const totalPages = ref(1)
const pageMaker  = ref(null)

const keyword = ref('')
const searchType = ref('TW')   // '전체'

/* ===== (NEW) 사용자 인증 정보 ===== */
const memberId = ref(null)
const memberEmail = ref(null)
const memberState = ref(null)


/* ===== 이미지 유틸: DB의 로컬 파일 경로 → 브라우저 경로로 변환 =====
   예) path: C:/3rdProjectFE/public/images/fashion
       name: 334296f6-...-a0.png
   → /images/fashion/334296f6-...-a0.png
*/
const toPublicImageSrc = (path, name) => {
  if (!name) return null

  // 이미 절대 URL이면 그대로 사용
  if (/^https?:\/\//i.test(name)) return name

  // path에 'public' 구간이 있으면 그 뒤만 취해 웹 루트로 매핑
  if (path && /public[\\/]/i.test(path)) {
    const afterPublic = path.split(/public[\\/]/i).pop() || ''
    // 윈도우 백슬래시 → 슬래시
    const base = afterPublic.replaceAll('\\', '/').replace(/^\/+/, '')
    // 최종 브라우저 경로(중복 슬래시 정리)
    return (`/${base}/${name}`).replace(/\/+/g, '/')
  }

  // path가 이미 '/images/...' 형태면 그대로 결합
  if (path?.startsWith('/')) {
    return (`${path}/${name}`).replace(/\/+/g, '/')
  }

  // 그 외에는 기본 폴더를 가정
  return (`/images/fashion/${name}`).replace(/\/+/g, '/')
}

// photos에서 대표 썸네일 고르기: 게시글(카테고리 1) 우선, num 오름차순
const pickThumbFromPhotos = (photos = []) => {
  const byPost = photos
    .filter((p) => Number(p?.photoCategoryNum) === 1)
    .sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0))
  const byItem = photos
    .filter((p) => Number(p?.photoCategoryNum) !== 1)
    .sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0))
  const chosen = byPost[0] || byItem[0]

  // ⬇️ 백엔드 파일서버를 거치지 않고 정적 경로로 변환
  return chosen ? toPublicImageSrc(chosen.path, chosen.name) : null
}

// 썸네일 캐시
const thumbCache = new Map()

// 단일 글의 썸네일 로드 (상세 API에서 photos 메타만 받아와 로컬 정적 경로로 변환)
const loadThumbForPost = async (post) => {
  const key = Number(post?.num);
  if (!key) return null;
  if (thumbCache.has(key)) return thumbCache.get(key);

  try {
    const { data } = await api.get(`/manager-service/posts/fashion/${key}`)
    const thumb = pickThumbFromPhotos(data?.photos)
    thumbCache.set(key, thumb)
    return thumb
  } catch (e) {
    console.warn('썸네일 로딩 실패:', key, e)
    thumbCache.set(key, null)
    return null
  }
}

/* ===== 표시값 계산 ===== */
const fallbackImage = '/images/defaultimage.png' // public/images/fallback.png 있으면 사용, 없으면 바꿔주세요.
const temperature = (good = 0, cheer = 0) => {
  const g = Number(good) || 0
  const c = Number(cheer) || 0
  const sum = g + c
  if (!sum) return 0
  return Math.round((g / sum) * 100)
}
const isPopular = (post) => temperature(post.good, post.cheer) >= 60
const colorByTemp = (t) => (t <= 25 ? '#6A5BFF' : t <= 50 ? '#2E9BFF' : t <= 75 ? '#FF7A1A' : '#FF5F5F')

/* ===== 라우팅 ===== */
const goWrite = () => router.push({ name: 'registfashionpost' })
const goDetail = (num) => {
  if (!num) return
  router.push(`/fashionpost/${num}`)
}

/* ===== 데이터 로딩 ===== */
const fetchPosts = async () => {
  loading.value = true
  try {
    const params = { pageNum: pageNum.value, amount: amount.value }
    if (keyword.value) {
      params.type = searchType.value
      params.keyword = keyword.value
    }

    const { data } = await api.get('/manager-service/posts/fashion', { params })
    const list = Array.isArray(data?.list) ? data.list : []

    // 목록 세팅
    posts.value = list.map((p) => ({ ...p, _thumb: null }))

    // 썸네일 병렬 로딩 (정적 경로로 변환됨)
    const thumbs = await Promise.all(posts.value.map((p) => loadThumbForPost(p)))
    posts.value.forEach((p, i) => { p._thumb = thumbs[i] || null })

    // 페이지 정보
    pageMaker.value = data?.pageMaker ?? null
    const total = Number(pageMaker.value?.total ?? 0)
    totalPages.value = Math.max(1, Math.ceil(total / amount.value))
  } catch (e) {
    console.error('패션 게시글 조회 실패:', e)
    posts.value = []
    totalPages.value = 1
  } finally {
    loading.value = false
  }
}

const fetchSidebarPopular = async () => {
  try {
    const { data } = await api.get('/manager-service/posts/fashion', {
      params: { pageNum: 1, amount: 30 },
    })
    const list = Array.isArray(data?.list) ? data.list : []
    sidebarPosts.value = list.filter(isPopular).slice(0, 5)
  } catch (e) {
    console.error('사이드바 인기글 조회 실패:', e)
    sidebarPosts.value = []
  }
}

/* ===== 검색/페이지네이션 ===== */
const applySearch = () => { pageNum.value = 1; fetchPosts() }
const goPage = (p) => {
  if (p >= 1 && p <= totalPages.value && p !== pageNum.value) {
    pageNum.value = p
    fetchPosts()
  }
}

/* ===== onMounted ===== */
onMounted(async () => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    alert('로그인 후 이용해 주세요.')
    router.push('/')
    return
  }

  // (1) 예시대로: 인증 정보 확인 + 콘솔 출력
  try {
    const authRes = await axios.get('/api/member-service/member/auth', {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log('[member auth]', authRes)

    if (authRes?.data?.memberId == null) {
      router.push('/')
      return
    }

    memberId.value = authRes.data.memberId
    memberEmail.value = authRes.data.memberEmail
    memberState.value = authRes.data.memberState

    // 디버그 로그
    console.log('memberId:', memberId.value)
    console.log('memberEmail:', memberEmail.value)
    console.log('memberState:', memberState.value)
  } catch (e) {
    console.error('인증 정보 조회 실패:', e)
    router.push('/')
    return
  }

  // (2) 데이터 로딩
  await Promise.all([fetchPosts(), fetchSidebarPopular()])
})
</script>

<style scoped>
/* ===== 레이아웃 기본 ===== */
.page-container {
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}
.main-content-area {
  flex-grow: 1;
  width: 100%;
  padding: 20px 57px;
  box-sizing: border-box;
  position: relative;
}

/* ===== 배너 ===== */
.banner {
  width: calc(100% + 114px);
  height: 200px;
  margin: 0 -57px 24px -57px;
  background-image: url('/public/images/FashionBoardBanner.png');
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
  margin-top: 80px; 
}

/* ===== 카드 그리드 ===== */
.cards-grid {
  width: calc(100% - 232px - 20px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 8px;
}

/* ===== 카드 ===== */
.community-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  transition: transform .15s ease, box-shadow .15s ease;
}
.community-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,.10);
}
.card-topbar {
  height: 6px;
  width: 100%;
  background: #000;
}
.badge-hot {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #111827;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  z-index: 2;
}
.card-image {
  width: 100%;
  height: 168px;
  object-fit: cover;
  display: block;
}
.card-content {
  padding: 12px 12px 10px;
}
.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.meta-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color:#334155;
  font-size: 13px;
}
.author-name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chip-temp {
  background: #f3f4f6;
  color:#111827;
  font-weight:700;
  font-size:12px;
  padding: 4px 8px;
  border-radius: 999px;
}
.stat-row {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color:#4b5563;
  font-size: 13px;
}
.pill {
  margin-left: auto;
  font-size: 12px;
  background:#111827;
  color:#fff;
  padding: 4px 8px;
  border-radius: 999px;
}

/* 스켈레톤 */
.skeleton .sk { background: #f3f4f6; border-radius: 6px; }
.sk-title { height: 18px; width: 80%; margin-top: 8px; }
.sk-meta { height: 14px; width: 50%; margin-top: 8px; }
.sk-stat { height: 14px; width: 40%; margin-top: 10px; }

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 24px;
  color: #6b7280;
}

/* ===== 사이드바 ===== */
.sidebar {
  width: 232px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  padding: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
}
.sidebar-icon-container {
  width: 36px; height: 36px; padding: 8px; background: #111827; border-radius: 8px;
  display: flex; justify-content: center; align-items: center; box-sizing: border-box;
}
.sidebar-title-text { font-size: 16px; font-weight: 800; color:#111827; }
.sidebar-badge {
  margin-left: auto;
  font-size: 11px;
  color:#111827;
  background:#f3f4f6;
  border-radius: 999px;
  padding: 3px 8px;
}
.sidebar-article-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 420px;
  overflow-y: auto;
}
.sidebar-article-item {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background .15s ease;
}
.sidebar-article-item:hover { background: #f9fafb; }
.article-title { font-size: 13px; color:#0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left; }
.article-meta { margin-top: 4px; display:flex; align-items:center; gap:6px; }
.meta-text { color:#6b7280; font-size: 12px; }
.sidebar-more {
  margin-top: 10px;
  width: 100%;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 8px;
  height: 34px;
  font-size: 13px;
  cursor: pointer;
}

/* ===== 글작성 버튼 ===== */
.write-post-button {
  position: absolute;
  top: 235px;
  right: 310px;
  width: 92px; height: 36px;
  background: #111827;
  color:#fff;
  border-radius: 8px;
  display:flex; align-items:center; justify-content:center;
  cursor: pointer;
  z-index: 5;
}
.write-post-text { font-size:14px; }

/* ===== 검색/페이지네이션 ===== */
.pagination-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 16px;
  margin-bottom: 30px;
}
.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.search-bar {
  display: flex;
  align-items: center;
  background: #f6f6f8;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  min-width: 520px;
  height: 40px;
  gap: 10px;
}
.search-select {
  background: transparent;
  border: none;
  font-size: 14px;
  color: #111827;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.search-input {
  flex: 1; border: none; background: transparent; font-size: 14px; color:#374151;
}
.search-input:focus, .search-select:focus { outline: none; }
.search-btn {
  background: #111827; color:#fff; border:none; border-radius: 8px;
  min-width: 62px; height: 40px; padding: 0 14px; font-size: 14px; font-weight: 700; cursor:pointer;
}
.page-row {
  display:flex; align-items:center; gap: 8px; font-size: 14px; color:#222;
}
.arrow-btn {
  background: #fff; border: 1px solid #e5e7eb; color:#374151; cursor:pointer; padding: 6px 10px; border-radius: 8px;
}
.arrow-btn:disabled { opacity: .35; cursor: default; }
.page-num-btn {
  background:#fff; border: 1px solid #e5e7eb; color:#111827; cursor:pointer; padding: 6px 10px; min-width: 32px; border-radius: 8px;
}
.page-num-btn.active { background:#111827; color:#fff; border-color:#111827; }

/* 기타 */
.empty-div-placeholder { display: none; }
</style>