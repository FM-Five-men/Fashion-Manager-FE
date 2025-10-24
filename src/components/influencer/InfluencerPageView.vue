<!-- src/components/influencer/InfluencerPageView.vue -->
<template>
  <div data-layer="인플루언서 회원 목록 페이지" class="canvas">
    <!-- 헤더 -->
    <HeaderView />

    <!-- 본문 -->
    <main class="content">
      <section class="title">
        <h2>인플루언서 스포트라이트</h2>
        <p class="subtitle">패션 세계를 만들어가는 트렌드세터를 팔로우하세요</p>
      </section>

      <!-- 카드 그리드 -->
      <section v-if="!loading && !error" class="grid">
        <article v-for="item in pages" :key="item.num" class="card">
          <!-- 이미지 -->
          <div class="thumb">
            <img
              v-if="item.thumbnailUrl"
              :src="item.thumbnailUrl"
              :alt="item.memberName || 'thumbnail'"
              @error="onImgError(item)"
            />
            <div v-else class="ph"></div>
            <i class="star">★</i>
          </div>

          <!-- 본문 -->
          <div class="body">
            <h3>{{ item.memberName || 'User' }}</h3>
            <p class="cat">{{ item.title || '타이틀 없음' }}</p>
            <p class="desc">{{ item.content || '설명이 없습니다.' }}</p>
            <button class="follow-btn">팔로우</button>
          </div>
        </article>
      </section>

      <!-- 로딩 / 에러 -->
      <div v-if="loading" class="state">불러오는 중...</div>
      <div v-if="error" class="state error">{{ error }}</div>
    </main>

    <!-- 푸터 -->
    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import HeaderView from '../HeaderView.vue'
import FooterView from '../FooterView.vue'

/** API & 파일 prefix (vite 프록시: /api → http://localhost:8000) */
const API_URL  = '/api/manager-service/influencerPage/selectInfluencerPage'
const FILE_BASE = '/api/manager-service'       // 백엔드 파일 prefix
const LOCAL_BASE_MAIN = '/images/influencerPage' // 지금 쓰고 싶은 폴더(없으면 아래 보조 폴더로 폴백)
const LOCAL_BASE_FALLBACK = '/images/influencerList'

const loading = ref(true)
const error = ref('')
const pages = ref([])

/** 서버 경로 안전조립 */
function makeServerFileUrl(p) {
  if (!p) return null
  if (/^https?:\/\//i.test(p)) return p
  const clean = p.startsWith('/') ? p : `/${p}`
  return `${FILE_BASE}${clean}`
}

/** 서버 우선, 없으면 로컬 퍼블릭 이미지로 폴백 */
function mapItem(raw, idx) {
  const gallery = Array.isArray(raw.photoPaths) ? raw.photoPaths.map(makeServerFileUrl) : []
  const serverThumb = gallery[0] || null

  // 로컬 폴백: influencerPage 폴더가 우선, 없으면 influencerList 사용
  const n = (idx % 8) + 1
  const localMain   = `${LOCAL_BASE_MAIN}/influencerImg${n}.png`
  const localBackup = `${LOCAL_BASE_FALLBACK}/influencerImg${n}.png`

  return {
    num: raw.num,
    title: raw.title,
    content: raw.content,
    memberName: raw.memberName,
    // 서버 썸네일 있으면 사용, 없으면 로컬 메인 → 로컬 백업 순서
    thumbnailUrl: serverThumb || localMain || localBackup,
  }
}

/** 이미지 로드 실패 시 플레이스홀더로 전환 */
function onImgError(item) {
  // 첫 실패 시 influencerList로 한 번 더 시도
  if (item.thumbnailUrl?.startsWith(LOCAL_BASE_MAIN)) {
    item.thumbnailUrl = item.thumbnailUrl.replace(LOCAL_BASE_MAIN, LOCAL_BASE_FALLBACK)
  } else {
    item.thumbnailUrl = null
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(API_URL)
    const list = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
    pages.value = list.map((it, i) => mapItem(it, i))
  } catch (e) {
    error.value = '페이지 정보를 불러오지 못했습니다.'
    console.warn('API 실패:', e?.message || e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.canvas {
  width: 1440px;
  height: 1571px;
  overflow: auto;
  margin: 0 auto;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  flex-direction: column;
}

.content {
  width: min(1200px, 92vw);
  margin: 0 auto;
  padding: 28px 0 56px;
  flex: 1;
}

/* 상단 타이틀 */
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

/* 카드 그리드(하얀 부분도 포함) */
.grid {
  padding: 20px 40px 0 40px;   /* 위·좌우 여백 축소 */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 */
  gap: 20px 20px;                          /* 카드 간 간격 */
  justify-content: center;                 /* 가운데 정렬 */
}

/* 카드 */
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
.card:hover { transform: translateY(-2px); }

/* 이미지 영역 크게 + 비율 고정 (레퍼런스 느낌) */
.thumb{
  position:relative;
  width:100%;
  aspect-ratio: 246 / 330;  /* 세로 넉넉: 필요 시 246/360 등으로 조정 */
  min-height: 330px;
  background:#f3f3f3;
  overflow:hidden;
}
.thumb img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}
.ph{ width:100%; height:100%; background:#eaeaea; }

/* 별 배지 (금색 원형 안의 별) */
.star{
  position:absolute; top:12px; right:12px;
  display:inline-grid; place-items:center;
  width:28px; height:28px; border-radius:9999px;
  background:#d8a236; color:#fff; font-size:16px;
  box-shadow:0 2px 6px rgba(0,0,0,.15);
}

/* 본문 – 이미지가 커진 만큼 타이트 */
.body{ padding:14px 16px 18px; text-align:left; }
.body h3{ margin:0 0 10px; color:#111; font-size:18px; font-weight:700; }
.cat{ margin:0; color:#888888; font-size:14px; font-weight:500; }
.desc{ margin:8px 0 14px; color:#858585; font-size:13px; line-height:1.5; font-weight:300; }

/* 팔로우 버튼 */
.follow-btn{
  width:100%; background:#000; color:#fff; border:none;
  border-radius:8px; padding:10px 0; font-size:14px; cursor:pointer;
  transition:background .2s ease;
}
.follow-btn:hover{ background:#222; }

/* 상태 메시지 */
.state {
  text-align: center;
  color: #777;
  margin-top: 60px;
}
.state.error {
  color: #e53935;
}

:deep(.footer) {
  border-top: 1px solid #eee;
  background: #fafafa;
}
</style>
