<template>
  <div id="review-community-page" class="page">
    <HeaderView/>
    <!-- Hero / Banner -->
    <!-- 배너 이미지를 바꾸고 싶으면 아래 style의 --hero-url 경로만 바꾸면 됩니다 -->
    <section class="hero" style="--hero-url: url('/images/FMbanner.jpg')">
      <div class="hero-content">
        <h1>REVIEW COMMUNITY</h1>
        <p>당신의 경험을 공유하세요</p>
      </div>
    </section>

    <!-- Main -->
    <main class="main">
      <!-- Content (왼쪽) -->
      <section class="content" aria-label="content area">
        <!-- Trending -->
        <section class="trending">
          <h2 class="section-title">지금 떠오르는 후기를 찾아보세요</h2>
          <div class="trend-grid">

          <router-link to="/reviewpostview/1" class="trend-card" aria-label="뉴발란스 2002R 실착용 후기">
            <article class="trend-card">
              <img src="/public/images/review/review2.jpg" alt="" class="trend-img" />
              <div class="trend-gradient"></div>
              <h3 class="trend-title">뉴발란스 2002R 실착용 후기</h3>
            </article>
          </router-link>
            <article class="trend-card">
              <img src="/public/images/review/review1.jpg" alt="" class="trend-img" />
              <div class="trend-gradient"></div>
              <h3 class="trend-title">2025 럭셔리 핸드백 컬렉션 솔직 후기</h3>
            </article>


            <article class="trend-card">
              <img src="/public/images/review/review3.jpg" alt="" class="trend-img" />
              <div class="trend-gradient"></div>
              <h3 class="trend-title">패스트 패션 명품 듀프 제품 분석</h3>
            </article>
          </div>
        </section>

        <!-- Discover -->
        <section class="discover">
          <h2 class="section-title">내게 필요한 후기를 찾아보세요!</h2>

          <div class="discover-controls">
            <div class="chip-group">
              <button class="chip chip--active">옷</button>
              <button class="chip">온라인 쇼핑몰</button>
              <button class="chip">오프라인 매장</button>
              <button class="chip">악세서리</button>
              <button class="chip">멘토링</button>
            </div>
            <button class="btn btn-primary">글 작성</button>
          </div>

          <div class="card-grid">
    <template v-if="!loading && !errorMsg">
      <article
        v-for="post in reviews"
        :key="post.num"
        class="card"
      >
        <div class="card-body">
          <div class="card-top">
            <!-- 카테고리 뱃지/날짜 등은 나중에 연결 -->
            <span class="pill">{{ post.categoryName }}</span>
            <span class="date">작성자: {{ post.authorName }}</span>
          </div>

          <h3 class="card-title">{{ post.title }}</h3>
          <p class="card-desc">{{ post.content }}</p>
          <!-- 내용이 길면 미리보기로 바꾸고 싶다면 위 줄 대신 아래 줄 사용
          <p class="card-desc">{{ preview(post.content, 120) }}</p>
          -->
        </div>
      </article>
    </template>

    <article v-else class="card">
      <div class="card-body">
        <h3 class="card-title">
          {{ loading ? '불러오는 중…' : errorMsg }}
        </h3>
      </div>
    </article>
  </div>

          <!-- Search & Pagination -->
          <div class="search-pagination">
            <div class="search-boxes">
              <div class="select-like">
                <span>제목</span>
                <i class="chev"></i>
              </div>
              <div class="input-like">검색어를 입력하세요</div>
              <button class="btn btn-primary btn-search">
                <i class="ico-search"></i>
                검색
              </button>
            </div>

            
          </div>
        </section>
      </section>

      <!-- Sidebar (오른쪽) -->
      <aside class="sidebar" aria-label="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-icon"></div>
          <span>후기</span>
        </div>

        <ul class="sidebar-list">
          <li class="side-item">
            <a href="#" class="side-link">
              <span class="side-title">2025 럭셔리 핸드백 컬렉션 솔직 후기</span>
              <span class="side-meta"><span>BagAddict</span> • <span>1시간 전</span></span>
            </a>
          </li>
          <li class="side-item">
            <a href="#" class="side-link">
              <span class="side-title">디자이너 스니커즈 10종 비교 리뷰</span>
              <span class="side-meta"><span>SneakerHead</span> • <span>4시간 전</span></span>
            </a>
          </li>
          <li class="side-item">
            <a href="#" class="side-link">
              <span class="side-title">패스트 패션 명품 듀프 제품 분석</span>
              <span class="side-meta"><span>BudgetFashion</span> • <span>7시간 전</span></span>
            </a>
          </li>
          <li class="side-item">
            <a href="#" class="side-link">
              <span class="side-title">맞춤 테일러링 서비스 이용 후기</span>
              <span class="side-meta"><span>TailoredLife</span> • <span>10시간 전</span></span>
            </a>
          </li>
          <li class="side-item">
            <a href="#" class="side-link">
              <span class="side-title">2025 온라인 스타일링 서비스 비교</span>
              <span class="side-meta"><span>StyleSeeker</span> • <span>1일 전</span></span>
            </a>
          </li>
        </ul>
      </aside>
    </main>

    <!-- Footer -->
    <FooterView/>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'

