<template>
  <div id="review-board-page">
    <HeaderView />

    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>REVIEW COMMUNITY</h1>
        <p>당신의 경험을 공유해주세요</p>
      </div>
    </section>

    <main class="container">
      <div class="layout">
        <div class="main-col">
          <!-- 트렌딩 -->
          <section class="trending">
            <h2 class="section-title">지금 떠오르는 후기를 찾아보세요</h2>
            <div class="trend-row" v-if="trending.length">
              <article
                class="trend-card"
                v-for="t in trending"
                :key="t.num"
                @click="goDetail(t.num)"
              >
                <img :src="t._thumb || fallbackImage" alt="" @error="onImgError" />
                <div class="trend-title">{{ t.title }}</div>
              </article>
            </div>
            <div class="trend-row empty" v-else>트렌딩 후기가 없습니다.</div>
          </section>

          <!-- 탭 -->
          <section class="tabs">
            <button
              v-for="c in [{num:0, NAME:'전체'}, ...categories]"
              :key="c.num"
              class="tab"
              :class="{ active: activeCat === c.num }"
              @click="setCategory(c.num)"
            >
              {{ c.NAME }}
            </button>
            <button class="write-btn" @click="goWrite">글 작성</button>
          </section>

          <!-- 그리드 -->
          <section>
            <div v-if="loading" class="loading">불러오는 중...</div>
            <div v-else class="cards-grid">
              <article
                v-for="p in posts"
                :key="p.num"
                class="card"
                @click="goDetail(p.num)"
              >
                <div class="card-head">
                  <span v-if="p.good >= 200" class="badge">인기</span>
                  <span class="meta">{{ categoryName(p.review_category_num) }}</span>
                  <span class="meta dot">•</span>
                  <span class="meta date">{{ p._date }}</span>
                </div>
                <h3 class="title line-2">{{ p.title }}</h3>
                <div class="info">
                  <span class="author">@{{ p._author || '익명' }}</span>
                  <span class="spacer"></span>
                  <span class="stat">👍 {{ p.good }}</span>
                  <span class="stat">💬 {{ p._commentCount ?? 0 }}</span>
                </div>
                <img class="thumb" :src="p._thumb || fallbackImage" alt="" @error="onImgError" />
              </article>
            </div>

            <!-- 검색 + 페이지 -->
            <div class="search-bar">
              <input
                v-model.trim="searchTitle"
                placeholder="글제목을 입력해주세요"
                @keyup.enter="applySearch"
              />
              <button @click="applySearch">검색</button>
            </div>

            <nav v-if="totalPages > 1" class="pagination">
              <button :disabled="pageNum===1" @click="goPage(pageNum-1)">‹</button>
              <button
                v-for="p in pageList"
                :key="p"
                :class="{ active: pageNum===p }"
                @click="goPage(p)"
              >{{ p }}</button>
              <button :disabled="pageNum===totalPages" @click="goPage(pageNum+1)">›</button>
            </nav>
          </section>
        </div>

        <!-- 사이드 -->
        <aside class="side-col">
          <div class="side-box">
            <div class="side-title">후기</div>
            <ul class="hot-list">
              <li
                v-for="h in hotList"
                :key="h.num"
                @click="goDetail(h.num)"
              >
                <div class="hot-title line-1">{{ h.title }}</div>
                <div class="hot-meta">{{ h._author || '익명' }} · {{ h.good }} 좋아요</div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue';

// ===== json-server 절대 URL 사용 =====
const JSON_API = 'http://localhost:3001' // 너의 json-server 포트로 변경 가능
const J = axios.create({ baseURL: JSON_API })

// UI state
const loading = ref(false)
const posts = ref([])
const trending = ref([])
const hotList = ref([])
const categories = ref([])
const activeCat = ref(0)
const searchTitle = ref('')

// paging
const pageNum = ref(1)
const amount = ref(8)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / amount.value)))
const pageList = computed(() => {
  const max = totalPages.value, cur = pageNum.value
  const span = 2
  const from = Math.max(1, cur - span)
  const to = Math.min(max, cur + span)
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
})

const fallbackImage = '/images/placeholder-wide.jpg'
const onImgError = e => (e.target.src = fallbackImage)

// util: 집합 쿼리(다중 post_num)
const buildMultiParam = (key, arr) => arr.map(v => `${key}=${encodeURIComponent(v)}`).join('&')

// 카테고리명 맵
const categoryName = (num) => {
  if (!num) return '전체'
  const c = categories.value.find(c => c.num === num)
  return c?.NAME || '분류없음'
}

// 데이터 적재
const loadCategories = async () => {
  const { data } = await J.get('/Review_Category')
  categories.value = data
}

const loadTrending = async () => {
  // 좋아요 내림차순 상위 4
  const { data } = await J.get('/Review_Post', { params: { _sort: 'good', _order: 'desc', _limit: 4 } })
  const enriched = await enrichPosts(data)
  trending.value = enriched
}

const loadHotList = async () => {
  const { data } = await J.get('/Review_Post', { params: { _sort: 'good', _order: 'desc', _limit: 6 } })
  const enriched = await enrichPosts(data)
  hotList.value = enriched
}

