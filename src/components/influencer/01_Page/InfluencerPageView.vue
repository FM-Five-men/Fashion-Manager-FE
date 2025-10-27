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

      <!-- 카드 영역 + 신청하기 버튼을 한 덩어리로 감싸는 래퍼 -->
      <div class="grid-wrapper">
        <div class="grid-inner">
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
          <button class="apply-btn" @click="goToApplyPage">
            + 인플루언서 신청하기
          </button>
        </div>
      </div>
    </main>

    <!-- ✅ [새로 추가된 영역] 페이지네이션 / 검색 / 신청하기 UI
         - Pagination.vue 컴포넌트 사용
         - currentPage / totalPages 는 부모->자식으로 내려가는 props
         - @update:page / @search / @apply 는 자식->부모 emit
  -->
    <!-- 🔥🔥🔥 검색 & 페이지네이션을 '맨 아래'에 둠 -->
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

const loading = ref(true);
const error = ref('');

const router = useRouter();

// 전체 데이터 (백엔드 전체 리스트)
const pages = ref([]);

// 페이지네이션/검색 상태
const currentPage = ref(1);
const pageSize = 8;
const searchCondition = ref({ type: 'all', keyword: '' });

// 신청하기 버튼 눌렀을 때 이동
function goToApplyPage() {
  router.push('/influencerapply')
}

// 서버 이미지 경로 변환
function makeServerFileUrl(p) {
  if (!p) return null
  if (/^https?:\/\//i.test(p)) return p
  const clean = p.startsWith('/') ? p : `/${p}`
  return `${FILE_BASE}${clean}`
}

// 서버에서 받은 데이터 -> 카드 데이터 형태로 매핑
function mapItem(raw, idx) {
  // 1) 백엔드에서 내려오는 photoPaths 배열을 꺼냄
  //    예: ["/images/influencer_page/38510e30-....jpg"]
  const gallery = Array.isArray(raw.photoPaths)
    ? raw.photoPaths.map(makeServerFileUrl) // ↓ makeServerFileUrl 로 FILE_BASE 붙여 절대경로화
    : []

  // 2) 서버가 실제로 업로드/리네임한 첫 번째 이미지를 1순위 썸네일로 사용
  //    예: "/api/manager-service/images/influencer_page/38510e30-....jpg"
  const serverThumb = gallery[0] || null

  // 3) 서버 이미지가 없을 경우를 대비해서, 로컬 기본 썸네일 경로를 준비
  //    idx 기반으로 influencerImg1.png ~ influencerImg8.png 순환
  const n = (idx % 8) + 1

  //    ✅ 여기서 LOCAL_BASE_MAIN 경로도 snake_case 폴더명을 사용
  //    예: "/images/influencer_page/influencerImg3.png"
  const localMain = `${LOCAL_BASE_MAIN}/influencerImg${n}.png`

  //    마지막 최후의 폴백
  const localBackup = `${LOCAL_BASE_FALLBACK}/influencerImg${n}.png`

  return {
    num: raw.num,
    memberNum: raw.memberNum,
    title: raw.title,
    content: raw.content,
    memberName: raw.memberName,

    // 4) 우선순위:
    //    (1) 서버 업로드 썸네일 (백엔드에서 rename된 실제 파일)
    //    (2) snake_case 경로의 기본 로컬 샘플 이미지
    //    (3) fallback 폴더 이미지
    thumbnailUrl: serverThumb || localMain || localBackup,
  }
}


// 이미지 깨졌을 때 폴백
function onImgError(item) {
  const current = item.thumbnailUrl
  if (current?.startsWith(LOCAL_BASE_MAIN)) {
    // -> fallback 시도
    item.thumbnailUrl = current.replace(LOCAL_BASE_MAIN, LOCAL_BASE_FALLBACK)
    return
  }
  item.thumbnailUrl = null
}

// 전체 리스트 호출
async function fetchList() {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get(API_URL)

    const list = Array.isArray(res.data)
      ? res.data
      : (res.data?.data ?? [])

    pages.value = list.map((it, i) => mapItem(it, i))

    // 여기서 totalPages.value = ... 이런 건 이제 필요 없음
    // totalPages는 computed라 자동으로 계산됨
  } catch (e) {
    error.value = '페이지 정보를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
}

/* 1) 검색 적용된 리스트 */
const filteredPages = computed(() => {
  const { type, keyword } = searchCondition.value
  const k = keyword.trim().toLowerCase()

  // 검색어가 비어 있으면 전체 반환
  if (!k) {
    return pages.value
  }

  return pages.value.filter(item => {
    if (type === 'all') {
      // 전체: title / content / memberName 중 하나라도 매치하면 통과
      return (
        item.title?.toLowerCase().includes(k) ||
        item.content?.toLowerCase().includes(k) ||
        item.memberName?.toLowerCase().includes(k)
      )
    }

    if (type === 'name') {
      // 이름만 비교
      return item.memberName?.toLowerCase().includes(k)
    }

    if (type === 'content') {
      // 내용(설명/본문) 비교
      return item.content?.toLowerCase().includes(k)
    }

    // fallback: 혹시 모르는 타입이면 그냥 전부 통과
    return true
  })
})

/* 2) 총 페이지 수 (검색 결과 기준) */
const totalPages = computed(() => {
  return Math.ceil(filteredPages.value.length / pageSize) || 1
})

/* 3) 현재 페이지에 보여줄 잘린 데이터 */
const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredPages.value.slice(start, end)
})

