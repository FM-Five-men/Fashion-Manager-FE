<template>
  <section class="content-wrapper">
    <!-- 상단 배경 -->
    <div class="gradient-bg"></div>

    <!-- 탭 -->
    <div class="tabs-row">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'posts' }"
        @click="activeTab = 'posts'"
      >
        Posts
      </div>

      <div
        class="tab-item"
        :class="{ active: activeTab === 'mentoring' }"
        @click="activeTab = 'mentoring'"
      >
        Mentoring
      </div>
    </div>

    <!-- 카드 리스트 -->
    <div class="cards-row">
      <!-- 실제 데이터 있을 때 -->
      <template v-if="activeList.length > 0">
        <InfluencerPostCard
          v-for="(cardItem, idx) in activePageSlice"
          :key="activeTab + '-' + idx"
          :item="cardItem"
          :isMentoring="activeTab === 'mentoring'"
        />
      </template>

      <!-- 데이터 없을 때 (placeholder 카드 4개 렌더) -->
      <template v-else>
        <InfluencerPostCard
          v-for="n in 4"
          :key="'placeholder-' + n"
          :isMentoring="activeTab === 'mentoring'"
          :isEmpty="true"
        />
      </template>
    </div>

    <!-- 페이지네이션 -->
    <div class="search-and-pagination">
      <Pagination
        v-model:page="internalPage"
        :total-pages="computedTotalPages"
        class="custom-pagination-wrapper"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import axios from "axios";

import Pagination from "./Pagination.vue";
import InfluencerPostCard from "./InfluencerPostCard.vue";

