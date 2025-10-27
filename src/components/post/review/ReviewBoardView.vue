<template>
  <div id="review-board-page">
    <HeaderView />

    <!-- Hero Banner -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>REVIEW COMMUNITY</h1>
        <p>당신의 경험을 공유해주세요</p>
      </div>
    </section>

    <main class="container">
      <div class="layout">
        <!-- LEFT: trending + grid -->
        <section class="main-col">
          <!-- Trending -->
          <h2 class="section-title">지금 떠오르는 후기를 찾아보세요</h2>
          <div class="trend-row" v-if="trending.length">
            <article
              class="trend-card"
              v-for="t in trending"
              :key="`trend-${t.num}`"
              @click="goDetail(t.num)"
            >
              <img :src="t._thumb || fallbackImage" alt="" @error="onImgError" />
              <div class="trend-grad"></div>
              <div class="trend-title line-2">{{ t.title }}</div>
            </article>
          </div>
          <div v-else class="muted">트렌딩 후기가 없습니다.</div>

          <!-- Tabs + Write -->
          <div class="tabs">
            <div class="tab-wrap">
              <button
                v-for="c in [{num:0, NAME:'전체'}, ...categories]"
                :key="`cat-${c.num}`"
                class="tab"
                :class="{ active: activeCat === c.num }"
                @click="setCategory(c.num)"
              >
                {{ c.NAME }}
              </button>
            </div>
            <button class="write-btn" @click="goWrite">글 작성</button>
          </div>

          <!-- Cards grid -->
          <div v-if="loading" class="loading">불러오는 중…</div>
          <div v-else class="cards-grid">
            <article
              v-for="p in posts"
              :key="p.num"
              class="card"
              @click="goDetail(p.num)"
            >
              <div class="card-top">
                <span class="pill">{{ categoryName(p.review_category_num) }}</span>
                <span class="dot">·</span>
                <span class="date">{{ formatDate(p._createdAt) }}</span>
                <span class="hot" v-if="p.good >= 200">인기</span>
              </div>

              <h3 class="title line-2">{{ p.title }}</h3>

              <div class="author-row">
                <div class="author">@{{ p._author || '익명' }}</div>
                <div class="rating">
                  <span v-for="i in 5" :key="i" class="star" :class="{ on: i <= Math.round(p._rating) }">★</span>
                  <span class="rating-num">{{ Number(p._rating || 0).toFixed(1) }}</span>
                </div>
              </div>

              <img class="thumb" :src="p._thumb || fallbackImage" alt="" @error="onImgError" />

              <div class="stats">
                <span>👍 {{ p.good || 0 }}</span>
                <span>💬 {{ p._commentCount || 0 }}</span>
                <span>👁 {{ p._views || 0 }}</span>
              </div>
            </article>
          </div>

          <!-- Search + pagination -->
          <div class="search-bar">
            <select v-model="searchField">
              <option value="title">제목</option>
            </select>
            <input
              v-model.trim="searchTitle"
              placeholder="검색어를 입력해주세요"
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

        <!-- RIGHT: sidebar -->
        <aside class="side-col">
          <div class="side-box">
            <div class="side-title">후기</div>
            <ul class="hot-list">
              <li
                v-for="h in hotList"
                :key="`hot-${h.num}`"
                @click="goDetail(h.num)"
              >
                <div class="hot-title line-1">{{ h.title }}</div>
                <div class="hot-meta">
                  {{ h._author || '익명' }} · {{ timeAgo(h._createdAt) }}
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>

    <footer class="site-footer">
      <div class="inner">
        <div>FASHION MANAGER</div>
        <div class="links">
          <a>소개</a><a>커뮤니티</a><a>가이드라인</a><a>문의</a>
        </div>
        <small>© 2025 Fashion Manager Project. All rights reserved.</small>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue';

// ---- json-server 절대 URL
const JSON_API = 'http://localhost:3000'
const J = axios.create({ baseURL: JSON_API })

// state
const loading = ref(false)
const posts = ref([])
const trending = ref([])
const hotList = ref([])
const categories = ref([])
const activeCat = ref(0)
const searchTitle = ref('')
const searchField = ref('title')