// 페이지 바꾸기 (Pagination.vue에서 @update:page로 호출)
function changePage(page) {
  // 안전하게 범위 방어
  if (page < 1) return
  if (page > totalPages.value) return
  currentPage.value = page
}

// 검색 실행 (Pagination.vue에서 @search로 호출)
function onSearch({ type, keyword }) {
  searchCondition.value = { type, keyword }
  currentPage.value = 1 // 검색하면 1페이지로 리셋
}


onMounted(() => {
  fetchList()
})
</script>


<style scoped>
/* ===== 전체 페이지 레벨 (브라우저) 설정 ===== */
/* scoped 안에서 전역 태그를 조정하려면 :global 사용 */
:global(html, body) {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #eaeaea;
  font-family: "Noto Sans KR", sans-serif;
  overflow: auto;
  /* overflow-y: auto; */
}

/* ===== 고정 캔버스 프레임 ===== */
.canvas {
  width: 1440px;
  min-height: 100vh;       /* 🔥 화면보다 짧으면 자동 늘어남 */
  background-color: #fff;
  box-sizing: border-box;

  margin: 0 auto;
  display: flex;
  flex-direction: column;

  /* 스크롤은 body가 담당 → hidden 제거 */
  overflow: visible;

  /* 그림자 (선택) */
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.07);
}


/* ===== 내부 컨텐츠 레이아웃 ===== */
.content {
  width: min(1200px, 92vw);
  margin: 0 auto;
  padding: 28px 0 56px;
  flex: 1 1 auto;      /* 남는 영역 차지 */
  box-sizing: border-box;
  overflow: visible;
}

/* 타이틀 영역 */
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
.grid {
  display: grid;
  grid-template-columns: repeat(4, 246px);
  justify-content: center;
  gap: 20px 20px;
}

/* 상태 메시지 */
.state {
  text-align: center;
  color: #777;
  margin-top: 60px;
}
.state.error {
  color: #e53935;
}

/* ===== 카드 박스 (여기 스타일은 InfluencerCard.vue에서 이미 자체적으로 줄 수도 있지만
   부모에서도 그대로 두면 크게 문제는 없음. 추후 중복되면 여긴 빼도 됨) ===== */
.card {
  width: 246px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: transform .2s ease;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.card:hover {
  transform: translateY(-2px);
}

/* ===== 썸네일 영역 ===== */
.thumb {
  position: relative;
  width: 100%;
  min-height: 330px;
  background: #f3f3f3;
  overflow: hidden;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ph {
  width: 100%;
  height: 100%;
  background: #eaeaea;
}

/* ===== 별 뱃지 ===== */
.star {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 9999px;
  background: #d8a236;
  color: #fff;
  font-size: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,.15);
}

/* ===== 카드 본문 텍스트/버튼 ===== */
.body {
  padding: 14px 16px 18px;
  text-align: left;
}
.body h3 {
  margin: 0 0 10px;
  color: #111;
  font-size: 18px;
  font-weight: 700;
}
.cat {
  margin: 0;
  color: #888888;
  font-size: 14px;
  font-weight: 500;
}
.desc {
  margin: 8px 0 14px;
  color: #858585;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 300;
}

/* ===== 팔로우 버튼 (부모 쪽 정의. 실제로는 InfluencerCard.vue에서 absolute 고정 버전으로
   관리할 거라면 여긴 나중에 안 써도 됨) ===== */
.follow-btn {
  width: 100%;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 14px;
  cursor: pointer;
  transition: background .2s ease;
}
.follow-btn:hover {
  background: #222;
}


.header-wrapper {
  width: 100%;
  max-width: 1440px; /* 🔥 캔버스 폭과 동일하게 고정 */
  margin: 0 auto;
  overflow: hidden;
}

.header-wrapper :deep(header),
.header-wrapper :deep(.header) {
  width: 100% !important; /* HeaderView.vue 안의 100vw 무효화 */
  max-width: 1440px !important;
  margin: 0 auto !important;
  left: 0 !important;
  right: 0 !important;
}

/* grid-wrapper: 전체를 가운데로 모아주는 껍데기 */
.grid-wrapper {
  width: 100%;
  display: flex;
  justify-content: center; /* 가운데로 모으기 */
  margin-top: 20px;
  margin-bottom: 20px;
}

/* grid-inner: 카드 그리드 + 버튼을 실제로 포지셔닝하는 상자 */
.grid-inner {
  position: relative;
  /* 그리드 폭에 딱 맞도록 */
  display: inline-block;

  /* 아래쪽에 공간 조금 확보해서 버튼이 겹치지 않게 */
  padding-bottom: 48px;
  box-sizing: border-box;
}

/* 버튼을 grid-inner의 오른쪽 아래에 절대 배치 */
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
  line-height: 1;
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
</style>