const props = defineProps({
  memberNum: {
    type: [String, Number],
    required: false,
    default: null,
  },
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  searchKeyword: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:page", "update:searchKeyword", "search"]);

// 어떤 탭이 활성화되어 있는지
const activeTab = ref("posts");

// ✅ 화면에 실제로 그려지는 카드 배열들
const postCards = ref([]);        // Posts 탭에서 사용
const mentoringCards = ref([]);   // Mentoring 탭에서 사용  // 🆕 실제로 채울 예정

// 한 페이지에 보여줄 카드 개수
const PAGE_SIZE = 4;

/* ---------------------------------
   공통 카드 형태로 변환하는 유틸
   (InfluencerPostCard.vue가 기대하는 모양)
-----------------------------------*/
function mapPostBriefToCard(raw) {
  return {
    // 제목/본문 관련
    title: raw.title || "",
    desc: raw.desc || "",          // 아직 목록엔 desc 없으니까 아래에서 ""로 줄 거임
    body: raw.content || "",       // 혹시 content 같은 거 있으면 body에도 넣어두면 카드에서 fallback됨

    // 좋아요 / 댓글 수
    // 지금 패션 게시글에서 good, cheer 들어오잖아?
    likes: raw.good ?? raw.likes ?? 0,
    comments: raw.cheer ?? raw.comments ?? 0,

    // 🔥 온도 계산에 필요한 원본 숫자 그대로 내려준다
    good: raw.good ?? 0,
    cheer: raw.cheer ?? 0,

    // 썸네일
    imgUrl: raw.imgUrl || "",      // 나중에 썸네일 생기면 여기에
  };
}

/* ---------------------------------
   1) 패션 게시글 불러오기
   - /posts/fashion/all 에서 전체 받아옴
   - 현재 인플루언서(memberNum) 것만 필터
-----------------------------------*/
// (1) 개별 게시물 상세 불러오는 헬퍼
async function fetchPostDetail(postNum) {
  try {
    // 상세 API 경로는 실제 프로젝트에 맞춰줘
    // 예: /api/manager-service/posts/fashion/{num}
    const res = await axios.get(`/api/manager-service/posts/fashion/${postNum}`);
    return res.data ?? null;
  } catch (err) {
    console.error("❌ 상세 불러오기 실패:", postNum, err);
    return null;
  }
}

const fetchPostsForMember = async (memberNum) => {
  console.log("👤 fetchPostsForMember() 호출 with memberNum =", memberNum);
  if (!memberNum) {
    console.warn("⏸ memberNum 아직 없음, fetch 안 함");
    return;
  }

  try {
    console.log("📡 호출:", `/posts/fashion/all`);
    const res = await axios.get(`/api/manager-service/posts/fashion/all`);
    const allPosts = Array.isArray(res.data) ? res.data : [];

    // 현재 인플루언서 것만 필터
    const filtered = allPosts.filter(
      p => String(p.memberNum || p.member_num) === String(memberNum)
    );

    console.log("🎯 필터된 패션 게시물:", filtered);

    // (2) 각 게시물에 대해 상세까지 가져와서 content, imgUrl 같은 추가 정보를 합친다
    const enrichedList = [];
    for (const p of filtered) {
      const detail = await fetchPostDetail(p.num); // 상세 조회

      // detail이 있으면 그 안에서 content / imgUrl 같은 추가 필드를 가져와서 p에 합친다
      const merged = {
        ...p,
        content: detail?.content || "",   // 본문 텍스트
        imgUrl: detail?.imgUrl || "",     // 썸네일(있다면)
      };

      enrichedList.push(merged);
    }

    // (3) 이 enriched 데이터를 카드에서 쓰는 형태로 변환
    const mappedCards = enrichedList.map(postObj => mapPostBriefToCard(postObj));

    // 최종 카드 리스트 반영
    postCards.value = mappedCards;
  } catch (err) {
    console.error("❌ 패션 게시물 불러오기 실패:", err);
    postCards.value = [];
  }
};


/* ---------------------------------
   2) 멘토링 게시글 불러오기          // 🆕 추가됨
   - /posts/mentoring/all 에서 전체 받아옴
   - authorNum(작성자 번호)로 필터
-----------------------------------*/
const fetchMentoringForMember = async (memberNum) => {
  console.log("👤 fetchMentoringForMember() 호출 with memberNum =", memberNum);
  if (!memberNum) return;

  try {
    console.log("📡 호출: /posts/mentoring/all");
    const res = await axios.get(`/api/manager-service/posts/mentoring/all`);
    const allMentoring = Array.isArray(res.data) ? res.data : [];

    // authorNum 기준으로 이 인플루언서 것만 필터
    const mine = allMentoring.filter(
      m => String(m.authorNum || m.author_num) === String(memberNum)
    );

    console.log("🎯 필터된 멘토링 글:", mine);

 const mapped = mine.map(m => {
  // 멘토링 본문 후보를 우선순위로 뽑는다
  // 백엔드에서 어떤 키로 보내는지 정확히 모르니까
  // m.content / m.body / m.desc / m.detail 중에서 먼저 있는 값 사용
  const rawBody =
    (m.content && String(m.content).trim()) ||
    (m.body && String(m.body).trim()) ||
    (m.desc && String(m.desc).trim()) ||
    (m.detail && String(m.detail).trim()) ||
    ""; // 아무것도 없으면 빈 문자열

  // 화면에 보여줄 body 최종값
  const bodyText =
    rawBody !== ""
      ? rawBody
      : "";

      return {
        // 상단 영역
        nickname: m.memberName || "익명",
        level: m.levelText || "Lv.3", // 레벨 값이 있으면 m.levelText 같은 걸 쓰고, 없으면 그대로 "Lv.3"
        createdAtText: m.createdAtText || "3시간 전", // 나중에 m.created_at 들어오면 상대시간으로 치환 가능

        // 본문 영역
        title: m.title || "",
        body: bodyText, // ✅ 이제 실제 내용을 우선 넣는다

        // 하단 영역(좋아요/댓글 등)
        likes: m.likes ?? 0,
        comments: m.comments ?? 0,

        statusText: m.finish === 1 ? "마감" : "모집중",
        statusTone: m.finish === 1 ? "closed" : "open",
      };
    });

    mentoringCards.value = mapped;
  } catch (err) {
    console.error("❌ 멘토링 글 불러오기 실패:", err);
    mentoringCards.value = [];
  }
};

/* ---------------------------------
   현재 탭에서 보여줄 전체 리스트
   posts 탭이면 postCards,
   mentoring 탭이면 mentoringCards
-----------------------------------*/
const activeList = computed(() => {
  return activeTab.value === "posts"
    ? postCards.value
    : mentoringCards.value;
});

/* ---------------------------------
   총 페이지 수 계산
-----------------------------------*/
const computedTotalPages = computed(() => {
  const len = activeList.value.length;
  if (len === 0) return 1;
  return Math.ceil(len / PAGE_SIZE);
});

/* ---------------------------------
   부모에게 바인딩되는 page 값을
   내부에서 안전하게 읽고/업데이트
-----------------------------------*/
const internalPage = computed({
  get() {
    const safePage =
      props.page > computedTotalPages.value
        ? computedTotalPages.value
        : props.page;
    return safePage < 1 ? 1 : safePage;
  },
  set(val) {
    let next = val;
    if (next < 1) next = 1;
    if (next > computedTotalPages.value) next = computedTotalPages.value;
    emit("update:page", next);
  },
});

/* ---------------------------------
   현재 페이지에서 보여줄 슬라이스 (4개씩)
-----------------------------------*/
const activePageSlice = computed(() => {
  const start = (internalPage.value - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return activeList.value.slice(start, end);
});

/* ---------------------------------
   탭을 바꾸면 페이지를 1로 초기화
-----------------------------------*/
watch(activeTab, () => {
  emit("update:page", 1);
});

/* ---------------------------------
   memberNum(인플루언서 번호) 감시
   - 값이 준비되면 두 종류 데이터 모두 불러옴
   - immediate:true 때문에 최초 마운트 시도도 한 번 실행됨
-----------------------------------*/
watch(
  () => props.memberNum,
  (newVal) => {
    if (
      newVal === null ||
      newVal === undefined ||
      newVal === ""
    ) {
      return;
    }

    // 🔸 여기서 두 가지 다 호출
    fetchPostsForMember(newVal);        // 패션 게시글 로드
    fetchMentoringForMember(newVal);    // 멘토링 게시글 로드  // 🆕
  },
  { immediate: true }
);

onMounted(() => {
  // onMounted에서 별도로 호출할 필요는 없음.
  // memberNum watch가 모든 걸 처리함.
});
</script>

<style scoped>
.content-wrapper {
  width: 100%;
  position: relative;
  margin-top: 64px;
  padding-top: 16px;
  background: transparent;
}
gradient-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%); /* 화면 가운데 정렬 */
  width: 100vw;                /* 화면 전체 가로로 꽉 */
  height: 720px;               /* 카드 밑부분까지 충분히 덮음 */
  pointer-events: none;

  background: linear-gradient(
     to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 245, 245, 0.9) 40%,
    rgba(200, 200, 200, 0.3) 75%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 0;
}
.content-wrapper {
  position: relative;
  z-index: 1;
  background: transparent; /* <- 이게 혹시 white로 돼 있으면 transparent로 바꿔야 함 */
}

.tabs-row {
  position: relative;
  width: 160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 20px;
  color: #000;
}
.tab-item {
  cursor: pointer;
  color: #777;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: all 0.15s ease;
}
.tab-item.active {
  color: #000;
  border-bottom: 1px solid #000;
  font-weight: 500;
}

/* 카드 한 줄 가운데 정렬 */
.cards-row {
  position: relative;
  margin-top: 24px;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;

  max-width: 1100px;
  padding: 0 24px;
  margin-left: auto;
  margin-right: auto;

  min-height: 250px;
  box-sizing: border-box;
}

.search-and-pagination {
  position: relative;
  margin: 40px auto 0;
  width: 896px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.custom-pagination-wrapper {
  align-self: center;
}
</style>
