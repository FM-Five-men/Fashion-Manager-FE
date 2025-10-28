<template>
  <!--
    인플루언서 상세 상단 헤더
    부모(InfluencerProfileView.vue)에서 받은 influencer 객체를 그대로 렌더링함.
    => 즉 여기서 보이는 이름은 부모 쪽 fetchInfluencerDetail()에서
    member-service/member/list 결과로 덮어쓴 최종 이름이다.
  -->
  <section class="header-section-wrapper">
    <div class="profile-wrapper">
      <div class="profile-card">
        <!-- ===== 왼쪽 텍스트 영역 ===== -->
        <div class="left-col">
          <!-- 이름 / 팔로우 버튼 -->
          <div class="name-line">
            <span class="name">{{ influencer.name }}</span>

            <button
              class="follow-btn-header"
              :class="{ followed: isFollowed }"
              @click="$emit('toggle-follow')"
            >
              {{ isFollowed ? "언팔로우" : "팔로우" }}
            </button>
          </div>

          <!-- 인스타 핸들 -->
          <div class="handle">{{ influencer.handle }}</div>

          <div class="divider"></div>

          <!-- 페이지 제목 -->
          <div class="subtitle">{{ influencer.subtitle }}</div>

          <!-- 자기소개 (부모에서 줄바꿈 <br> 로 변환된 HTML) -->
          <div class="bio" v-html="formattedBio"></div>

          <!-- 뱃지 -->
          <div class="badges">
            <span
              v-for="(badge, idx) in safeBadges"
              :key="idx"
              class="badge-chip"
            >
              {{ badge }}
            </span>
          </div>

          <!-- 좋아요 / 힘내요 -->
          <div class="stats-row">
            <div class="stat-block">
              <div class="stat-value">{{ formatNumber(influencer.likes) }}</div>
              <div class="stat-label">좋아요</div>
            </div>
            <div class="stat-block">
              <div class="stat-value">{{ formatNumber(influencer.cheers) }}</div>
              <div class="stat-label">힘내요</div>
            </div>
          </div>

          <!-- 연락처 -->
          <div class="contact-block">
            <div class="contact-line">
              <span class="contact-icon">📞</span>
              <span class="contact-text">{{ phoneDisplay }}</span>
            </div>
            <div class="contact-line">
              <span class="contact-icon">📷</span>
              <span class="contact-text">{{ instaDisplay }}</span>
            </div>
          </div>
        </div>

        <!-- ===== 오른쪽 이미지 영역 ===== -->
        <div class="right-col">
          <template v-if="influencer.mainImageUrl">
            <img
              class="main-image"
              :src="influencer.mainImageUrl"
              alt="influencer main"
            />
          </template>
          <template v-else>
            <div class="no-img">No img</div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  influencer: {
    type: Object,
    required: true,
  },
  formattedBio: {
    type: String,
    required: true,
  },
  isFollowed: {
    type: Boolean,
    required: true,
  },
});

// 부모로 이벤트 돌려보내는 용도 (팔로우 토글 등)
defineEmits(["toggle-follow", "apply"]);

// 숫자 포맷 (1,234 식)
const formatNumber = (n) => {
  if (n === null || n === undefined) return "0";
  return Number(n).toLocaleString();
};

// 뱃지들 안전 처리
// - 부모(InfluencerProfileView)가 matchedUser.badges에서 badgeName 배열로 만들어 줌
const safeBadges = computed(() => {
  if (props.influencer.badges && props.influencer.badges.length > 0) {
    return props.influencer.badges;
  }
  return [];
});

// 연락처 표시용. 없으면 임시 텍스트
const phoneDisplay = computed(() => {
  return props.influencer.phone || "010-0000-0000";
});

const instaDisplay = computed(() => {
  return props.influencer.instagram || "@insta_kimfashion"; // fallback 텍스트
});
</script>


<style scoped>
/* 전체 헤더 섹션과 아래 컨텐츠 사이 간격 확보 */
.header-section-wrapper {
  padding-bottom: 120px;
}

/*
  profile-wrapper
  - 카드 전체(왼쪽+오른쪽)를 감싸는 고정 프레임
  - 피그마 기준 width/height 유지
*/
.profile-wrapper {
  width: 851px;
  height: 544px;
  position: relative;
  left: calc(50% - 425.5px); /* 가운데 정렬 */
  top: 128px;
}

