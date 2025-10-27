<template>
  <!-- (1) placeholder 카드: 아직 게시물이 없을 때 -->
  <div v-if="isEmpty" class="postcard-empty">
    <div class="empty-badge">No Post Yet</div>
    <p class="empty-main">아직 등록된 게시물이 없습니다.</p>
    <p class="empty-sub">
      첫 게시물이 올라오면 이곳에
      표시됩니다.
    </p>

    <div class="info-row">
      <span class="info-chip">♡ 0</span>
      <span class="info-chip">💬 0</span>
      <span class="info-chip">🔥 0%</span>
    </div>
  </div>

  <!-- (2) 멘토링 카드 -->
  <div v-else-if="isMentoring" class="mentoring-card">
    <div class="mentoring-head">
      <div class="mentoring-user">
        <div class="avatar-circle">{{ avatarInitial }}</div>

        <div class="user-texts">
          <div class="user-name">{{ item.nickname }}</div>
          <div class="user-time">{{ item.createdAtText }}</div>
        </div>
      </div>

      <div class="level-badge">{{ item.level }}</div>
    </div>

    <h2 class="mentoring-title">{{ item.title }}</h2>

    <p class="mentoring-body">
      {{ item.body }}
    </p>

    <div class="mentoring-footer">
      <div class="footer-left">
        <span class="info-chip">♡ {{ item.likes }}</span>
        <span class="info-chip">💬 {{ item.comments }}</span>
      </div>

      <div
        class="status-chip"
        :class="{
          open: item.statusTone === 'open',
          closed: item.statusTone === 'closed'
        }"
      >
        {{ item.statusText }}
      </div>
    </div>
  </div>

  <!-- (3) 일반 Posts 카드 (피드 스타일) -->
  <div v-else class="feed-card">
    <!-- 썸네일 -->
    <div class="feed-thumb">
      <img
        v-if="imgToShow"
        :src="imgToShow"
        alt=""
        @error="onImgError"
      />
      <div v-else class="thumb-fallback"></div>
    </div>

    <!-- 텍스트 / 메타 -->
    <div class="feed-content">
      <!-- 제목 -->
      <h3 class="feed-title">
        {{ item.title || "제목 없음" }}
      </h3>

      <!-- 본문 요약 (무조건 렌더) -->
      <p class="feed-desc">
        {{ descToShow }}
      </p>

      <!-- 하단 메타 -->
      <div class="info-row meta-row">
        <span class="info-chip">♡ {{ item.likes ?? 0 }}</span>
        <span class="info-chip">💬 {{ item.comments ?? 0 }}</span>
        <!-- 🔥 이제 hotPercentText 사용 -->
        <span class="info-chip">🔥 {{ hotPercentText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  isMentoring: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
});

/* ===============================
   1) 온도 계산 로직
   - good/(good+cheer) * 100
   - 소수점 반올림해서 정수 %
   - 값 없으면 0%
   =============================== */
function calcTemperaturePercent(good = 0, cheer = 0) {
  const g = Number(good) || 0;
  const c = Number(cheer) || 0;
  const sum = g + c;
  if (!sum) return 0;
  return Math.round((g / sum) * 100);
}

/* 화면에 보여줄 "63%" 같은 텍스트 */
const hotPercentText = computed(() => {
  // item.good / item.cheer에서 계산
  const t = calcTemperaturePercent(props.item?.good, props.item?.cheer);
  return t + "%";
});

/* ===============================
   2) 랜덤 썸네일 관련
   =============================== */
const randomImages = [
  "/images/randomimg/sample01.png",
  "/images/randomimg/sample02.png",
  "/images/randomimg/sample03.png",
  "/images/randomimg/sample04.png",
  "/images/randomimg/sample05.png",
  "/images/randomimg/sample06.png"
];

const randomImgSrc = ref(null);

onMounted(() => {
  if (randomImages.length > 0) {
    const idx = Math.floor(Math.random() * randomImages.length);
    randomImgSrc.value = randomImages[idx];
  }
});

/* 실제로 쓸 이미지 우선순위:
   1) item.imgUrl (서버에서 온 썸네일)
   2) 랜덤 이미지
   없으면 null -> fallback div 노출 */
const imgToShow = computed(() => {
  if (props.item && props.item.imgUrl) {
    return props.item.imgUrl;
  }
  return randomImgSrc.value;
});

/* ===============================
   3) 본문 요약 텍스트
   - desc > body > fallback 순으로 선택
   - 이 값을 feed-desc에서 항상 출력
   =============================== */
const descToShow = computed(() => {
  if (props.item && props.item.desc && props.item.desc.trim() !== "") {
    return props.item.desc;
  }
  if (props.item && props.item.body && props.item.body.trim() !== "") {
    return props.item.body;
  }
  return "아직 소개 문구가 등록되지 않았습니다.";
});

