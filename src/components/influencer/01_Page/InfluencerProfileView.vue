<template>
  <div class="influencer-profile-page">
    <!-- 항상 헤더 -->
    <header class="header-wrapper">
      <HeaderView />
    </header>

    <!-- ====================== -->
    <!-- 보기 모드 -->
    <!-- ====================== -->
    <template v-if="!isEditMode">
      <main class="page-main">
        <section class="profile-top-section">
          <div class="profile-top-inner">
            <!-- 상단 프로필 카드 -->
            <InfluencerHeaderSection
              :influencer="influencer"
              :formatted-bio="formattedBio"
              :is-followed="isFollowed"
              @toggle-follow="toggleFollow"
              @apply="applyMentoring"
            />

            <!-- 수정 버튼 -->
            <button
              v-if="isMyPage"
              class="edit-btn edit-btn-floating"
              @click="enterEditMode"
            >
              수정하기
            </button>
          </div>
        </section>

        <!-- 하단 컨텐츠 (게시물 등) -->
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

      <footer class="footer-wrapper">
        <FooterView />
      </footer>
    </template>

    <!-- ====================== -->
    <!-- 수정 모드 -->
    <!-- ====================== -->
    <template v-else>
      <div class="apply-canvas">
        <!-- 배너 -->
        <section class="hero-banner" :style="heroBgStyle">
          <div class="hero-overlay">
            <div class="hero-inner">
              <div class="hero-icon">
                <span class="hero-icon-star">★</span>
              </div>

              <h1 class="hero-title">인플루언서 페이지 수정</h1>
              <p class="hero-sub">프로필 정보를 업데이트하세요.</p>
              <p class="hero-desc">
                소개, 연락처, 인스타그램, 대표 이미지를 관리할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <!-- 본문 카드 -->
        <main class="content-wrapper">
          <section class="form-card">
            <h2 class="edit-page-title">
              인플루언서 페이지
              {{ editForm.pageNum ? "수정" : "작성" }}
            </h2>

            <!-- 상단: 왼쪽 이미지 / 오른쪽 정보 -->
            <div class="top-row">
              <!-- 왼쪽 이미지 영역 -->
              <div class="image-column">
                <div class="image-preview-box" @click="triggerFileInput">
                  <div v-if="existingImages.length > 0" class="current-image-block">
                    <img :src="existingImages[0].url" class="current-image" />
                    <label class="remove-check-inline">
                      <input
                        type="checkbox"
                        v-model="existingImages[0].markedForDelete"
                      />
                      삭제
                    </label>
                  </div>
                  <div v-else class="empty-image-block">
                    <span class="upload-icon">⬆</span>
                    <span class="upload-text">클릭하여 이미지 업로드</span>
                  </div>

                  <input
                    ref="fileInputRef"
                    class="hidden-file-input"
                    type="file"
                    multiple
                    @change="onSelectNewImages"
                  />
                </div>

                <p class="image-hint">
                  1:1 비율의 프로필 이미지를 업로드해주세요.
                </p>

                <!-- 새로 추가한 이미지들 미리보기 -->
                <div v-if="newImages.length > 0" class="new-preview-list">
                  <div
                    v-for="(imgObj, idx) in newImages"
                    :key="idx"
                    class="new-preview-item"
                  >
                    <img :src="imgObj.previewUrl" class="new-preview-thumb" />
                    <button class="remove-new-btn" @click="removeNewImage(idx)">
                      X
                    </button>
                  </div>
                </div>
              </div>

              <!-- 오른쪽 정보 인풋 -->
              <div class="info-column">
                <div class="info-grid">
                  <div class="field-block">
                    <label class="field-label">이름</label>
                    <input
                      class="field-input"
                      type="text"
                      v-model="editForm.memberName"
                      disabled
                    />
                  </div>

                  <div class="field-block">
                    <label class="field-label">회원 번호</label>
                    <input
                      class="field-input"
                      type="text"
                      :value="editForm.memberNum"
                      disabled
                    />
                  </div>

                  <div class="field-block">
                    <label class="field-label">연락처</label>
                    <input
                      class="field-input"
                      type="text"
                      v-model="editForm.phone"
                      placeholder="010-0000-0000"
                    />
                  </div>

                  <div class="field-block">
                    <label class="field-label">이메일</label>
                    <input
                      class="field-input"
                      type="text"
                      v-model="editForm.email"
                      disabled
                    />
                  </div>

                  <div class="field-block">
                    <label class="field-label">페이지 제목</label>
                    <input
                      class="field-input"
                      type="text"
                      v-model="editForm.title"
                      placeholder="나만의 스타일링 공간"
                    />
                  </div>

                  <div class="field-block">
                    <label class="field-label">인스타그램</label>
                    <input
                      class="field-input"
                      type="text"
                      v-model="editForm.insta"
                      placeholder="@your_handle"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr class="divider" />

            <!-- 소개 -->
            <div class="bottom-row">
              <div class="bottom-field-block full-width">
                <div class="bottom-field-header">
                  <span class="bottom-field-label">소개 / 한줄 설명</span>
                </div>
                <textarea
                  class="intro-textarea"
                  v-model="editForm.content"
                  placeholder="어떤 스타일링을 해주는 사람인지 적어주세요."
                ></textarea>
              </div>
            </div>

            <!-- 버튼 -->
            <div class="action-row">
              <button class="btn-cancel" @click="cancelEdit">
                취소
              </button>
              <button
                class="btn-save"
                :disabled="isSubmitting"
                @click="saveEdit"
              >
                {{ editForm.pageNum ? "수정 완료" : "작성 완료" }}
              </button>
            </div>
          </section>
        </main>

        <footer class="footer-wrapper">
          <FooterView />
        </footer>
      </div>
    </template>

    <!-- 공용 모달 -->
    <div v-if="showModal" class="modal-dim">
      <div class="modal-card">
        <p class="modal-message">{{ modalMessage }}</p>
        <div class="modal-actions">
          <button class="modal-ok-btn" @click="closeModal">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import HeaderView from "../../HeaderView.vue";
