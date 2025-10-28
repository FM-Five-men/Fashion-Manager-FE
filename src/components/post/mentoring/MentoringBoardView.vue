<template>
  <div class="page-container">
    <HeaderView/>

    <div class="main-content-area">

      <div class="banner">
        <div class="banner-overlay">
          <h1>FASHION MENTORING</h1>
          <p>전문가에게 조언을 구하세요</p>
        </div>
      </div>

      <div class="content-container">

        <main class="main-column">

          <div class="main-header">
            <div class="category-filter">
              <select v-model="selectedCategoryFilter" @change="applyCategoryFilter">
                <option value="">▼ 카테고리 전체</option>
                <option v-for="tag in categories" :key="tag.num" :value="tag.NAME">
                  {{ tag.NAME }}
                </option>
              </select>
            </div>
            <button class="write-post-button" @click="goWrite">
              글 작성
            </button>
          </div>

          <div class="cards-grid">
            <template v-if="!loading && posts.length">

              <div
                v-for="(post) in posts"
                :key="post.num"
                class="mentor-card"
                @click="goDetail(post.num)"
                style="cursor:pointer;"
              >
                <div class="card-header">
                  <img
                    :src="'/images/mentoringpost' + post.num + '.jpg'"
                    alt="멘토 프로필"
                    class="profile-pic"
                    @error="($event) => ($event.target.src = fallbackImage)"
                  />
                  <div class="author-info">
                    <span class="author-name">{{ post.memberName || '멘토 이름' }}</span>
                    </div>
                </div>

                <div class="card-body">
                  <div class="tags">
                    <span class="tag">#{{ post.memberName?.substring(0, 3) || '스타일' }}</span>
                    <span class="tag">#전문가</span>
                  </div>
                  <p class="content-snippet" :title="post.title">
                    {{ post.titleSnippet || '멘토링 한 줄 소개' }}
                  </p>
                </div>

                <div class="card-footer">
                  <span class="status-chip" :class="{ finished: post.FINISH === 1 }">
                    {{ post.FINISH === 1 ? '마감' : '가능' }}
                  </span>
                  <button class="apply-button" @click.stop="goApply(post.num)">
                    신청하기
                  </button>
                </div>
              </div>
            </template>

            <template v-else-if="loading">
              <div v-for="s in 12" :key="s" class="mentor-card skeleton">
                </div>
            </template>

            <template v-else>
              <div class="empty-state">
                게시글이 없습니다.
              </div>
            </template>
          </div>

          <div class="pagination-container">
            <div class="search-bar">
              <select v-model="searchType">
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="author">작성자</option>
              </select>
              <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요" @keyup.enter="performSearch" />
              <button @click="performSearch">검색</button>
            </div>

            <div class="page-row" v-if="totalPages > 1">
              </div>

            <div class="search-bar-placeholder"></div>
          </div>

        </main>

        <aside class="sidebar-column">
          <div class="sidebar-widget">
            <div class="widget-title">최근 멘토링</div>
            <div class="widget-content">
              <ul class="recent-post-list">
                <li v-if="sidebarLoading">로딩 중...</li>
                <li v-else-if="sidebarError">{{ sidebarError }}</li>
                <li
                  v-else
                  v-for="sidePost in sidebarPosts"
                  :key="sidePost.num"
                  @click="goDetail(sidePost.num)"
                  style="cursor:pointer;"
                >
                  {{ sidePost.titleSnippet }}...
                  <span>{{ sidePost.relativeTime || '방금 전' }}</span>
                </li>
                 <li v-if="!sidebarLoading && !sidebarError && sidebarPosts.length === 0">최근 글 없음</li>
              </ul>
            </div>
          </div>
        </aside>

      </div>
    </div>

    <FooterView/>
  </div>
</template>

