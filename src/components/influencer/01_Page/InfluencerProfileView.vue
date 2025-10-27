<template>
  <div class="influencer-profile-page">
    <header class="header-wrapper">
      <HeaderView />
    </header>

    <main class="page-main">
      <!-- 상단 프로필 -->
      <InfluencerHeaderSection
        :influencer="influencer"
        :formatted-bio="formattedBio"
        :is-followed="isFollowed"
        @toggle-follow="toggleFollow"
        @apply="applyMentoring"
      />

      <!-- 하단 카드/탭 -->
      <InfluencerContentSection
        class="content-block"
        :member-num="influencer.memberNum"
        :highlight-posts="highlightPosts"
        v-model:page="page"
        :total-pages="totalPages"
        v-model:searchKeyword="searchKeyword"
        @search="onSearch"
      />
    </main>

    <footer>
      <FooterView />
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"; // 🔸 watch 유지
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import HeaderView from "../../HeaderView.vue";
import FooterView from "../../FooterView.vue";
import InfluencerHeaderSection from "../02_ui/InfluencerHeaderSection.vue";
import InfluencerContentSection from "../02_ui/InfluencerContentSection.vue";

const route = useRoute();
const router = useRouter();

/* ─────────────────────────────
   상단 인플루언서 프로필 상태
───────────────────────────── */
const influencer = ref({
  memberNum: null,
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

/* ─────────────────────────────
   하단 카드 영역 (게시물 리스트)
───────────────────────────── */
const highlightPosts = ref([]); // ContentSection 으로 내려갈 카드들
const page = ref(1);
const totalPages = ref(1);
const searchKeyword = ref("");

const formattedBio = computed(() =>
  (influencer.value.bio || "").replace(/\n/g, "<br />")
);

function toggleFollow() {
  isFollowed.value = !isFollowed.value;
}

function applyMentoring() {
  router.push("/menteeapply");
}

function onSearch(payload) {
  console.log("검색 요청:", payload);
}

/* ─────────────────────────────
   유틸: 기본(랜덤) 프로필 이미지 선택
   public/images/influencer_page/influencerImg1~8.png 가 있다고 가정
───────────────────────────── */
// 🆕 추가
function getRandomFallbackImage() {
  const idx = Math.floor(Math.random() * 8) + 1; // 1~8
  // Vite 기준 public 폴더는 / 로 접근 가능
  return `/images/influencer_page/influencerImg${idx}.png`;
}

/* ─────────────────────────────
   1. 인플루언서 상세 불러오기
───────────────────────────── */
async function fetchInfluencerDetail() {
  try {
    const memberNum = route.params.num || route.query.num;

    const res = await axios.get(
      "/api/manager-service/influencerPage/selectInfluencerPage",
      { params: { memberNum } }
    );

    const dataArr = Array.isArray(res.data) ? res.data : [res.data];
    const data = dataArr[0];
    if (!data) {
      // 만약 데이터 자체가 없으면 fallback 채운 기본값으로 세팅
      influencer.value = {
        memberNum: null,
        name: "",
        subtitle: "",
        bio: "",
        handle: "",
        phone: "",
        instagram: "",
        likes: 0,
        cheers: 0,
        mainImageUrl: getRandomFallbackImage(), // 🆕 fallback
        canApply: false,
        badges: [],
      };
      return;
    }

    // 서버에서 대표 이미지 후보를 최대한 뽑는다
    let mainImage = "";
    if (data.photoPaths) {
      if (typeof data.photoPaths === "string") {
        // "a.jpg,b.jpg" 형태면 첫 번째만
        mainImage = data.photoPaths.split(",")[0];
      } else if (Array.isArray(data.photoPaths)) {
        // ["a.jpg", "b.jpg", ...] 면 첫 번째
        mainImage = data.photoPaths[0] || "";
      } else if (
        typeof data.photoPaths === "object" &&
        data.photoPaths !== null
      ) {
        // { path: "..."} 또는 { url: "..."} 식일 수도 있음
        if (data.photoPaths.path) {
          mainImage = data.photoPaths.path;
        } else if (data.photoPaths.url) {
          mainImage = data.photoPaths.url;
        }
      }
    }

    // 이미지 없으면 랜덤 썸네일로 대체
    // 🔸 변경: fallback 강제 적용
    if (!mainImage || mainImage.trim() === "") {
      mainImage = getRandomFallbackImage();
    }

    influencer.value = {
      memberNum: data.memberNum,
      name: data.memberName || "",
      subtitle: data.title || "",
      bio: data.content || "",
      handle: data.insta || "",
      phone: data.phone || "",
      instagram: data.insta || "",
      likes: data.likes ?? 0,
      cheers: data.cheers ?? 0,
      mainImageUrl: mainImage, // 🔸 비어있으면 랜덤 들어감
      canApply: true,
      badges: data.badges || [],
    };
  } catch (err) {
    console.error("❌ 인플루언서 상세 조회 실패:", err);

    // 🔸 에러가 나도 최소한 화면은 안 깨지게 기본값 세팅
    influencer.value = {
      memberNum: null,
      name: "",
      subtitle: "",
      bio: "",
      handle: "",
      phone: "",
      instagram: "",
      likes: 0,
      cheers: 0,
      mainImageUrl: getRandomFallbackImage(), // 🆕 fallback
      canApply: false,
      badges: [],
    };
  }
}

/* ─────────────────────────────
   2. 인플루언서가 올린 게시물(Posts 탭) 가져오기
───────────────────────────── */
async function fetchPostsForMember(memberNum) {
  try {
    // 전체 게시물 목록 받아오기
    const listRes = await axios.get(
      "/api/manager-service/posts/fashion/all"
    );
    const allPosts = listRes.data || [];

    // 이 멤버가 쓴 글만 필터
    // memberNum / member_num 등 케이스 다 대응
    const mine = allPosts.filter(
      (p) => String(p.memberNum || p.member_num) === String(memberNum)
    );

    // 최대 4개만 사용 (UI 상 한 줄에 4장)
    const topFour = mine.slice(0, 4);
    const enriched = [];

    for (const post of topFour) {
      try {
        // 게시물 상세 불러오기
        const detailRes = await axios.get(
          `/api/manager-service/posts/fashion/${post.num}`
        );
        const d = detailRes.data;

        // 대표 이미지 후보 (photos 배열, 혹은 photo_path류)
        const thumbPhoto =
          Array.isArray(d.photos) && d.photos.length > 0
            ? d.photos[0].imageUrl || d.photos[0].path || ""
            : d.photo_path || d.photoPath || "";

        enriched.push({
          title: d.title || post.title || "",
          desc: d.content || "", // 본문 요약
          imgUrl: thumbPhoto || "",

          // 좋아요/댓글/온도 등 메타
          likes: d.good ?? post.good ?? 0,
          comments: d.cheer ?? post.cheer ?? 0,
          hotRate:
            d.temp !== undefined && d.temp !== null
              ? Math.round(d.temp) + "%"
              : "0%",

          postNum: d.num,
          memberNum: d.memberNum || d.member_num,
        });
      } catch (innerErr) {
        console.warn("게시물 상세 조회 실패:", innerErr);

        enriched.push({
          title: post.title || "",
          desc: "",
          imgUrl: "",
          likes: post.good ?? 0,
          comments: post.cheer ?? 0,
          hotRate: "0%",
          postNum: post.num,
          memberNum: post.memberNum || post.member_num,
        });
      }
    }

    highlightPosts.value = enriched;
    totalPages.value = Math.max(1, Math.ceil(enriched.length / 4));
  } catch (err) {
    console.error("❌ 게시물 목록 조회 실패:", err);
  }
}

/* ─────────────────────────────
   mount + memberNum 감시
───────────────────────────── */
onMounted(async () => {
  // 먼저 인플루언서 정보(=> memberNum)를 채운다
  await fetchInfluencerDetail();
  // 게시물 로딩은 watch에서 처리 (memberNum 준비된 뒤 동작)
});

// 🔸 memberNum 변할 때마다 게시물 로드
watch(
  () => influencer.value.memberNum,
  async (newVal) => {
    if (newVal) {
      await fetchPostsForMember(newVal);
    }
  }
);
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
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
}

.header-wrapper :deep(header),
.header-wrapper :deep(.header) {
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  left: 0 !important;
  right: 0 !important;
}

.content-block {
  margin-top: 60px;
}
</style>