import FooterView from "../../FooterView.vue";
import InfluencerHeaderSection from "../02_ui/InfluencerHeaderSection.vue";
import InfluencerContentSection from "../02_ui/InfluencerContentSection.vue";

const route = useRoute();
const router = useRouter();

const token = sessionStorage.getItem("token");

// URL에서 보고 있는 프로필의 주인 번호
const memberNumParam =
  route.params.memberNum || route.params.num || route.query.num || "";

// 로그인한(=나) 정보
const viewerMemberNum = ref("");
const viewerName = ref("");
const viewerEmail = ref("");

// 보기 모드 상태 (현재 화면에 보여줄 인플루언서 정보)
const influencer = ref({
  memberNum: "",
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
  email: "",
  pageNum: null,
});

const isFollowed = ref(false);

// 하단 게시물
const highlightPosts = ref([]);
const page = ref(1);
const totalPages = ref(1);
const searchKeyword = ref("");

// 수정 모드 플래그
const isEditMode = ref(false); // 초기엔 보기 모드
const isSubmitting = ref(false);

// 수정용 폼 상태
const editForm = reactive({
  pageNum: null,
  memberNum: null,
  memberName: "",
  email: "",
  phone: "",
  title: "",
  content: "",
  insta: "",
});

// 이미지 관리 상태
const existingImages = ref([]); // [{ photoNum, url, markedForDelete }]
const newImages = ref([]); // [{ file, previewUrl }]
const fileInputRef = ref(null);

// 모달
const showModal = ref(false);
const modalMessage = ref("");

// =========================
// computed / helpers
// =========================

// 보기 모드 카드에서 줄바꿈 유지용
const formattedBio = computed(() =>
  (influencer.value.bio || "").replace(/\n/g, "<br />")
);

// 로그인한 사용자 == 이 페이지 주인 ?
const isMyPage = computed(() => {
  return (
    viewerMemberNum.value &&
    influencer.value.memberNum &&
    String(viewerMemberNum.value) === String(influencer.value.memberNum)
  );
});

function toggleFollow() {
  isFollowed.value = !isFollowed.value;
}