/* ===============================
   4) 멘토링 카드용 프로필 이니셜
   =============================== */
const avatarInitial = computed(() => {
  if (!props.item || !props.item.nickname) return "패";
  return props.item.nickname[0];
});

/* 이미지 깨지면 안 보이게 처리 */
function onImgError(e) {
  e.target.style.display = "none";
}
</script>

<style scoped>
/* 공통 메타 라인 */
.info-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 500;
  color: #000;
  margin-top: 16px;
}

.info-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #000;
  line-height: 1.2;
}

/* placeholder 카드 */
.postcard-empty {
  width: 246px;
  min-height: 360px;
  border-radius: 20px;
  background: repeating-linear-gradient(
    -45deg,
    #fafafa 0px,
    #fafafa 10px,
    #f0f0f0 10px,
    #f0f0f0 20px
  );
  box-shadow: 0 18px 30px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.05);

  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #444;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.empty-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: #444;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 4px 8px;
}

.empty-main {
  margin: 16px 0 8px;
  font-size: 13px;
  font-weight: 600;
  color: #444;
  line-height: 1.5;
}

.empty-sub {
  font-size: 11px;
  font-weight: 400;
  color: #777;
  line-height: 1.5;
  white-space: pre-line;
  margin: 0;
}

/* 멘토링 카드 */
.mentoring-card {
  width: 246px;
  min-height: 360px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 18px 30px rgba(0,0,0,0.08);
  border: 1px solid rgba(0,0,0,0.05);

  padding: 20px;
  box-sizing: border-box;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.mentoring-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.mentoring-user {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.avatar-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #0f0f15;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-texts {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.user-name {
  font-size: 13px;
  font-weight: 600;
  color: #000;
}
.user-time {
  font-size: 11px;
  color: #888;
}

.level-badge {
  font-size: 12px;
  background: #f4f4f4;
  border-radius: 8px;
  padding: 4px 8px;
  color: #000;
  font-weight: 500;
  line-height: 1.2;
}

.mentoring-title {
  font-size: 14px;
  font-weight: 700;
  color: #000;
  line-height: 1.4;
  margin: 16px 0 12px;
  text-align: center;
}

.mentoring-body {
  font-size: 12px;
  font-weight: 400;
  color: #777;
  text-align: center;
  line-height: 1.6;
  white-space: pre-line;
  margin: 0 0 16px;
}

.mentoring-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  font-weight: 500;
  color: #000;
}

.status-chip {
  font-size: 12px;
  font-weight: 500;
  border-radius: 6px;
  padding: 6px 10px;
  line-height: 1.2;
}
.status-chip.open {
  background: #e8f8e8;
  color: #2a7a2a;
  border: 1px solid #bde8bd;
}
.status-chip.closed {
  background: #eee;
  color: #666;
  border: 1px solid #ccc;
}

/* 일반 Posts 카드 */
.feed-card {
  width: 255px;
  min-height: 400px;
  border-radius: 20px;
  background: #fff;
  box-shadow:
    0 20px 40px rgba(0,0,0,0.12),
    0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid rgba(0,0,0,0.05);
  padding:0;
  box-sizing: border-box;
  color: #000;
  text-align: left;
  display: flex;
  flex-direction: column;
}

/* 썸네일 (이미지 영역 크게) */
.feed-thumb {
  width: 100%;
  height: 190px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  background: #f5f5f5;
  border-bottom: 1px solid rgba(0,0,0,0.07);

  display: flex;
  align-items: center;
  justify-content: center;
}
.feed-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.thumb-fallback {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    #fafafa 0px,
    #fafafa 10px,
    #ebebeb 10px,
    #ebebeb 20px
  );
}

/* 텍스트/메타 영역 */
.feed-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 남은 세로공간 채워서 meta-row를 아래로 밀기 */
}

/* 제목 */
.feed-title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: #000;
  margin: 12px 0 8px;
  text-align: left;
  word-break: keep-all;
}

/* 본문 요약 */
.feed-desc {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: #000;
  margin: 0 0 12px;
  text-align: center;
  word-break: keep-all;

  display: -webkit-box;
  -webkit-line-clamp: 2;        /* 최대 2줄만 보이게 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 36px;             /* 내용 없어도 카드 안 찌그러지게 */
}

/* 좋아요 / 댓글 / 온도(🔥 xx%) 영역
   - margin-top:auto: 항상 카드 제일 아래 쪽에 위치하도록 밀어내기 */
.meta-row {
  margin-top: auto;
  justify-content: center;
  gap: 16px;
  flex-wrap: nowrap;
  font-size: 13px;
  color: #000;
}
</style>
