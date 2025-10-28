<template>
  <div data-layer="인플루언서 회원 목록 페이지" class="canvas">
    <!-- 헤더를 별도 래퍼로 감싸서 강제로 캔버스 폭/정렬 유지 -->
    <header class="header-wrapper">
      <HeaderView />
    </header>

    <!-- 본문 콘텐츠 -->
    <main class="content">
      <!-- 제목 / 설명 영역 -->
      <section class="title">
        <h2>인플루언서 스포트라이트</h2>
        <p class="subtitle">패션 세계를 만들어가는 트렌드세터를 팔로우하세요</p>
      </section>

      <!-- 카드 영역 + 버튼을 감싸는 래퍼 -->
      <div class="grid-wrapper">
        <div class="grid-inner">
          <!-- 🔥 오른쪽 상단 인플루언서 페이지 버튼 -->
          <!-- <button class="page-btn" @click="goToPageManage">
            + 페이지
          </button> -->

          <!-- 실제 카드들 -->
          <section v-if="!loading && !error" class="grid">
            <InfluencerCard
              v-for="item in pagedList"
              :key="item.num"
              :item="item"
            />
          </section>

          <!-- 로딩/에러 상태 표시 -->
          <div v-if="loading" class="state">불러오는 중...</div>
          <div v-if="error" class="state error">{{ error }}</div>

          <!-- ✅ 신청하기 버튼 -->
          <!-- <button class="apply-btn" @click="goToApplyPage">
            + 신청하기
          </button> -->
        </div>
      </div>
    </main>

    <!-- 페이지네이션 -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="changePage"
      @search="onSearch"
    />

    <footer class="footer-wrapper">
      <FooterView />
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'
import Pagination from '../02_ui/Pagination.vue'
import InfluencerCard from '../02_ui/InfluencerCard.vue'

const API_URL  = '/api/manager-service/influencerPage/selectInfluencerPage'
const FILE_BASE = '/api/manager-service'
const LOCAL_BASE_MAIN = '/images/influencer_page'
const LOCAL_BASE_FALLBACK = '/images/influencerList'

const loading = ref(true)
const error = ref('')
const router = useRouter()

const pages = ref([])
const currentPage = ref(1)
const pageSize = 8
const searchCondition = ref({ type: 'all', keyword: '' })


// ✅ 인플루언서 페이지 버튼 클릭 시
function goToPageManage() {
  router.push('/influencerregistpage') // 이동할 실제 경로에 맞게 수정
}

// 신청하기 버튼 클릭 시
function goToApplyPage() {
  router.push('/influencerapply')
}

// 서버 이미지 URL 정리
function makeServerFileUrl(p) {
  if (!p) return null
  if (/^https?:\/\//i.test(p)) return p
  const clean = p.startsWith('/') ? p : `/${p}`
  return `${FILE_BASE}${clean}`
}

// 백엔드 데이터 매핑
function mapItem(raw, idx) {
  const gallery = Array.isArray(raw.photoPaths)
    ? raw.photoPaths.map(makeServerFileUrl)
    : []
  const serverThumb = gallery[0] || null
  const n = (idx % 8) + 1
  const localMain = `${LOCAL_BASE_MAIN}/influencerImg${n}.png`
  const localBackup = `${LOCAL_BASE_FALLBACK}/influencerImg${n}.png`

  return {
    num: raw.pageNum,
    memberNum: raw.memberNum,
    title: raw.title,
    content: raw.content,
    memberName: raw.memberName,
    thumbnailUrl: serverThumb || localMain || localBackup,
  }
}

  /* 인플루언서 에서 그냥 member 로 호출해버림 */
  async function fetchList() {
    loading.value = true
    error.value = ''

    try {
      // 1) 인플루언서 페이지 목록
      const pageRes = await axios.get('/api/manager-service/influencerPage/selectInfluencerPage')
      const rawPages = Array.isArray(pageRes.data)
        ? pageRes.data
        : (pageRes.data?.data ?? [])

      // 2) 멤버 전체 목록
      const memberRes = await axios.get('/api/member-service/member/list')   /* 이부분 */
      const members = Array.isArray(memberRes.data) ? memberRes.data : []

      // 3) memberNum -> user 객체 매핑 테이블 만들기
      const memberMap = {}
      members.forEach(m => {
        memberMap[m.userNum] = m
      })

      // 4) 페이지 목록에 userName 덮어쓰기
      const merged = rawPages.map(p => {
        const owner = memberMap[p.memberNum]
        return {
          ...p,
          memberName: owner?.userName || p.memberName, // ← 여기! 이제 "김패션" 고정 아님
          userEmail: owner?.userEmail || null,
          badges: owner?.badges || [],
        }
      })

      // 5) 기존 mapItem 로직(썸네일 등 가공) 적용
      pages.value = merged.map((it, i) => mapItem(it, i))

    } catch (err) {
      console.error('fetchList 실패:', err)
      error.value = '페이지 정보를 불러오지 못했습니다.'
    } finally {
      loading.value = false
    }
  }

const filteredPages = computed(() => {
  const { type, keyword } = searchCondition.value
  const k = keyword.trim().toLowerCase()
  if (!k) return pages.value

  return pages.value.filter(item => {
    if (type === 'all') {
      return (
        item.title?.toLowerCase().includes(k) ||
        item.content?.toLowerCase().includes(k) ||
        item.memberName?.toLowerCase().includes(k)
      )
    }
    if (type === 'name') return item.memberName?.toLowerCase().includes(k)
    if (type === 'content') return item.content?.toLowerCase().includes(k)
    return true
  })
})

const totalPages = computed(() => Math.ceil(filteredPages.value.length / pageSize) || 1)
const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPages.value.slice(start, start + pageSize)
})

function changePage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

function onSearch({ type, keyword }) {
  searchCondition.value = { type, keyword }
  currentPage.value = 1
}

onMounted(() => {
  fetchList()
})
</script>

<style scoped>
/* ====== 페이지 상단 공통 ====== */
.canvas {
  width: 1440px;
  min-height: 100vh;
  background: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* 콘텐츠 영역 */
.content {
  width: min(1200px, 92vw);
  margin: 0 auto;
  padding: 28px 0 56px;
  flex: 1 1 auto;
}

/* 제목 */
.title {
  text-align: center;
  padding: 60px 0 20px 0;
}
.title h2 {
  font-size: 28px;
  font-weight: 800;
  color: #111;
}
.subtitle {
  font-size: 14px;
  color: #666;
}

/* 카드 그리드 */
.grid-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.grid-inner {
  position: relative;
  display: inline-block;
  padding-bottom: 48px;
}

/* ✅ 인플루언서 페이지 버튼 (오른쪽 상단 고정) */
.page-btn {
  position: absolute;
  top: -52px; /* 제목 아래 여백 기준 위쪽에 붙도록 */
  right: 0;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 16px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}
.page-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 그리드 카드 */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 246px);
  justify-content: center;
  gap: 20px 20px;
}

/* 신청하기 버튼 (아래 고정) */
.apply-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: opacity .15s ease;
}
.apply-btn:hover {
  opacity: 0.85;
}

.header-wrapper {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
}

.header-wrapper :deep(header),
.header-wrapper :deep(.header) {
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  left: 0 !important;
  right: 0 !important;
}

</style>