function onSearch(payload) {
  console.log("검색 요청:", payload);
}

function applyMentoring() {
  console.log("멘토링 신청 클릭!");
}

// fallback 이미지
function getRandomFallbackImage() {
  const idx = Math.floor(Math.random() * 8) + 1; // 1~8
  return `/images/influencer_page/influencerImg${idx}.png`;
}

// =========================
// auth 관련
// =========================

// 로그인 인증해서 내 memberNum 얻기
async function fetchAuth() {
  try {
    const res = await axios.get("/api/member-service/member/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 로그인 안 되어있으면 홈으로
    if (res.data.memberId == null) {
      router.push("/");
      return null;
    }

    // 백엔드마다 키가 다를 수 있으니까 우선순위로 찾는다
    let resolvedNum = null;
    if (res.data.memberNum != null) {
      resolvedNum = String(res.data.memberNum);
    } else if (res.data.userNum != null) {
      resolvedNum = String(res.data.userNum);
    } else {
      resolvedNum = String(res.data.memberId);
    }

    return { ok: true, memberNum: resolvedNum };
  } catch (err) {
    console.error("❌ /member/auth 실패:", err);
    router.push("/");
    return null;
  }
}

// 내 프로필 상세 (이름/이메일). 연락처까지 필요하면 백엔드에 맞춰서 확장 가능.
async function fetchViewerProfile(num) {
  try {
    const res = await axios.get("/api/member-service/member/selectResult", {
      params: { userNum: num },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    viewerMemberNum.value = res.data.userNum ?? num ?? "";
    viewerName.value = res.data.userName ?? "";
    viewerEmail.value = res.data.userEmail ?? "";
  } catch (err) {
    console.error("❌ viewer profile 불러오기 실패:", err);
    viewerMemberNum.value = num ?? "";
  }
}

// =========================
// 인플루언서 페이지 정보 로드
// =========================

async function fetchInfluencerDetail() {
  try {
    // 1) 이 멤버에 대한 인플루언서 페이지들 전부 가져오기
    const pageRes = await axios.get(
      "/api/manager-service/influencerPage/selectInfluencerPage",
      { params: { memberNum: memberNumParam } }
    );

    // 안전하게 배열 형태로 정규화
    const pageArr = Array.isArray(pageRes.data) ? pageRes.data : [pageRes.data];

    // 🔥 같은 memberNum 것들만 추리고
    const mineOnly = pageArr.filter(
      (item) => String(item.memberNum) === String(memberNumParam)
    );

    // 🔥 그 중에서 num(페이지 id)이 가장 큰 = 가장 최신 데이터 선택
    // (num이 증가형 PK라고 가정)
    let pageData = null;
    if (mineOnly.length > 0) {
      pageData = mineOnly.reduce((acc, cur) => {
        if (!acc) return cur;
        return cur.num > acc.num ? cur : acc;
      }, null);
    }

    // 2) 멤버 목록에서 이름/뱃지 가져오기
    const memberRes = await axios.get(
      "/api/member-service/member/list",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const members = Array.isArray(memberRes.data) ? memberRes.data : [];
    const matchedUser = members.find(
      (u) => String(u.userNum) === String(memberNumParam)
    );

    // 3) 대표 이미지 URL 만들기
    // 서버에서 photoPaths: ["/images/influencer_page/xxxx.jpg", ...]
    let mainImage = "";
    if (
      pageData &&
      Array.isArray(pageData.photoPaths) &&
      pageData.photoPaths.length > 0
    ) {
      const basePrefix = "/api/manager-service"; // 프록시 기준 prefix
      const rawPath = pageData.photoPaths[0];     // 첫 번째 이미지를 대표로 사용
      mainImage = rawPath.startsWith("/")
        ? `${basePrefix}${rawPath}`
        : `${basePrefix}/${rawPath}`;
    }

    // 이미지가 전혀 없으면 fallback
    if (!mainImage || mainImage.trim() === "") {
      mainImage = getRandomFallbackImage();
    }

    // 4) pageData가 아예 없는 경우 (아직 페이지를 한 번도 안 만든 유저)
    if (!pageData) {
      influencer.value = {
        memberNum: memberNumParam,
        name: matchedUser?.userName || "",
        subtitle: "",
        bio: "",
        handle: "",
        phone: "",
        instagram: "",
        likes: 0,
        cheers: 0,
        badges: matchedUser?.badges?.map((b) => b.badgeName) || [],
        mainImageUrl: mainImage,
        canApply: true,
        email: matchedUser?.userEmail || "",
        pageNum: null,
      };
      existingImages.value = [];
      return;
    }

    // 5) pageData가 있는 경우 → 화면에 뿌릴 influencer 세팅
    influencer.value = {
      memberNum: pageData.memberNum,
      name: pageData.memberName || matchedUser?.userName || "",
      subtitle: pageData.title || "",
      bio: pageData.content || "",
      handle: pageData.insta || "",
      phone: pageData.phone || "",
      instagram: pageData.insta || "",
      likes: pageData.likes ?? 0,
      cheers: pageData.cheers ?? 0,
      mainImageUrl: mainImage,
      canApply: true,
      badges:
        (matchedUser?.badges?.map((b) => b.badgeName)) ||
        pageData.badges ||
        [],
      email: matchedUser?.userEmail || pageData.email || "",
      // ⚠ pageNum은 수정 저장할 때 같이 보내줄 고유키로 써야 하니까
      //   우리가 고른 최신 row의 num을 pageNum으로 쓴다.
      pageNum: pageData.num ?? pageData.pageNum ?? null,
    };

    // // 6) 수정 모드용 기존 이미지들
    // // 백엔드에서 pageData.photos가 없고 photoPaths만 오는 형태니까,
    // // photoPaths 기반으로 existingImages 채워준다.
    // if (
    //   Array.isArray(pageData.photoPaths) &&
    //   pageData.photoPaths.length > 0
    // ) {
    //   existingImages.value = pageData.photoPaths.map((p, idx) => {
    //     const basePrefix = "/api/manager-service";
    //     const fullUrl = p.startsWith("/")
    //       ? `${basePrefix}${p}`
    //       : `${basePrefix}/${p}`;
    //     return {
    //       photoNum: idx, // 서버에서 진짜 photoNum 주면 그걸로 바꿔주면 더 정확함
    //       url: fullUrl,
    //       markedForDelete: false,
    //     };
    //   });
    // } else {
    //   existingImages.value = [];
    // }
  } catch (err) {
    console.error("❌ 인플루언서 상세 조회 실패:", err);

    // 완전 실패했을 때 기본값
    influencer.value = {
      memberNum: memberNumParam ?? null,
      name: "",
      subtitle: "",
      bio: "",
      handle: "",
      phone: "",
      instagram: "",
      likes: 0,
      cheers: 0,
      mainImageUrl: getRandomFallbackImage(),
      canApply: false,
      badges: [],
      email: "",
      pageNum: null,
    };
    existingImages.value = [];
  }
}

// =========================
// 게시글 로드
// =========================

async function fetchPostsForMember(memberNum) {
  try {
    const listRes = await axios.get(
      "/api/manager-service/posts/fashion/all"
    );
    const allPosts = listRes.data || [];

    const mine = allPosts.filter(
      (p) => String(p.memberNum || p.member_num) === String(memberNum)
    );

    const topFour = mine.slice(0, 4);

    const enriched = [];
    for (const post of topFour) {
      try {
        const detailRes = await axios.get(
          `/api/manager-service/posts/fashion/${post.num}`
        );
        const d = detailRes.data;

        const thumbPhoto =
          Array.isArray(d.photos) && d.photos.length > 0
            ? d.photos[0].imageUrl ||
              d.photos[0].path ||
              ""
            : d.photo_path || d.photoPath || "";

        enriched.push({
          title: d.title || post.title || "",
          desc: d.content || "",
          imgUrl: thumbPhoto || "",
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

// =========================
// 수정 모드 진입 / 취소
// =========================

function enterEditMode() {
  editForm.pageNum   = influencer.value.pageNum ?? null;     // 이제는 num 값이 들어있을 것
  editForm.memberNum = influencer.value.memberNum ?? memberNumParam ?? null;
  editForm.memberName = influencer.value.name ?? "";
  editForm.email      = influencer.value.email ?? "";
  editForm.phone      = influencer.value.phone ?? "";
  editForm.title      = influencer.value.subtitle ?? "";
  editForm.content    = influencer.value.bio ?? "";
  editForm.insta      = influencer.value.instagram ?? "";

  newImages.value = [];
  isEditMode.value = true;
}

function cancelEdit() {
  isEditMode.value = false;
}

// =========================
// 이미지 업로드
// =========================

function triggerFileInput() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function onSelectNewImages(e) {
  const files = Array.from(e.target.files || []);
  files.forEach((file) => {
    const previewUrl = URL.createObjectURL(file);
    newImages.value.push({ file, previewUrl });
  });
}

function removeNewImage(idx) {
  newImages.value.splice(idx, 1);
}

// =========================
// 저장 (PUT)
// =========================

async function saveEdit() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;

  try {
    // 삭제 체크된 기존 이미지들 번호 수집
    const deletePhotoNums = existingImages.value
      .filter((img) => img.markedForDelete)
      .map((img) => img.photoNum);

    // FormData 구성
    const fd = new FormData();
    if (editForm.pageNum != null) {
      fd.append("pageNum", editForm.pageNum);
    }
    fd.append("memberNum", editForm.memberNum);
    fd.append("phone", editForm.phone);        // 백엔드에서 기대하는 key 확인 필요
    fd.append("title", editForm.title);
    fd.append("content", editForm.content);
    fd.append("insta", editForm.insta ?? "");  // 백엔드에서 insta 필드 받는지 확인

    deletePhotoNums.forEach((num) => {
      fd.append("deletePhotoNums", num);
    });

    newImages.value.forEach((imgObj) => {
      fd.append("files", imgObj.file);
    });

    await axios.post(
      "/api/manager-service/influencerPage/updateInfluencerPage",
      
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // 저장 성공 → 다시 최신 데이터 로드해서 보기 모드 갱신
    await fetchInfluencerDetail();

    modalMessage.value = "성공적으로 저장되었습니다!";
    showModal.value = true;
    isEditMode.value = false;
  } catch (err) {
    console.error("❌ 저장 실패:", err);
    modalMessage.value = "저장에 실패했습니다.";
    showModal.value = true;
  } finally {
    isSubmitting.value = false;
  }
}

function closeModal() {
  showModal.value = false;
}

// =========================
// 초기 로딩
// =========================

onMounted(async () => {
  // 1. 로그인 사용자 정보 확보 (isMyPage 계산용)
  const authResult = await fetchAuth();
  if (authResult?.ok) {
    await fetchViewerProfile(authResult.memberNum);
  }

  // 2. 프로필 주인의 인플루언서 페이지 정보
  await fetchInfluencerDetail();

  // 3. 게시글 로드
  if (influencer.value.memberNum) {
    await fetchPostsForMember(influencer.value.memberNum);
  }
});

// 프로필 주인(memberNum) 바뀌면 게시글 다시 가져오기
watch(
  () => influencer.value.memberNum,
  async (newVal) => {
    if (newVal) {
      await fetchPostsForMember(newVal);
    }
  }
);

// 수정 모드 배너 백그라운드 스타일
const heroBgStyle = computed(() => {
  const bgPath = "/images/Applybackground.png";
  const gradient =
    "linear-gradient(180deg, rgba(139,92,246,0.7) 0%, rgba(236,72,153,0.85) 100%)";

  return {
    backgroundImage: `${gradient}, url('${bgPath}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
});
</script>


<style scoped>
/* ===================================== */
/* 공통 레이아웃 (보기 모드 쪽) */
/* ===================================== */

.influencer-profile-page {
  background-color: #ffffff;
  min-width: 1440px;
  max-width: 1440px;
  margin: 0 auto;
}

.page-main {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
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

.footer-wrapper {
  width: 100%;
  max-width: 1440px;
  margin: 60px auto 0;
}

.profile-top-section {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.profile-top-inner {
  position: relative;
  width: 100%;
}
.edit-btn-floating {
  position: absolute;
  right: 24px;
  bottom: 24px;
}
.edit-btn {
  background: #000;
  color: #fff;
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #000;
}
.edit-btn:hover {
  opacity: 0.85;
}

/* ===================================== */
/* 수정 모드용 Apply 스타일 (배너 + 카드) */
/* ===================================== */

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

/* 배너 */
.hero-banner {
  position: relative;
  width: 100%;
  height: 220px;
  color: #fff;
  background-size: cover;
  background-position: center;
}
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
}
.hero-inner {
  width: min(1100px, 92vw);
  margin: 0 auto;
}
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
  color: #000000;
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

/* 수정 카드 전체 */
.content-wrapper {
  width: min(1100px, 92vw);
  margin: 24px auto 80px auto;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}
.form-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  box-shadow: 0 30px 60px rgba(0,0,0,0.05);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.edit-page-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #000;
  line-height: 1.4;
}


.hidden-file-input {
  display: none;
}


/* ===== 업로드 + 폼 ===== */

/* 상단: 좌측 이미지 / 우측 정보 */
.top-row {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}

/* 이미지 컬럼 */
.image-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.image-preview-box {
  position: relative;
  width: 100%;
  min-height: 240px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  text-align: center;
  cursor: pointer; /* 클릭해서 파일 업로드 */
}
.current-image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.current-image {
  width: 180px;
  height: 180px;
  border-radius: 4px;
  object-fit: cover;
  border: 1px solid #ccc;
}
.remove-check-inline {
  font-size: 13px;
  color: #444;
  display: flex;
  align-items: center;
  gap: 4px;
}
.empty-image-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #777;
  font-size: 13px;
  line-height: 1.4;
}
.upload-icon {
  font-size: 20px;
  margin-bottom: 6px;
  color: #555;
}
.upload-text {
  color: #555;
}
/* 파일 input: 전체 박스 덮는 투명 영역 */
.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.image-hint {
  font-size: 12px;
  color: #777;
  line-height: 1.4;
}
/* 새로 선택한 이미지 썸네일 */
.new-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.new-preview-item {
  position: relative;
}
.new-preview-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #ccc;
}
.remove-new-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  padding: 2px 5px;
  line-height: 1;
  cursor: pointer;
}

/* 오른쪽 정보 영역 */
.info-column {
  display: block;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 16px;
}
.field-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #000;
}
.field-input {
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 14px;
  line-height: 1.4;
  background-color: #fff;
}
.field-input[disabled] {
  background-color: #f9f9f9;
  color: #777;
}

/* 구분선 */
.divider {
  border: 0;
  border-top: 1px solid #efefef;
  margin: 8px 0 0 0;
}

/* 소개 영역 */
.bottom-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
.bottom-field-block.full-width {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.bottom-field-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.bottom-field-label {
  font-size: 13px;
  font-weight: 500;
  color: #000;
}
.intro-textarea {
  width: 100%;
  min-height: 120px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  background-color: #fff;
  resize: vertical;
}

/* 하단 버튼 */
.action-row {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid rgba(0,0,0,0.07);
  padding-top: 16px;
}
.btn-cancel {
  background: #fff;
  color: #000;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 13px;
  line-height: 20px;
  cursor: pointer;
}
.btn-cancel:hover {
  background: #f5f5f5;
}
.btn-save {
  background: #000;
  color: #fff;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 13px;
  line-height: 20px;
  border: 1px solid #000;
  cursor: pointer;
}
.btn-save:disabled {
  opacity: 0.5;
  cursor: default;
}

/* 모달 */
.modal-dim {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal-card {
  background: #fff;
  padding: 24px;
  border-radius: 10px;
  min-width: 260px;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  display: grid;
  gap: 16px;
}
.modal-message {
  font-size: 14px;
  color: #000;
  line-height: 1.4;
  word-break: keep-all;
}
.modal-actions {
  display: flex;
  justify-content: center;
}
.modal-ok-btn {
  background: #000;
  color: #fff;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 14px;
  border: 1px solid #000;
  cursor: pointer;
}
</style>