<script setup>
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/* ===== 상태 ===== */
const loading = ref(false);
const posts = ref([]);
const pageNum = ref(1);
const amount = ref(12);
const totalPages = ref(1);
const totalCount = ref(0);
const searchQuery = ref('');
const searchType = ref('title');
const categories = ref([]); // ✅ 카테고리 상태
const selectedCategoryFilter = ref(""); // ✅ 선택된 카테고리 필터
const sidebarPosts = ref([]); // ✅ 사이드바 게시글 상태
const sidebarLoading = ref(false);
const sidebarError = ref(null);


const fallbackImage = '/images/defaultimage.png';

/* ===== 라우팅 ===== */
const goWrite = () => router.push({ name: 'registmentoringpost' });
// ✅ 상세 페이지 이동 함수 (기존과 동일)
const goDetail = (num) => {
  if (!num) return;
  router.push({ name: 'mentoringpost', params: { id: num } });
};
// ✅ 신청 페이지 이동 함수 (추가)
const goApply = (postNum) => {
  // postNum이 필요하다면 query나 params로 전달할 수 있습니다.
  router.push({ name: 'menteeapply', query: { postId: postNum } });
};


const extractSnippet = (title, length = 15) => {
  if (!title) return '';
  const cleanedTitle = title.replace(/^[🎨👟💼🌟]*/, '').trim();
  return cleanedTitle.length > length ? cleanedTitle.substring(0, length) : cleanedTitle;
};

// ✅ 카테고리 필터 적용 함수
const applyCategoryFilter = () => {
  pageNum.value = 1; // 필터 변경 시 1페이지로
  // TODO: fetchMentoringPosts 함수에 카테고리 필터링 로직 추가 필요
  // 현재는 카테고리 필터링 API가 없으므로 fetch만 다시 호출
  fetchMentoringPosts();
}

// ✅ 카테고리 데이터 로딩 (Hash_Tag 사용)
const fetchCategories = async () => {
  try {
    const response = await api.get('/Hash_Tag'); //
    categories.value = Array.isArray(response.data) ? response.data : [];
  } catch (e) {
    console.error('카테고리(해시태그) 조회 실패:', e);
    categories.value = [];
  }
};

// ✅ 사이드바 데이터 로딩
const fetchSidebarPosts = async () => {
  sidebarLoading.value = true;
  sidebarError.value = null;
  try {
    const params = {
      _limit: 5, // 최근 5개
      _sort: 'num',
      _order: 'desc',
    };
    const response = await api.get('/Mentoring_Post', { params }); //
    sidebarPosts.value = Array.isArray(response.data)
        ? response.data.map(post => ({
            ...post,
            titleSnippet: extractSnippet(post.title, 18), // 사이드바용 짧은 스니펫
            // relativeTime: calculateRelativeTime(post.date) // 날짜 필드가 있다면 상대 시간 계산
          }))
        : [];
  } catch (e) {
    console.error('사이드바 게시글 조회 실패:', e);
    sidebarError.value = '목록 로딩 실패';
    sidebarPosts.value = [];
  } finally {
    sidebarLoading.value = false;
  }
};