const fetchPosts = async () => {
  loading.value = true
  try {
    // 목록 (카테고리/검색/페이지)
    const params = {
      _page: pageNum.value,
      _limit: amount.value,
      ...(activeCat.value ? { review_category_num: activeCat.value } : {}),
      ...(searchTitle.value ? { title_like: searchTitle.value } : {})
    }
    const res = await J.get('/Review_Post', { params })
    total.value = Number(res.headers['x-total-count'] || 0)
    posts.value = await enrichPosts(res.data)
  } finally {
    loading.value = false
  }
}

// 게시글 보강: 썸네일, 작성자명, 댓글수(옵션), 날짜(더미)
const enrichPosts = async (list) => {
  if (!list?.length) return []
  const ids = list.map(p => p.num)

  // 대표 이미지
  const photoRes = await J.get(`/Photo?photo_category_num=2&${buildMultiParam('post_num', ids)}`)
  const photoByPost = {}
  photoRes.data.forEach(ph => { if (!photoByPost[ph.post_num]) photoByPost[ph.post_num] = ph })

  // 작성자
  const memberIds = [...new Set(list.map(p => p.member_num))]
  const memberRes = await J.get(`/Member?${buildMultiParam('num', memberIds)}`)
  const memberById = Object.fromEntries(memberRes.data.map(m => [m.num, m]))

  // 댓글 수(선택)
  // json-server에 review_post_num 로 연결된 댓글이 있으므로 count 쿼리 흉내
  const commentRes = await J.get(`/Comment?${ids.map(id=>`review_post_num=${id}`).join('&')}`)
  const commentCount = {}
  commentRes.data.forEach(c => { commentCount[c.review_post_num] = (commentCount[c.review_post_num] || 0) + 1 })

  // 합성
  return list.map(p => ({
    ...p,
    _thumb: photoByPost[p.num]?.PATH,
    _author: memberById[p.member_num]?.NAME,
    _commentCount: commentCount[p.num] || 0,
    _date: '25.10.13' // 데모용 표시값(스냅샷과 형식 맞춤)
  }))
}

// 인터랙션
const setCategory = (num) => { activeCat.value = num; pageNum.value = 1; fetchPosts() }
const applySearch = () => { pageNum.value = 1; fetchPosts() }
const goPage = (p) => { pageNum.value = p; fetchPosts() }
const goWrite = () => { /* 라우터 연결: router.push('/review/write') 등 */ }
const goDetail = (num) => { /* 라우터 연결: router.push(`/review/${num}`) */ }

onMounted(async () => {
  await loadCategories()
  await Promise.all([loadTrending(), loadHotList()])
  await fetchPosts()
})
</script>

<style scoped>
/* (간략) 스냅샷과 비슷한 톤만 잡아둔 스타일—프로젝트 공통 CSS에 맞춰 조정하세요 */
.container { max-width: 1100px; margin: 0 auto; padding: 24px 16px; }
.layout { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }
.banner { position: relative; height: 220px; background: url('/images/review-hero.jpg') center/cover no-repeat; }
.banner-overlay { position:absolute; inset:0; background:rgba(0,0,0,.35); }
.banner-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:flex-start; color:#fff; padding-left:24px; }
.section-title { font-size:18px; font-weight:700; margin: 12px 0 10px; }
.trend-row { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.trend-card { border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,.06); cursor: pointer; }
.trend-card img { width:100%; height:120px; object-fit:cover; display:block; }
.trend-title { padding:10px; font-weight:600; font-size:14px; }
.tabs { display:flex; gap:8px; align-items:center; margin: 16px 0; flex-wrap: wrap; }
.tab { padding:6px 12px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; }
.tab.active { background:#111; color:#fff; border-color:#111; }
.write-btn { margin-left:auto; padding:6px 12px; border-radius:8px; background:#111; color:#fff; }
.cards-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.card { border:1px solid #eee; border-radius:14px; padding:14px; display:flex; flex-direction:column; gap:8px; cursor:pointer; background:#fff; }
.card .thumb { width:100%; height:160px; object-fit:cover; border-radius:10px; }
.card-head { display:flex; align-items:center; gap:8px; font-size:12px; color:#6b7280; }
.badge { background:#111; color:#fff; border-radius:6px; padding:2px 6px; font-size:11px; }
.meta.dot::before { content:''; }
.title { font-size:16px; font-weight:700; }
.line-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.info { display:flex; align-items:center; gap:10px; font-size:13px; color:#6b7280; }
.info .spacer { flex:1; }
.stat { background:#f5f5f5; padding:2px 6px; border-radius:6px; }
.side-col .side-box { position:sticky; top:20px; border:1px solid #eee; border-radius:12px; padding:14px; background:#fff; }
.side-title { font-weight:700; margin-bottom:8px; }
.hot-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.hot-title { font-size:14px; font-weight:600; }
.hot-meta { font-size:12px; color:#6b7280; }
.search-bar { display:flex; gap:8px; align-items:center; margin:16px 0; }
.search-bar input { flex:1; border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; }
.search-bar button { padding:8px 12px; border-radius:8px; background:#111; color:#fff; }
.pagination { display:flex; gap:6px; justify-content:center; margin:14px 0; }
.pagination button { min-width:32px; height:32px; border:1px solid #e5e7eb; background:#fff; border-radius:8px; }
.pagination button.active { background:#111; color:#fff; border-color:#111; }
.loading { padding:30px 0; text-align:center; color:#6b7280; }
</style>