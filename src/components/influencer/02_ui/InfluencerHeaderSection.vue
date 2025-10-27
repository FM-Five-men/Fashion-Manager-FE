<template>
  <!-- 전체를 감싸는 section: 아래쪽에 padding으로 간격 확보 -->
  <section class="header-section-wrapper">
    <div class="profile-wrapper">
      <div class="profile-card">
        <!-- 왼쪽 텍스트 영역 -->
        <div class="left-col">
          <!-- 이름 / 지원가능 -->
          <div class="name-line">
            <span class="name">{{ influencer.name }}</span>
          </div>

          <!-- 핸들 -->
          <div class="handle">{{ influencer.handle }}</div>

          <!-- 구분 라인 -->
          <div class="divider"></div>

          <!-- 제목 -->
          <div class="subtitle">{{ influencer.subtitle }}</div>

          <!-- 소개 -->
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

          <!-- 버튼들 -->
         <div class="actions-row">
          <!-- 팔로우 / 언팔로우 버튼 -->
          <button
            class="follow-btn-header"
            :class="{ followed: isFollowed }"
            @click="$emit('toggle-follow')"
          >
            {{ isFollowed ? "언팔로우" : "팔로우" }}
          </button>

          <!-- 신청하기 버튼 -->
          <button
            v-if="influencer.canApply"
            class="apply-btn-header"
            @click="$emit('apply')"
          >
            신청하기
          </button>
</div>
        </div>

        <!-- 오른쪽 이미지 영역 -->
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

defineEmits(["toggle-follow", "apply"]);

// ✅ 숫자 포맷 그대로
const formatNumber = (n) => {
  if (n === null || n === undefined) return "0";
  return Number(n).toLocaleString();
};

// ✅ 뱃지 로직: 이제 백엔드에서 받은 거 우선 사용
const safeBadges = computed(() => {
  if (props.influencer.badges && props.influencer.badges.length > 0) {
    return props.influencer.badges;
  }
  return [];
});

// ✅ 연락처 등 fallback은 그대로 유지해도 돼
const phoneDisplay = computed(() => {
  return props.influencer.phone || "010-1111-1111";
});

const instaDisplay = computed(() => {
  return props.influencer.instagram || "@insta_kimfashion";
});
</script>

<style scoped>
/* ✅ 이 padding-bottom 덕분에 아래 섹션과 간격 벌어짐 */
.header-section-wrapper {
  padding-bottom: 120px;
}

/* 카드 전체 사이즈 및 위치 (피그마 기준 851 x 544 고정) */
.profile-wrapper {
  width: 851px;
  height: 544px;
  position: relative;
  left: calc(50% - 425.5px);
  top: 128px;
}

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

  /* 🔥 이게 핵심: 카드 밖으로 어떤 것도 못 나가게 */
  overflow: hidden;
  
  
}



/* 왼쪽 텍스트 영역은 그대로 */
.left-col {
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: #000;
  font-family: "Noto Sans KR", sans-serif;
  border-right: 1px solid rgba(0,0,0,0.08);
}

/* 오른쪽 이미지 영역 */
.right-col {
  position: relative;
  width: 100%;
  height: 100%;           /* 🔥 카드 높이(544px) 전체를 그대로 가져와 */
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  overflow: auto;       /* 넘치는 부분 잘라 */
  padding: 0;             /* 🔥 혹시 남아있다면 확실히 제거 */
  margin: 0;              /* 🔥 혹시 남아있다면 확실히 제거 */
  display: block;         /* flex로 가운데 맞춤 필요없음, 그냥 꽉 채울 거니까 */
}

/* 이름 줄 */
.name-line {
  display: flex;
  align-items: center;
  gap: 8px;
}
.name {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  color: #000;
}


/* 핸들 (회색 아이디 텍스트) */
.handle {
  margin-top: 8px;
  color: #8a8a8a;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

/* 얇은 구분선 */
.divider {
  width: 100%;
  height: 1px;
  background: #cfcfcf;
  margin: 16px 0;
}

/* 부제목 (ex. "김패션의 스타일링 공간") */
.subtitle {
  font-size: 18px;
  line-height: 26px;
  color: #000;
  font-weight: 500;
  margin-bottom: 16px;
}

/* 자기소개 본문 */
.bio {
  font-size: 14px;
  line-height: 22px;
  color: #4a4a4a;
  white-space: normal;
  margin-bottom: 20px;
}

/* 뱃지 영역 */
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
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

/* 좋아요 / 힘내요 */
.stats-row {
  display: flex;
  gap: 48px;
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

/* 연락처 */
.contact-block {
  font-size: 14px;
  line-height: 20px;
  color: #0a0a0a;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
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

/* 버튼 2개 영역 */
.actions-row {
  display: flex;
  justify-content: center; /* ✅ 가로 가운데 정렬 */
  gap: 16px;
  margin-top: 16px;
  flex-wrap: wrap;
}
/* 팔로우 버튼 / 언팔로우 버튼 */
.follow-btn-header {
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  color: #fff;
  background: #000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
}
.follow-btn-header.followed {
  background: #777;
  color: #fff;
}

/* 신청하기 버튼 - 같은 사이즈 */
.apply-btn-header {
  min-width: 120px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  color: #fff;
  background: #000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
}
.follow-btn-header:hover,
.apply-btn-header:hover {
  opacity: 0.9;
}

/* 오른쪽 이미지 영역 */
.right-col {
  /* 오른쪽 컬럼 자체는 padding이 없어야 피그마처럼 이미지가 위/오른쪽/아래에 딱 붙는다 */
  width: 470px;
  height: 100%;
  border-radius: 0;          /* 별도의 둥근 모서리 X, 카드랑 한 덩어리처럼 */
  overflow: hidden;
  background: transparent;  /* 배경 따로 안 보이게 */

  display: flex;
  align-items: center;
  justify-content: center;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

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
