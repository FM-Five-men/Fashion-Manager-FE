<template>
  <div class="page-container">
    <HeaderView/>

    <div class="main-content-area">
      <div class="banner" style="background-image: url('/images/MentoringBoardBanner.png');">
        <div class="banner-overlay"></div>
      </div>

      <div class="content-wrapper">
        <div class="cards-grid">
          <template v-if="!loading && posts.length">
            <div
              v-for="(post) in posts"
              :key="post.num"
              class="community-card"
              @click="goDetail(post.num)"
              style="cursor:pointer"
            >
              <div class="card-topbar" style="background: #6A5BFF;"></div>

              {/* ✅ 게시글 번호에 맞는 이미지 로드 */}
              <img
                :src="'/images/mentoringpost' + post.num + '.jpg'"
                alt="게시글 이미지"
                class="card-image"
                @error="($event) => ($event.target.src = fallbackImage)"
              />

              <div class="card-content">
                <div class="card-title" :title="post.title">{{ post.title }}</div>

                <div class="meta-row">
                  <div class="author">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 8c1.328 0 2.4-1.072 2.4-2.4S9.328 3.2 8 3.2 5.6 4.272 5.6 5.6 6.672 8 8 8Zm0 1.6c-1.94 0-5.333 0.971-5.333 2.8v0.933h10.666V12.4c0-1.829-3.393-2.8-5.333-2.8Z" stroke="#1E1E1E" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {/* ✅ 작성자 번호 대신 이름 표시 */}
                    <span class="author-name">{{ post.memberName || '작성자 정보 없음' }}</span>
                  </div>
                  <span class="chip-status" :class="{ finished: post.FINISH === 1 }">
                      {{ post.FINISH === 1 ? '마감' : '모집중' }}
                   </span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="loading">
             {/* 스켈레톤 로딩 UI */}
            <div v-for="s in 12" :key="s" class="community-card skeleton">
              <div class="card-topbar"></div>
              <div class="card-image sk"></div>
              <div class="card-content">
                <div class="sk sk-title"></div>
                <div class="sk sk-meta"></div>
              </div>
            </div>
          </template>

          <template v-else>
            <div class="empty-state">
              게시글이 없습니다.
            </div>
          </template>
        </div>

        </div>

      <div class="write-post-button" @click="goWrite">
        <div class="write-post-text">글 작성</div>
      </div>

      <div class="pagination-container">
        {/* ✅ 검색창 제거됨 */}

        {/* 페이지네이션 */}
        <div class="page-row" v-if="totalPages > 1">
          <button
            class="arrow-btn"
            :disabled="pageNum === 1"
            @click="goPage(pageNum - 1)"
            aria-label="이전"
          >‹</button>

          <button
            v-for="p in totalPages"
            :key="p"
            class="page-num-btn"
            :class="{ active: pageNum === p }"
            @click="goPage(p)"
          >{{ p }}</button>

          <button
            class="arrow-btn"
            :disabled="pageNum === totalPages"
            @click="goPage(pageNum + 1)"
            aria-label="다음"
          >›</button>
        </div>
      </div> {/* pagination-container 끝 */}
    </div> {/* main-content-area 끝 */}

    <FooterView/>
  </div> {/* page-container 끝 */}
</template>

<script setup>
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

/* ================== axios 인스턴스 (json-server용 baseURL) ================== */
const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ json-server 주소로 변경
});

/* ===== 상태 ===== */
const loading = ref(false);
const posts = ref([]);
const pageNum = ref(1);
const amount = ref(12); // 페이지당 게시글 수
const totalPages = ref(1);
const totalCount = ref(0);

/* ===== 기본 이미지 ===== */
const fallbackImage = '/images/defaultimage.png'; // public 폴더 기준

/* ===== 라우팅 ===== */
// ✅ 글 작성 페이지로 이동 ('registmentoringpost' 이름 사용)
const goWrite = () => router.push({ name: 'registmentoringpost' });
// ✅ 상세 페이지로 이동 ('mentoringpost' 이름 사용)
const goDetail = (num) => {
  if (!num) return;
  router.push({ name: 'mentoringpost', params: { id: num } });
};

/* ============ 데이터 불러오기 (json-server용) ============ */
const fetchMentoringPosts = async () => {
  loading.value = true;
  try {
    const params = {
      _page: pageNum.value,
      _limit: amount.value,
      _sort: 'num', // 'num' 필드 기준으로 정렬
      _order: 'desc', // 내림차순 (최신순)
    };

    // 1. 멘토링 게시글 목록 조회
    const response = await api.get('/Mentoring_Post', { params });
    let fetchedPosts = Array.isArray(response.data) ? response.data : [];

    // 2. 작성자 이름 가져오기 (각 게시글 별로 Member 조회)
    if (fetchedPosts.length > 0) {
      // 게시글 목록 순회하며 작성자 정보 비동기 요청
      const memberPromises = fetchedPosts.map(async (post) => {
        if (post.author_num != null) {
          try {
            const memberResponse = await api.get(`/Member/${post.author_num}`);
            // NAME 필드를 memberName으로 추가
            return { ...post, memberName: memberResponse.data?.NAME || '알 수 없음' };
          } catch (memberError) {
            console.error(`작성자(${post.author_num}) 정보 조회 실패:`, memberError);
            return { ...post, memberName: '정보 조회 실패' }; // 조회 실패 시
          }
        } else {
          return { ...post, memberName: '작성자 정보 없음' }; // author_num이 없는 경우
        }
      });
      // 모든 작성자 정보 조회가 완료될 때까지 기다림
      fetchedPosts = await Promise.all(memberPromises);
    }

    posts.value = fetchedPosts; // 최종 데이터 상태 업데이트

    // 총 개수 및 페이지 계산 (json-server 헤더 사용)
    totalCount.value = Number(response.headers['x-total-count'] || 0);
    totalPages.value = Math.max(1, Math.ceil(totalCount.value / amount.value));

  } catch (e) {
    console.error('멘토링 게시글 조회 실패:', e);
    posts.value = []; // 에러 시 초기화
    totalPages.value = 1;
    totalCount.value = 0;
  } finally {
    loading.value = false;
  }
};

