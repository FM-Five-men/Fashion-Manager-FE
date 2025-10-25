<template>
  <div class="influencer-profile-page">
    <header class="header-wrapper">
      <HeaderView />
    </header>

    <main class="page-main">
      <!-- 상단 프로필 영역 -->
      <!-- ✅ 팔로우 상태 내려줌 -->
      <!-- ✅ 팔로우 버튼 눌렀을 때 실행 -->
      <InfluencerHeaderSection
        :influencer="influencer"
        :formatted-bio="formattedBio"
        :is-followed="isFollowed"       
        @toggle-follow="toggleFollow"   
        @apply="applyMentoring"
      />

      <!-- 하단 포스트/멘토링 + 검색/페이지네이션 영역 -->
      <!-- ✅ 섹션 간 간격 (임시로 유지 가능) -->
      <InfluencerContentSection
        style="margin-top: 60px"          
        :highlight-posts="highlightPosts"
        v-model:page="page"
        :total-pages="totalPages"
        v-model:search-keyword="searchKeyword"
        @search="onSearch"
      />
    </main>

    <footer>
      <FooterView />
    </footer>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import HeaderView from "../../HeaderView.vue";
import FooterView from "../../FooterView.vue";
import InfluencerHeaderSection from "../02_ui/InfluencerHeaderSection.vue";
import InfluencerContentSection from "../02_ui/InfluencerContentSection.vue";

// 게이트웨이 경로 그대로 유지
const API_URL = "/api/manager-service/influencerPage/selectInfluencerPage";

// 라우터 가져오기 (이제 props 안 쓸 거야)
const route = useRoute();

// -----------------------------
// 상태 정의
// -----------------------------
const influencer = ref({
  name: "",
  subtitle: "",
  bio: "",
  handle: "",
  phone: "",
  instagram: "",
  canApply: false,
  likes: 0,
  cheers: 0,
  badges: [],
  mainImageUrl: "",
});

const isFollowed = ref(false);

const highlightPosts = ref([]);
const page = ref(1);
const totalPages = ref(10);
const searchKeyword = ref("");

// -----------------------------
// computed - 줄바꿈 변환
// -----------------------------
const formattedBio = computed(() =>
  (influencer.value.bio || "").replace(/\n/g, "<br />")
);

// -----------------------------
// 사용자 액션 핸들러
// -----------------------------
const toggleFollow = () => {
  // ✅ 팔로우 ↔ 언팔로우 토글
  isFollowed.value = !isFollowed.value;

  // (선택) 서버에 팔로우/언팔로우 API 날리려면 여기서 분기 가능
  // ex)
  // if (isFollowed.value) {
  //   axios.post('/api/follow', { memberNum: ... })
  // } else {
  //   axios.post('/api/unfollow', { memberNum: ... })
  // }
};

const applyMentoring = () => {
  console.log("멘토링 신청 클릭됨 (memberNum):", route.params.num || route.query.num);
};

const onSearch = () => {
  console.log("검색 실행:", searchKeyword.value);
};

// -----------------------------
// API 호출: 인플루언서 상세 조회
// -----------------------------
const fetchInfluencerDetail = async () => {
  try {
    const memberNum = route.params.num || route.query.num;

    console.log("[Axios 요청 시작] memberNum =", memberNum);

    const res = await axios.get(API_URL, {
      params: { memberNum },
    });

    console.log("[Axios 응답]", res.data);

    const data = Array.isArray(res.data) ? res.data[0] : res.data;

    if (!data) {
      console.warn("⚠️ 해당 인플루언서를 찾을 수 없습니다.");
      return;
    }

    // ✅ mainImageUrl 안전하게 계산
    let mainImage = "";

    if (data.photoPaths) {
      // case 1: "a.jpg,b.jpg"
      if (typeof data.photoPaths === "string") {
        mainImage = data.photoPaths.split(",")[0];
      }
      // case 2: ["a.jpg","b.jpg"]
      else if (Array.isArray(data.photoPaths)) {
        mainImage = data.photoPaths[0] || "";
      }
      // case 3: { path: "..."} 같은 객체
      else if (typeof data.photoPaths === "object" && data.photoPaths !== null) {
        if (data.photoPaths.path) {
          mainImage = data.photoPaths.path;
        } else if (data.photoPaths.url) {
          mainImage = data.photoPaths.url;
        }
      }
    }

    // ✅ 상태 세팅
    influencer.value = {
      name: data.memberName || "",
      subtitle: data.title || "",
      bio: data.content || "",
      handle: data.insta || "",
      phone: data.phone || "",
      instagram: data.insta || "",
      likes: data.likes ?? 0,
      cheers: data.cheers ?? 0,
      mainImageUrl: mainImage || influencer.value.mainImageUrl || "",
      canApply: true,
      badges: data.badges || [], // <-- 🔥 이 줄 추가
    };
  } catch (err) {
    console.error("❌ 인플루언서 상세 조회 실패:", err);
  }
};

// -----------------------------
// onMounted - 최초 실행 시점
// -----------------------------
onMounted(() => {
  // ✅ URL에 썸네일 미리보기(thumbnail)용으로 thumb이 있을 때 먼저 보여주기
  if (route.query.thumb) {
    influencer.value.mainImageUrl = route.query.thumb;
  }

  // ✅ 그리고 실제 상세 정보 요청
  fetchInfluencerDetail();
});
</script>

<style scoped>
.influencer-profile-page {
  background-color: #ffffff;
  min-width: 1440px;
  max-width: 1440px;
  margin: 0 auto;
}

.page-main {
  position: relative;
  width: 100%;
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

</style>
