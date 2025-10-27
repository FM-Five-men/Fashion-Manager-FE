<template>
  <div class="apply-canvas">
    <!-- 헤더 -->
    <header class="header-wrapper">
      <HeaderView />
    </header>

    <!-- 배너 (헤더 아래 풀폭) -->
    <section
      class="hero-banner"
      :style="heroBgStyle"
    >
      <!-- 어두운 반투명 오버레이 -->
      <div class="hero-overlay">
        <!-- 가운데 정렬된 실제 콘텐츠 박스 -->
        <div class="hero-inner">
          <div class="hero-icon">
            <span class="hero-icon-star">★</span>
          </div>

          <h1 class="hero-title">{{ bannerTitle }}</h1>
          <p class="hero-sub">{{ bannerSub }}</p>
          <p class="hero-desc">{{ bannerDesc }}</p>
        </div>
      </div>
    </section>

    <!-- 본문 -->
    <main class="content-wrapper">
      <!-- 탭 버튼 (왼쪽 정렬) -->
      <section class="apply-tab">
        <button
          class="tab-btn"
          :class="menteeBtnClass"
          @click="goMentee"
        >
          멘티 신청
        </button>

        <button
          class="tab-btn"
          :class="influencerBtnClass"
          @click="goInfluencer"
        >
          인플루언서 신청
        </button>
      </section>

      <!-- 카드 래퍼 -->
      <section class="form-card">
        <!-- 여기 안에 실제 폼 컴포넌트를 꽂는다 -->
        <component :is="FormComponent" />
      </section>
    </main>

    <!-- 푸터 -->
    <footer class="footer-wrapper">
      <FooterView />
    </footer>
  </div>
</template>

<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'

const props = defineProps({
  mode: {
    type: String,
    required: true, // 'mentee' or 'influencer'
  },
  FormComponent: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

// 탭 버튼에서 라우팅
function goMentee() {
  if (props.mode !== 'mentee') {
    router.push({ name: 'menteeapply' }) // 라우터에 name:'menteeapply' 등록돼 있어야 함
  }
}
function goInfluencer() {
  if (props.mode !== 'influencer') {
    router.push({ name: 'influencerapply' }) // 라우터에 name:'influencerapply' 등록돼 있어야 함
  }
}

// 탭 버튼 스타일 (활성은 검정, 비활성은 회색)
const menteeBtnClass = computed(() =>
  props.mode === 'mentee' ? 'tab-primary' : 'tab-secondary'
)
const influencerBtnClass = computed(() =>
  props.mode === 'influencer' ? 'tab-primary' : 'tab-secondary'
)

// 배너 텍스트들 (mode에 따라 다르게)
const bannerTitle = computed(() =>
  props.mode === 'mentee'
    ? '패션 멘토링 신청'
    : '인플루언서 파트너 신청'
)

const bannerSub = computed(() =>
  props.mode === 'mentee'
    ? '당신의 패션 커리어를 함께 성장시키세요.'
    : '당신의 영향력을 함께 성장시키세요.'
)

const bannerDesc = computed(() =>
  props.mode === 'mentee'
    ? '패션 업계 전문가와 함께하는 1:1 맞춤 멘토링 프로그램입니다.'
    : '브랜드와 인플루언서를 연결하는 최고의 플랫폼입니다.'
)

// 배너 배경 (멘티/인플루언서 각각 다른 느낌 원하면 여기서 주면 됨)
    const heroBgStyle = computed(() => {
      // 공통 배경 이미지
      const bgPath = "/images/Applybackground.png"

      // 페이지별 그라데이션 지정
      const gradient =
        props.mode === "mentee"
        // mentee 일때
        ? "linear-gradient(180deg, rgba(50,50,50,0.4) 0%, rgba(100,100,100,0.7) 100%)"
              // influencer 일때
        : "linear-gradient(180deg, rgba(139,92,246,0.7) 0%, rgba(236,72,153,0.85) 100%)"

      // 두 개를 결합 (그라데이션 + 이미지)
      return {
        backgroundImage: `${gradient}, url('${bgPath}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    })
</script>

<style scoped>
/* ===== 페이지 전체 프레임 ===== */
.apply-canvas {
  width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  color: #0a0a0a;
  box-shadow: 0 20px 50px rgba(0,0,0,0.07);
}

.header-wrapper,
.footer-wrapper {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
}

/* 배너 전체. 이제 여기 자체가 배경(그라데이션 or 이미지)을 가진다 */
.hero-banner {
  position: relative;
  width: 100%;
  height: 220px;
  color: #fff;
  overflow: hidden;
  /* heroBgStyle이 여기 덮어쓰기 됨:
     - mentee: backgroundImage: url(...)
     - influencer: linear-gradient(...) */
  background-size: cover;
  background-position: center;
}

/* 실제 배경 레이어 */
.hero-bg {
  position: absolute;
  inset: 0;
  opacity: 1;
  /* influencer일 때 그라디언트가 heroBgStyle로 들어오면 그냥 그라디언트 배경이 채워지고
     mentee일 때는 이미지가 들어감 */
}

/* 반투명 어둡게 덮는 레이어 (전체 폭) */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(0,0,0,0.4) 0%,
    rgba(0,0,0,0.55) 60%,
    rgba(0,0,0,0.7) 100%
  );

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  color: #fff;
  padding: 24px;
  box-sizing: border-box;
}

/* 실제 텍스트 블록(가운데 폭 제한) */
.hero-inner {
  width: min(1100px, 92vw);
  margin: 0 auto;
}


/* 동그란 별 아이콘 + 텍스트 스타일은 그대로 */
.hero-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
}
.hero-icon-star {
  color: #fff;
  font-size: 16px;
  line-height: 1;
  font-weight: 600;
}

.hero-title {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 12px 0;
  color: #fff;
}
.hero-sub {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 4px 0;
  font-weight: 400;
  color: #fff;
}
.hero-desc {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  color: #fff;
}


/* ===== 본문 컨텐츠 래퍼 ===== */
.content-wrapper {
  width: min(1100px, 92vw);
  margin: 24px auto 80px auto;
  flex: 1 1 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* ===== 탭 영역 ===== */
.apply-tab {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 16px;
}

/* 기본 탭 버튼 스타일 */
.tab-btn {
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}

/* 비활성 탭 (회색) */
.tab-secondary {
  background: #dcdcdc;
  color: #000;
}

/* 활성 탭 (검정) */
.tab-primary {
  background: #000;
  color: #fff;
}

/* ===== 카드 바깥 박스 ===== */
.form-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