/*
  profile-card
  - 실제 카드 UI
  - 좌: 텍스트 / 우: 대표 이미지
*/
.profile-card {
  width: 100%;
  height: 544px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 24px 40px rgba(0, 0, 0, 0.08);

  display: grid;
  grid-template-columns: 1fr 470px;
  column-gap: 0;

  box-sizing: border-box;
  overflow: hidden; /* 카드 밖으로 내용이 나가지 않도록 */
}

/* 왼쪽 텍스트 영역 */
.left-col {
  box-sizing: border-box;
  padding: 40px;
  
  /* 🔥 세로 중앙 정렬 핵심 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* <-- 세로 중앙 정렬 */
  gap: 10px;               /* 각 블록 사이 여백 일정하게 */
  
  text-align: left;
  color: #000;
  font-family: "Noto Sans KR", sans-serif;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

/*
  name-line
  - 상단: 이름과 팔로우 버튼 가로 배치
  - 여기의 margin-bottom으로 아래 요소(핸들)와 간격을 준다
*/
.name-line {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  /* 🔥 위에서 너무 몰려보이지 않게 아래로 여백 */
  margin-bottom: 16px;
}

/* 인플루언서 이름 */
.name {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  color: #000;
}

/*
  follow-btn-header
  - 팔로우 / 언팔로우 버튼
*/
.follow-btn-header {
  min-width: 88px;
  height: 32px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  color: #fff;
  background: #000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  box-sizing: border-box;
}
.follow-btn-header.followed {
  background: #777;
  color: #fff;
}
.follow-btn-header:hover {
  opacity: 0.9;
}

/*
  handle (@insta_....)
  - 이름/팔로우 영역과 구분되는 서브 텍스트
*/
.handle {
  color: #8a8a8a;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  /* 🔥 이름 영역과 간격 */
  margin-bottom: 16px;
}

/*
  divider (얇은 라인)
  - handle 아래, 본문 위 사이의 시각적 구획
*/
.divider {
  width: 100%;
  height: 1px;
  background: #cfcfcf;

  /* 🔥 라인 자체와 아래 콘텐츠(제목) 사이 간격 */
  margin-bottom: 20px;
}

/*
  subtitle
  - 큰 소제목 (예: "김패션의 스타일링 공간")
*/
.subtitle {
  font-size: 18px;
  line-height: 26px;
  color: #000;
  font-weight: 500;

  /* 🔥 소개문단과 텍스트 간격 */
  margin-bottom: 12px;
}

/*
  bio
  - 자기소개/설명 문단
*/
.bio {
  font-size: 14px;
  line-height: 22px;
  color: #4a4a4a;
  white-space: normal;

  /* 🔥 아래(뱃지들)와의 간격을 넉넉하게 */
  margin-bottom: 24px;
}

/*
  badges
  - 칭호/역할/전문분야 태그들
*/
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  /* 🔥 지표(stats-row)랑 너무 붙어 보이지 않도록 */
  margin-bottom: 28px;
}

.badge-chip {
  background: rgba(217, 217, 217, 0.8);
  border-radius: 14px;
  font-size: 13px;
  line-height: 20px;
  color: #000;
  padding: 4px 10px;
  font-weight: 500;
}

/*
  stats-row
  - 좋아요 / 힘내요 수치
*/
.stats-row {
  display: flex;
  gap: 48px;

  /* 🔥 연락처와 간격 */
  margin-bottom: 24px;
}

.stat-block {
  text-align: left;
}

.stat-value {
  font-size: 28px;
  line-height: 32px;
  color: #000;
  font-weight: 500;
}

.stat-label {
  font-size: 14px;
  line-height: 20px;
  color: #838383;
  margin-top: 4px;
}

/*
  contact-block
  - 전화 / 인스타
*/
.contact-block {
  font-size: 14px;
  line-height: 20px;
  color: #0a0a0a;

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-icon {
  font-size: 14px;
  line-height: 20px;
  color: #000;
}

.contact-text {
  font-size: 14px;
  line-height: 20px;
  color: #0a0a0a;
}

/*
  right-col
  - 우측 이미지 영역
*/
.right-col {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  overflow: auto;
  padding: 0;
  margin: 0;
  display: block;

  /* 오른쪽 컬럼은 별도 라운드 처리 (카드와 자연스럽게) */
  display: flex;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

/*
  main-image
  - 대표 이미지 풀커버
*/
.main-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 0%;
  display: block;
}

.no-img {
  width: 100%;
  height: 100%;
  background: #e0e0e0;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: "Arial", sans-serif;
}
</style>