/* ============ ✅ 데이터 불러오기 수정 ============ */
const fetchMentoringPosts = async () => {
  loading.value = true;
  try {
    const params = {
      _page: pageNum.value,
      _limit: amount.value,
      _sort: 'num',
      _order: 'desc',
    };

    // 검색 쿼리
    if (searchQuery.value) {
      if (searchType.value === 'author') {
        const memberRes = await api.get('/Member', { params: { NAME_like: searchQuery.value } }); //
        const memberIds = memberRes.data.map(m => m.num);
        if (memberIds.length > 0) {
           params.author_num = memberIds; // 여러 ID 지원 (json-server 확장 기능 필요 없을 수 있음)
        } else {
          posts.value = []; totalPages.value = 1; totalCount.value = 0; loading.value = false; return;
        }
      } else {
        params[`${searchType.value}_like`] = searchQuery.value;
      }
    }

    // 카테고리 필터 (임시: 해시태그 이름으로 제목 필터링)
    // TODO: 백엔드에서 Fashion_Hashtag 테이블 조인 후 필터링 지원 필요
    if (selectedCategoryFilter.value) {
       params.title_like = selectedCategoryFilter.value; // 임시 방편
    }


    const response = await api.get('/Mentoring_Post', { params }); //
    let fetchedPosts = Array.isArray(response.data) ? response.data : [];

    if (fetchedPosts.length > 0) {
      const authorNums = fetchedPosts.map(p => p.author_num).filter(Boolean);
      const uniqueAuthorNums = [...new Set(authorNums)];
      let memberMap = new Map();

      if (uniqueAuthorNums.length > 0) {
          // 작성자 정보를 한 번에 가져오기
          const memberParams = new URLSearchParams();
          uniqueAuthorNums.forEach(num => memberParams.append('num', num));
          const memberResponse = await api.get(`/Member?${memberParams.toString()}`); //
          const members = Array.isArray(memberResponse.data) ? memberResponse.data : [];
          memberMap = new Map(members.map(m => [m.num, m.NAME]));
      }


      fetchedPosts = fetchedPosts.map(post => {
          // ✅ 이미지 경로 직접 설정
          const imageUrl = `/images/mentoringpost${post.num}.jpg`;
          const memberName = memberMap.get(post.author_num) || '작성자 정보 없음';
          const titleSnippet = extractSnippet(post.title);

          // authorProfilePicUrl 대신 imageUrl 사용 또는 유지
          return { ...post, memberName, authorProfilePicUrl: imageUrl, titleSnippet };
      });
    }

    posts.value = fetchedPosts;

    totalCount.value = Number(response.headers['x-total-count'] || 0);
    totalPages.value = Math.max(1, Math.ceil(totalCount.value / amount.value));

  } catch (e) {
    console.error('멘토링 게시글 조회 실패:', e);
    posts.value = []; totalPages.value = 1; totalCount.value = 0;
  } finally {
    loading.value = false;
  }
};

/* ===== 페이지네이션 ===== */
const goPage = (p) => {
  if (p >= 1 && p <= totalPages.value && p !== pageNum.value) {
    pageNum.value = p;
    fetchMentoringPosts();
  }
};

/* ===== 검색 실행 ===== */
const performSearch = () => {
  pageNum.value = 1;
  fetchMentoringPosts();
};

/* ===== onMounted ===== */
onMounted(async () => {
  await fetchCategories(); // ✅ 카테고리 로드
  await fetchMentoringPosts(); // 메인 게시글 로드
  await fetchSidebarPosts(); // ✅ 사이드바 게시글 로드
});
</script>

<style scoped>
/* 이전과 동일한 스타일 유지 ... */

/* 카테고리 필터 드롭다운 스타일 */
.category-filter select {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  min-width: 150px; /* 드롭다운 최소 너비 */
  appearance: none; /* 기본 화살표 숨김 */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6'><path fill='black' d='M0 0l5 6 5-6z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
}
.category-filter select:focus {
  outline: none;
  border-color: #a0a0a0;
}

/* 사이드바 리스트 아이템 */
.recent-post-list li {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  cursor: pointer;
  padding: 8px 4px; /* 클릭 영역 확보 */
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
.recent-post-list li:hover {
  background-color: #f3f4f6; /* 호버 효과 */
  color: #111827;
}
.recent-post-list li span {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}

/* ===== 레이아웃 기본 ===== */
.page-container {
  width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #fff;
}
.main-content-area {
  flex-grow: 1;
  width: 100%;
  padding: 0 57px 20px 57px; /* 상단 패딩은 배너가 하므로 0 */
  box-sizing: border-box;
  position: relative;
}

/* ===== 1. 배너 ===== */
.banner {
  width: calc(100% + 114px); /* 양쪽 패딩만큼 확장 */
  height: 200px;
  margin: 0 -57px 24px -57px;
  background: url('/images/FMbanner.jpg') center/cover no-repeat; /* 기존 배너 이미지 사용 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}
.banner-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4); /* 이미지 어둡게 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.banner h1 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
}
.banner p {
  font-size: 16px;
  margin: 0;
}

/* ===== 2. 2단 레이아웃 ===== */
.content-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 24px;
}
.main-column {
  flex-grow: 1; /* 남은 공간 모두 차지 */
  width: 0; /* flex-grow가 작동하도록 */
}
.sidebar-column {
  width: 280px; /* 사이드바 고정 너비 */
  flex-shrink: 0;
}

/* ===== 3. 메인 상단 (필터 + 글작성) ===== */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 8px; /* 그리드와 정렬 맞춤 */
}
/* .category-filter 스타일은 위에서 정의됨 */
.write-post-button {
  background: #111827;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

/* ===== 4. 카드 그리드 (4열) ===== */
.cards-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4열 고정 */
  gap: 16px;
}
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
  font-size: 15px;
}


