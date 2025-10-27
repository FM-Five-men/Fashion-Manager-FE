<template>
  <!-- 카드 전체 -->
  <article class="influencer-card" @click="goDetail">
    <!-- 상단 썸네일 -->
    <div class="thumb">
      <img
        v-if="item.thumbnailUrl"
        :src="item.thumbnailUrl"
        :alt="item.memberName || 'thumbnail'"
        @error="onImgErrorLocal"
      />
      <div v-else class="thumb-fallback"></div>
      <i class="star">★</i>
    </div>

    <!-- 하단 정보 영역 -->
    <div class="info">
      <h3 class="info-name">{{ item.memberName || 'User' }}</h3>
      <p class="info-title">{{ item.title || '타이틀 없음' }}</p>
      <p class="info-desc">{{ item.content || '설명이 없습니다.' }}</p>

      <!-- 팔로우 / 언팔로우 버튼 -->
      <button
        class="follow-btn"
        :class="{ followed: isFollowed }"
        @click.stop="toggleFollow"
      >
        {{ isFollowed ? '언팔로우' : '팔로우' }}
      </button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'InfluencerCard',

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isFollowed: false,
    };
  },

  methods: {
    // ✅ 상세 페이지 이동
   goDetail() {
      console.log("[카드 클릭됨]", this.item);

      this.$router.push({
        name: 'influencerpage-profile',
        params: {
          num: this.item.memberNum,
        },
        query: {
          thumb: this.item.thumbnailUrl, // 이미지도 같이 넘김
        },
      });
    },

    // 팔로우 토글
    toggleFollow() {
      this.isFollowed = !this.isFollowed;
    },

      // 이미지 에러 처리 (서버 이미지가 없을 경우, public 폴더의 기본 이미지 중 하나로 랜덤 대체)
    onImgErrorLocal(e) {
      // 1️⃣ 기본 이미지 풀
      const fallbackPool = [
        "/images/influencer_page/influencerImg1.png",
        "/images/influencer_page/influencerImg2.png",
        "/images/influencer_page/influencerImg3.png",
        "/images/influencer_page/influencerImg4.png",
        "/images/influencer_page/influencerImg5.png",
        "/images/influencer_page/influencerImg6.png",
        "/images/influencer_page/influencerImg7.png",
        "/images/influencer_page/influencerImg8.png",
      ];

      // 2️⃣ 카드별 고유 랜덤 인덱스 생성 (멤버 번호 기반 고정 or 랜덤)
      const seed = this.item.memberNum || Math.random() * 1000;
      const randomIndex = Math.floor(seed % fallbackPool.length);

      // 3️⃣ fallback 이미지 적용
      e.target.src = fallbackPool[randomIndex];
    },
  },
};
</script>

<style scoped>
/* 카드 전체 */
.influencer-card {
  width: 246px;
  height: 480px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
}

/* 썸네일 */
.thumb {
  position: relative;
  width: 100%;
  height: 320px;
  background: #f3f3f3;
  overflow: hidden;
}
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-fallback {
  width: 100%;
  height: 100%;
  background: #eaeaea;
}

/* 정보 영역 */
.info {
  position: relative;
  background: #ffffff;
  border-top: 1px solid #eee;
  flex: 1;
  padding: 12px 14px 52px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: left;
  min-height: 160px;
}

/* 이름 */
.info-name {
  font-size: 15px;
  font-weight: 600;
  color: #000;
  line-height: 1.5;
  margin: 0 0 4px 0;
}

/* 부제 */
.info-title {
  font-size: 12px;
  font-weight: 500;
  color: #000;
  line-height: 1.5;
  margin: 0;
}

.info-title + .info-desc {
  margin-top: 8px;
}

/* 설명 */
.info-desc {
  font-size: 11px;
  font-weight: 400;
  color: #6f6f6f;
  line-height: 1.45;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 2줄까지만 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 팔로우 버튼 */
.follow-btn {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  width: calc(100% - 32px);
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
}

/* 언팔로우 상태 */
.follow-btn.followed {
  background: #777;
}

.follow-btn:hover {
  opacity: 0.9;
}
</style>