// paging
const pageNum = ref(1)
const amount = ref(8)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / amount.value)))
const pageList = computed(() => {
  const max = totalPages.value, cur = pageNum.value, span = 2
  const from = Math.max(1, cur - span), to = Math.min(max, cur + span)
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
})

const fallbackImage = '/images/defaultimage.png'
const onImgError = e => (e.target.src = fallbackImage)

// helpers
const buildMultiParam = (key, arr) => arr.map(v => `${key}=${encodeURIComponent(v)}`).join('&')

const formatDate = iso => {
  try { const d = new Date(iso); return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}` } catch { return '' }
}
const timeAgo = iso => {
  if (!iso) return ''
  const ms = Date.now() - new Date(iso).getTime()
  const m = Math.floor(ms / 60000), h = Math.floor(m/60), d = Math.floor(h/24)
  if (d > 0) return `${d}일 전`
  if (h > 0) return `${h}시간 전`
  if (m > 0) return `${m}분 전`
  return '방금 전'
}

const categoryName = num => {
  if (!num) return '전체'
  return categories.value.find(c => c.num === num)?.NAME || '분류'
}

// data loads
const loadCategories = async () => {
  const { data } = await J.get('/Review_Category')
  categories.value = data
}

const enrichPosts = async (list) => {
  if (!list?.length) return []
  const ids = list.map(p => p.num)
  const memberIds = [...new Set(list.map(p => p.member_num))]

  // 대표 이미지
  const photoRes = await J.get(`/Photo?photo_category_num=2&${buildMultiParam('post_num', ids)}`)
  const photoByPost = {}
  photoRes.data.forEach(ph => { if (!photoByPost[ph.post_num]) photoByPost[ph.post_num] = ph })

  // 작성자
  const memberRes = await J.get(`/Member?${buildMultiParam('num', memberIds)}`)
  const memberById = Object.fromEntries(memberRes.data.map(m => [m.num, m]))

  // 댓글 개수
  const commentRes = await J.get(`/Comment?${ids.map(id=>`review_post_num=${id}`).join('&')}`)
  const counts = {}
  commentRes.data.forEach(c => { counts[c.review_post_num] = (counts[c.review_post_num] || 0) + 1 })

  return list.map(p => ({
    ...p,
    _thumb: photoByPost[p.num]?.PATH,
    _author: memberById[p.member_num]?.NAME,
    _commentCount: counts[p.num] || 0,
    _views: p.views ?? 0,
    _rating: p.rating ?? 0,
    _createdAt: p.created_at || new Date().toISOString()
  }))
}

const loadTrending = async () => {
  // 좋아요 desc 상위 4 → 스샷의 상단 카드
  const { data } = await J.get('/Review_Post', { params: { _sort: 'good', _order: 'desc', _limit: 4 } })
  trending.value = await enrichPosts(data)
}

const loadHotList = async () => {
  // 최신 순 상위 6
  const { data } = await J.get('/Review_Post', { params: { _sort: 'created_at', _order: 'desc', _limit: 6 } })
  hotList.value = await enrichPosts(data)
}

const fetchPosts = async () => {
  loading.value = true
  try {
    const params = {
      _page: pageNum.value, _limit: amount.value,
      _sort: 'created_at', _order: 'desc',
      ...(activeCat.value ? { review_category_num: activeCat.value } : {}),
      ...(searchTitle.value ? { [`${searchField.value}_like`]: searchTitle.value } : {})
    }
    const res = await J.get('/Review_Post', { params })
    total.value = Number(res.headers['x-total-count'] || 0)
    posts.value = await enrichPosts(res.data)
  } finally { loading.value = false }
}

// interactions
const setCategory = (num) => { activeCat.value = num; pageNum.value = 1; fetchPosts() }
const applySearch = () => { pageNum.value = 1; fetchPosts() }
const goPage = (p) => { pageNum.value = p; fetchPosts() }
const goWrite = () => { /* router.push('/review/write') */ }
const goDetail = (num) => { /* router.push(`/review/${num}`) */ }

onMounted(async () => {
  await loadCategories()
  await Promise.all([loadTrending(), loadHotList()])
  await fetchPosts()
})
</script>

<style scoped>
/* layout */
.container { max-width: 1160px; margin: 0 auto; padding: 24px 16px; }
.layout { display: grid; grid-template-columns: 1fr 300px; gap: 24px; }

/* banner */
.banner { position:relative; height: 260px; background:#999 url('/images/review-hero.jpg') center/cover no-repeat; border-bottom: 1px solid #e5e7eb; }
.banner-overlay { position:absolute; inset:0; background:rgba(0,0,0,.35); }
.banner-text { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; color:#fff; padding-left:28px; }
.banner-text h1 { font-size:42px; font-weight:800; letter-spacing:.5px; margin-bottom:4px; }
.banner-text p { opacity:.9; }

/* trending */
.section-title { font-weight:700; margin: 18px 0 12px; }
.trend-row { display:grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.trend-card { position:relative; height:140px; border-radius:14px; overflow:hidden; cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,.08); }
.trend-card img { width:100%; height:100%; object-fit:cover; display:block; }
.trend-grad { position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 100%); }
.trend-title { position:absolute; left:10px; right:10px; bottom:10px; color:#fff; font-weight:700; font-size:14px; }
.muted { color:#6b7280; }

/* tabs */
.tabs { display:flex; align-items:center; gap:12px; margin: 16px 0; }
.tab-wrap { display:flex; gap:8px; flex-wrap:wrap; }
.tab { padding:7px 12px; border-radius:999px; border:1px solid #e5e7eb; background:#fff; font-size:14px; }
.tab.active { background:#111; color:#fff; border-color:#111; }
.write-btn { margin-left:auto; padding:8px 14px; border-radius:10px; background:#111; color:#fff; }

/* grid */
.cards-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { border:1px solid #eee; border-radius:14px; padding:14px; background:#fff; cursor:pointer; transition: box-shadow .2s; }
.card:hover { box-shadow: 0 6px 18px rgba(0,0,0,.08); }
.card-top { display:flex; align-items:center; gap:8px; color:#6b7280; font-size:12px; }
.pill { background:#111; color:#fff; border-radius:6px; padding:2px 6px; font-size:11px; }
.dot { color:#d1d5db; }
.hot { margin-left:auto; background:#fde68a; color:#92400e; padding:2px 6px; border-radius:6px; font-size:11px; }
.title { font-size:16px; font-weight:700; margin:8px 0; min-height:40px; }
.line-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.author-row { display:flex; align-items:center; justify-content:space-between; }
.author { color:#6b7280; font-size:13px; }
.rating { display:flex; align-items:center; gap:4px; }
.star { font-size:14px; color:#e5e7eb; }
.star.on { color:#f59e0b; }
.rating-num { font-size:12px; color:#6b7280; }
.thumb { width:100%; height:160px; object-fit:cover; border-radius:10px; margin:10px 0; }
.stats { display:flex; gap:12px; color:#6b7280; font-size:13px; }

/* search & pagination */
.search-bar { display:flex; gap:8px; align-items:center; margin:16px 0; }
.search-bar select, .search-bar input { border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; }
.search-bar input { flex:1; }
.search-bar button { padding:8px 12px; border-radius:8px; background:#111; color:#fff; }
.pagination { display:flex; gap:6px; justify-content:center; margin:16px 0; }
.pagination button { min-width:32px; height:32px; border:1px solid #e5e7eb; background:#fff; border-radius:8px; }
.pagination button.active { background:#111; color:#fff; border-color:#111; }

/* sidebar */
.side-col .side-box { position:sticky; top:20px; border:1px solid #eee; border-radius:12px; padding:14px; background:#fff; }
.side-title { font-weight:700; margin-bottom:10px; }
.hot-list { display:flex; flex-direction:column; gap:10px; }
.hot-title { font-size:14px; font-weight:600; }
.hot-meta { font-size:12px; color:#6b7280; }

/* etc */
.loading { padding:28px 0; text-align:center; color:#6b7280; }

@media (max-width: 1024px) {
  .layout { grid-template-columns: 1fr; }
  .cards-grid { grid-template-columns: repeat(2, 1fr); }
  .side-col { order: -1; }
}
</style>