/* ===== 5. 멘토 카드 디자인 ===== */
.mentor-card {
  width: 100%; /* 그리드에 맞춤 */
  height: 230px; /* 카드 높이 고정 */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.15s ease;
}
.mentor-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
}
.profile-pic {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f3f4f6;
  border: 1px solid #f0f0f0;
}
.author-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  /* 이름/타이틀 말줄임 */
  overflow: hidden;
}
.author-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.author-title { /* 사용하지 않음 */
  display: none;
}

.card-body {
  padding: 0 16px 12px 16px;
}
.tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.tag {
  font-size: 11px;
  font-weight: 500;
  background: #f3f4f6;
  color: #4b5563;
  padding: 3px 8px;
  border-radius: 4px;
}
.content-snippet {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  height: 39.2px;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f3f4f6;
}
.status-chip {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 600;
  background-color: #e0f2fe; /* 모집중(가능) */
  color: #0c4a6e;
}
.status-chip.finished {
  background-color: #f3f4f6; /* 마감 */
  color: #4b5563;
}
.apply-button {
  background: #374151;
  color: #fff;
  border: none;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.apply-button:hover {
  background: #1f2937;
}

/* 카드 스켈레톤 */
.skeleton .sk { background: #f3f4f6; border-radius: 4px; }
.skeleton .profile-pic.sk { border-radius: 50%; }
.skeleton .sk-title { height: 16px; margin-bottom: 4px; }
.skeleton .sk-line { height: 12px; }
.skeleton .sk-tag { width: 50px; height: 20px; }
.skeleton .sk-chip { width: 40px; height: 22px; border-radius: 999px; }
.skeleton .sk-button { width: 70px; height: 31px; border-radius: 6px; }


/* ===== 6. 하단 검색/페이지네이션 ===== */
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
  align-items: center;
  font-family: "Noto Sans KR", sans-serif;
  margin-top: 32px;
  margin-bottom: 30px;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 6px;
}
.search-bar select, .search-bar input {
  font-size: 14px;
  padding: 7px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.search-bar input {
  width: 200px;
}
.search-bar button {
  padding: 7px 14px;
  font-size: 14px;
  background: #4b5563;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.search-bar-placeholder {
  width: 350px;
  flex-shrink: 0;
}


/* 페이지네이션 버튼 */
.page-row {
  display:flex; align-items:center; gap: 8px; font-size: 14px; color:#222;
}
.arrow-btn {
  background: #fff; border: 1px solid #e5e7eb; color:#374151; cursor:pointer; padding: 6px 10px; border-radius: 8px; line-height: 1;
}
.arrow-btn:disabled { opacity: .35; cursor: default; }
.page-num-btn {
  background:#fff; border: 1px solid #e5e7eb; color:#111827; cursor:pointer; padding: 6px 10px; min-width: 32px; border-radius: 8px; text-align: center;
}
.page-num-btn.active { background:#111827; color:#fff; border-color:#111827; font-weight: 700; }

/* ===== 7. 사이드바 ===== */
.sidebar-widget {
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
.widget-title {
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid #e5e7eb;
}
.widget-content {
  padding: 16px;
}
/* .recent-post-list 스타일은 위에서 정의됨 */

</style>