/** 리뷰 글(제목/내용/작성자)만 사용하는 최소 모델 */
const reviews = ref([]) // { num, title, content, memberNum, authorName }

/** 간단한 에러/로딩 상태(필요시 UI로 뺄 수 있음) */
const loading = ref(false)
const errorMsg = ref('')

/** 내용 미리보기(선택) */
const preview = (text, len = 90) =>
  !text ? '' : text.length > len ? text.slice(0, len) + '…' : text

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch('/db.json', { cache: 'no-store' })
    if (!res.ok) throw new Error('db.json 로드 실패')
    const data = await res.json()

    // 1) 회원 맵: num -> NAME
    const memberMap = new Map(
      (data.Member || []).map(m => [m.num, m.NAME])
    )
    const categoryMap = new Map((data.Review_Category || []).map(c => [c.num, c.NAME]))

    // 2) 리뷰 글에 작성자 이름 조인
    reviews.value = (data.Review_Post || []).map(p => ({
      num: p.num,
      title: p.title,
      content: p.content,
      memberNum: p.member_num,
      authorName: memberMap.get(p.member_num) ?? '알 수 없음',
      categoryNum: p.review_category_num ?? null,
      categoryName: categoryMap.get(p.review_category_num) ?? '기타',
    }))
  } catch (e) {
    console.error(e)
    errorMsg.value = '데이터를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* ===== Base ===== */
.page {
  --bg: #fff;
  --text: #0A0A0A;
  --muted: #6A7282;
  --line: #E5E7EB;
  --chip: #F3F3F5;
  --brand: #000;
  --accent: #C6A43B;
  --shadow: 0 2px 4px -2px rgba(0,0,0,.1);
  background: var(--bg);
  color: var(--text);
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 20px;
  line-height: 24px;
  margin: 8px 0 16px;
}

/* ===== Hero (Banner) ===== */
.hero {
  position: relative;
  height: 280px;           /* 배너 높이 업 */
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,0) 70%),
    var(--hero-url, url('/images/FMbanner.jpg'));
  background-size: cover;
  background-position: center right;
}
.hero-content {
  position: absolute; inset: 0;
  display: grid; align-content: center; justify-items: start;
  padding-left: clamp(24px, 8vw, 120px);
  gap: 8px; text-align: left;
}
.hero h1 { color: #fff; font-size: 40px; line-height: 44px; letter-spacing: .2px; }
.hero p { color: #E5E7EB; font-size: 16px; }

/* ===== Main Layout ===== */
/* 사이드바를 오른쪽으로 보내기 위해 grid-areas 사용 */
.main {
  max-width: 1200px;
  margin: 24px auto 0;
  padding: 0 22px;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: "content sidebar";
  gap: 24px;
}
.content { grid-area: content; display: grid; gap: 32px; }
.sidebar { grid-area: sidebar; }

/* ===== Sidebar (Right) ===== */
.sidebar {
  background: #fff;
  box-shadow: var(--shadow);
  border-radius: 10px;
  height: max-content;
  padding: 24px;
  position: sticky;       /* 스크롤시 고정 감 */
  top: 24px;
}
.sidebar-header {
  display: flex; align-items: center; gap: 12px;
  padding-bottom: 12px; border-bottom: 1px solid var(--line);
  margin-bottom: 16px;
}
.sidebar-icon { width: 36px; height: 36px; border-radius: 8px; background: #000; }
.sidebar-list { display: grid; gap: 12px; }
.side-item { list-style: none; }
.side-link { display: grid; gap: 4px; text-decoration: none; color: inherit; }
.side-title { font-size: 14px; line-height: 20px; color: #101828; }
.side-meta { color: var(--muted); font-size: 12px; display: flex; gap: 8px; }

/* ===== Trending ===== */
.trend-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.trend-card {
  position: relative; height: 200px; border-radius: 10px;
  overflow: hidden; box-shadow: var(--shadow); background: #fff;
}
.trend-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.trend-gradient {
  position: absolute; inset: 0;
  background: linear-gradient(0deg, rgba(0,0,0,.7) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,0) 100%);
}
.trend-title {
  position: absolute; left: 16px; bottom: 12px;
  color: #fff; font-size: 16px; line-height: 24px; font-weight: 400;
}

/* ===== Discover controls ===== */
.discover { display: grid; gap: 16px; }
.discover-controls {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
}
.chip-group { display: flex; flex-wrap: wrap; gap: 12px; }
.chip {
  background: #fff; border-radius: 8px; border: 1px solid #D1D5DC;
  padding: 8px 16px; font-size: 14px; color: #364153; cursor: pointer;
}
.chip--active { background: #000; color: #fff; border-color: #000; }
.btn { height: 36px; padding: 0 14px; border-radius: 8px; border: 0; cursor: pointer; }
.btn-primary { background: #000; color: #fff; }
.btn-search { display: inline-flex; align-items: center; gap: 8px; }

/* ===== Cards ===== */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.card {
  background: #fff; border-radius: 10px; box-shadow: var(--shadow);
  padding: 24px;
}
.card-body { display: grid; gap: 12px; }
.card-top { display: flex; align-items: center; gap: 12px; }
.pill {
  background: #000; color: #fff; border-radius: 9999px;
  padding: 4px 12px; font-size: 12px; line-height: 16px;
}
.date { color: var(--muted); font-size: 12px; margin-left: auto; }
.card-title { font-size: 16px; line-height: 24px; color: #101828; }
.card-desc { color: #4A5565; font-size: 14px; line-height: 20px; }

.card-meta {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px; border-top: 1px solid var(--line);
}
.meta-left { display: flex; align-items: center; gap: 12px; }
.label { font-size: 14px; color: #364153; }
.rating { display: inline-flex; gap: 6px; }
.dot { width: 12px; height: 12px; border: 1px solid #D1D5DC; border-radius: 2px; display: inline-block; }
.dot.is-full { background: #F0B100; border-color: #F0B100; }

.metrics { display: inline-flex; align-items: center; gap: 20px; color: var(--muted); }
.metric { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; }
.ico { width: 16px; height: 16px; display: inline-block; border: 1px solid #6A7282; border-radius: 2px; }
.ico-like { border-radius: 3px; }
.ico-view { border-radius: 0; }

/* ===== Search & Pagination ===== */
.search-pagination { display: grid; gap: 16px; margin-top: 8px; }
.search-boxes { display: flex; align-items: center; gap: 8px; }
.select-like {
  width: 140px; height: 36px; background: #F3F3F5;
  border-radius: 8px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 12px; font-size: 14px;
}
.select-like .chev {
  width: 8px; height: 8px; border: 1px solid #717182; border-top: 0; border-left: 0;
  transform: rotate(45deg); opacity: .5;
}
.input-like {
  flex: 1; height: 36px; background: #F3F3F5;
  border-radius: 8px; display: flex; align-items: center; padding: 0 12px; color: #717182;
}

/* 페이지네이션 - 현재 버튼 비정상 보임 수정 */
/* 버튼 공통 */
.pagination {
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.page, .page-arrow, .pageisCurrent, .isCurrent {
  height: 32px; min-width: 32px; padding: 0 10px;
  border-radius: 8px; border: 1px solid transparent;
  display: inline-flex; align-items: center; justify-content: center;
  background: #fff; color: #0A0A0A; cursor: pointer; font-size: 14px;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.06) inset;
}
.page-arrow { font-size: 18px; line-height: 18px; padding: 0 8px; }

/* 현재 페이지 (두 가지 클래스 네이밍 모두 대응) */
.page.is-current,
button.pageisCurrent,
.page.isCurrent,
.page--current {
  background: #000; color: #fff;
  border-color: #000; box-shadow: none;
}

/* ===== Footer ===== */
.footer { margin-top: 48px; background: #000; color: #fff; }
.footer-inner {
  max-width: 1200px; margin: 0 auto; padding: 24px 24px 32px;
  display: grid; justify-items: center; gap: 12px;
}
.brand { font-size: 16px; line-height: 24px; opacity: .95; }
.footer-nav { display: flex; gap: 24px; color: #99A1AF; font-size: 16px; }
.footer-nav a { color: inherit; text-decoration: none; }
.copy { color: #6A7282; font-size: 12px; }

/* ===== Responsive ===== */
@media (max-width: 1200px) {
  .main { grid-template-columns: 1fr; grid-template-areas: "content" "sidebar"; }
  .sidebar { position: static; }
  .trend-grid, .card-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .trend-grid, .card-grid { grid-template-columns: 1fr; }
  .discover-controls { flex-direction: column; align-items: stretch; gap: 8px; }
  .search-boxes { flex-direction: column; }
}
</style>