/* ===== 페이지네이션 ===== */
const goPage = (p) => {
  if (p >= 1 && p <= totalPages.value && p !== pageNum.value) {
    pageNum.value = p;
    fetchMentoringPosts(); // 페이지 변경 시 데이터 다시 로드
  }
};

/* ===== onMounted ===== */
onMounted(async () => {
  // 컴포넌트 마운트 시 첫 페이지 데이터 로드
  await fetchMentoringPosts();
});
</script>

<style scoped>
/* ===== 레이아웃 기본 ===== */
.page-container {
  width: 1440px; /* 필요시 디자인에 맞게 조정 */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}
.main-content-area {
  flex-grow: 1;
  width: 100%;
  padding: 20px 57px; /* 필요시 조정 */
  box-sizing: border-box;
  position: relative;
}

/* ===== 배너 ===== */
.banner {
  width: calc(100% + 114px); /* 양쪽 패딩만큼 확장 */
  height: 200px; /* 필요시 조정 */
  margin: 0 -57px 24px -57px; /* 패딩 상쇄 및 하단 마진 */
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,0) 100%);
}

/* ===== 본문 ===== */
.content-wrapper {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 28px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
}

/* ===== 카드 그리드 ===== */
.cards-grid {
  width: 100%; /* 사이드바 없을 경우 */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(236px, 1fr)); /* 너비에 맞춰 자동 배치 */
  gap: 16px;
  margin-top: 8px;
  justify-content: center; /* 카드들을 중앙 정렬 (옵션) */
}

/* ===== 카드 (크기 수정됨) ===== */
.community-card {
  width: 236px; /* 너비 고정 */
  height: 211px; /* 높이 고정 */
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,.06);
  transition: transform .15s ease, box-shadow .15s ease;
  display: flex;
  flex-direction: column;
}
.community-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,.10);
}
.card-topbar {
  height: 6px;
  width: 100%;
  flex-shrink: 0;
}
.card-image {
  width: 100%;
  height: 100px; /* 이미지 높이 조절 */
  object-fit: cover;
  display: block;
  background-color: #f3f4f6; /* 이미지 로딩 전 배경색 */
  flex-shrink: 0;
}
.card-content {
  padding: 10px 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 제목과 메타정보 사이 공간 최대화 */
}
.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  height: 39px; /* 두 줄 높이 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 6px; /* 아래쪽 여백 */
}
.meta-row {
  margin-top: auto; /* 제목 아래 남은 공간 밀어내고 맨 아래 배치 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color:#334155;
  font-size: 12px;
}
.author-name {
   max-width: 120px; /* 이름 최대 너비 제한 */
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
   display: inline-block;
   vertical-align: middle;
 }
.chip-status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 999px;
  font-weight: 500;
  background-color: #e0f2fe; /* 모집중 */
  color: #0c4a6e;
}
.chip-status.finished {
  background-color: #f3f4f6; /* 마감 */
  color: #4b5563;
}

/* 스켈레톤 */
.skeleton .card-image.sk { height: 100px; background: #f3f4f6; }
.skeleton .sk-title { height: 16px; width: 80%; margin-bottom: 6px; background: #f3f4f6; border-radius: 4px; }
.skeleton .sk-meta { height: 12px; width: 60%; background: #f3f4f6; border-radius: 4px; margin-top: auto; }
.skeleton .card-content { justify-content: flex-start; } /* 스켈레톤은 위에서부터 채움 */


.empty-state {
  grid-column: 1 / -1; /* 그리드 전체 너비 차지 */
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
  font-size: 15px;
}

/* ===== 글작성 버튼 ===== */
.write-post-button {
  position: absolute;
  top: 235px; /* 배너 높이 등 고려하여 위치 조정 */
  right: 57px;  /* 페이지 오른쪽 패딩 고려 */
  width: 92px; height: 36px;
  background: #111827;
  color:#fff;
  border-radius: 8px;
  display:flex; align-items:center; justify-content:center;
  cursor: pointer;
  z-index: 5;
  font-size: 14px;
}
.write-post-text {
  /* 텍스트 스타일 필요 시 추가 */
}

/* ===== 페이지네이션 ===== */
.pagination-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 32px; /* 카드 그리드와 간격 조정 */
  margin-bottom: 30px;
}

/* ✅ 검색창 관련 스타일 제거됨 */

/* 페이지네이션 버튼 스타일 */
.page-row {
  display:flex; align-items:center; gap: 8px; font-size: 14px; color:#222; margin-top: 10px; /* 검색창 없으므로 margin-top 조정 */
}
.arrow-btn {
  background: #fff; border: 1px solid #e5e7eb; color:#374151; cursor:pointer; padding: 6px 10px; border-radius: 8px; line-height: 1; /* 아이콘 수직 정렬 */
}
.arrow-btn:disabled { opacity: .35; cursor: default; }
.page-num-btn {
  background:#fff; border: 1px solid #e5e7eb; color:#111827; cursor:pointer; padding: 6px 10px; min-width: 32px; border-radius: 8px; text-align: center;
}
.page-num-btn.active { background:#111827; color:#fff; border-color:#111827; font-weight: 700; }

/* 기타 불필요 요소 숨김 */
.empty-div-placeholder, .empty-div { display: none; }
</style>