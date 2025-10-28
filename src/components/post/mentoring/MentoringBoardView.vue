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
              <span>▼ 카테고리</span>
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
              >
                <div class="card-header">
                  <img
                    :src="post.authorProfilePicUrl"
                    alt="멘토 프로필"
                    class="profile-pic"
                    @error="($event) => ($event.target.src = fallbackImage)"
                  />
                  <div class="author-info">
                    <span class="author-name">{{ post.memberName || '멘토 이름' }}</span>
                    <span class="author-title">{{ post.memberName || '멘토 스타일' }}</span>
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
                  <button class="apply-button" @click.stop="goDetail(post.num)">
                    신청하기
                  </button>
                </div>
              </div>
            </template>

            <template v-else-if="loading">
              <div v-for="s in 12" :key="s" class="mentor-card skeleton">
                <div class="card-header">
                  <div class="profile-pic sk"></div>
                  <div class="author-info">
                    <div class="sk sk-title" style="width: 80px;"></div>
                    <div class="sk sk-line" style="width: 100px;"></div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="tags">
                    <div class="sk sk-tag"></div>
                    <div class="sk sk-tag"></div>
                  </div>
                  <div class="sk sk-line" style="margin-top: 10px;"></div>
                </div>
                <div class="card-footer">
                  <div class="sk sk-chip"></div>
                  <div class="sk sk-button"></div>
                </div>
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
            
            <div class="search-bar-placeholder"></div>
          </div>
        
        </main>
        
        <aside class="sidebar-column">
          <div class="sidebar-widget">
            <div class="widget-title">멘토링</div>
            <div class="widget-content">
              <ul class="recent-post-list">
                <li>패션 브랜드 취업 실전 경험... <span>5시간 전</span></li>
                <li>패션 업계 취업 노하우와 커... <span>6시간 전</span></li>
                <li>처음 참가하는 패션위크, 준... <span>9시간 전</span></li>
                <li>톱 스타일리스트 인터뷰 - 펀... <span>11시간 전</span></li>
                <li>패션 포토그래퍼의 지망생을... <span>1일 전</span></li>
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
const amount = ref(12); // 4x3 그리드
const totalPages = ref(1);
const totalCount = ref(0);
const searchQuery = ref('');
const searchType = ref('title');

/* ===== 기본 이미지 ===== */
// ✅ 프로필용 fallback 이미지
const fallbackImage = '/images/default_avatar.png'; 

/* ===== 라우팅 ===== */
const goWrite = () => router.push({ name: 'registmentoringpost' });
const goDetail = (num) => {
  if (!num) return;
  router.push({ name: 'mentoringpost', params: { id: num } });
};

/* ===== 유틸리티 함수 (스니펫 생성) ===== */
// "🎨 패션 스타일리스트의 1:1 맞춤 코디..." -> "1:1 맞춤 코디"
const extractSnippet = (title) => {
  if (!title) return '멘토링';
  // 이모지 및 앞부분 제거
  const cleanedTitle = title.replace(/^[🎨👟💼🌟]*/, '').trim();
  // "의" 또는 " " 기준으로 첫 번째 조각 가져오기
  const parts = cleanedTitle.split(/ |의/);
  if (parts.length > 2) {
    return parts.slice(1, 3).join(' '); // 예: "1:1 맞춤"
  }
  return cleanedTitle.substring(0, 20); // 기본 스니펫
};


/* ============ ✅ 데이터 불러오기 (카드 디자인에 맞게 수정) ============ */
const fetchMentoringPosts = async () => {
  loading.value = true;
  try {
    const params = {
      _page: pageNum.value,
      _limit: amount.value,
      _sort: 'num',
      _order: 'desc',
    };
    
    // ✅ 검색 쿼리 추가
    if (searchQuery.value) {
      if (searchType.value === 'author') {
        // 작성자 검색은 2단계로 처리해야 함 (여기서는 Member 이름으로 검색)
        // 1. 멤버 검색
        const memberRes = await api.get('/Member', { params: { NAME_like: searchQuery.value } });
        const memberIds = memberRes.data.map(m => m.num);
        if (memberIds.length > 0) {
          // 2. 해당 ID로 포스트 검색 (여러 ID 지원을 위해 _like 대신 반복)
          // json-server는 author_num_in=[1,2,3] 같은걸 지원 안하므로
          // 여기서는 간단히 첫번째 ID만 사용 (한계)
          // 또는 params에 author_num_like 대신 q=를 사용해야 할 수도 있음
          params.author_num = memberIds[0]; // 단순화된 구현
        } else {
          posts.value = []; // 검색 결과 없음
          totalPages.value = 1;
          totalCount.value = 0;
          loading.value = false;
          return;
        }
      } else {
        // 제목, 내용 검색
        params[`${searchType.value}_like`] = searchQuery.value;
      }
    }


    // 1. 멘토링 게시글 목록 조회
    const response = await api.get('/Mentoring_Post', { params });
    let fetchedPosts = Array.isArray(response.data) ? response.data : [];

    // ✅ 2. 작성자 이름 + 프로필 사진 가져오기
    if (fetchedPosts.length > 0) {
      const postDetailPromises = fetchedPosts.map(async (post) => {
        try {
          // 2-1. 작성자 정보 (이름)
          const memberPromise = api.get(`/Member/${post.author_num}`);
          
          // 2-2. 작성자 프로필 사진 (db.json: Photo_Category 7번)
          // (Photo 테이블의 post_num이 실제로는 member_num를 저장하는 것으로 가정)
          const photoPromise = api.get('/Photo', {
            params: {
              post_num: post.author_num, // Member.num
              photo_category_num: 7,     // 7: 회원 페이지 (프로필)
              _limit: 1
            }
          });

          const [memberResponse, photoResponse] = await Promise.all([memberPromise, photoPromise]);

          const memberName = memberResponse?.data?.NAME || '작성자 정보 없음';
          const authorProfilePicUrl = photoResponse.data?.[0]?.PATH || fallbackImage;
          const titleSnippet = extractSnippet(post.title); // 스니펫 생성

          return { ...post, memberName, authorProfilePicUrl, titleSnippet };

        } catch (error) {
          console.error(`게시글(${post.num}) 추가 정보 조회 실패:`, error);
          const titleSnippet = extractSnippet(post.title);
          return { ...post, memberName: '정보 조회 실패', authorProfilePicUrl: fallbackImage, titleSnippet };
        }
      });
      
      fetchedPosts = await Promise.all(postDetailPromises);
    }

    posts.value = fetchedPosts;

    // 총 개수 및 페이지 계산
    totalCount.value = Number(response.headers['x-total-count'] || 0);
    totalPages.value = Math.max(1, Math.ceil(totalCount.value / amount.value));

  } catch (e) {
    console.error('멘토링 게시글 조회 실패:', e);
    posts.value = [];
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
    fetchMentoringPosts();
  }
};

/* ===== 검색 실행 ===== */
const performSearch = () => {
  pageNum.value = 1; // 검색 시 1페이지로 리셋
  fetchMentoringPosts();
};

/* ===== onMounted ===== */
onMounted(async () => {
  await fetchMentoringPosts();
});
</script>

<style scoped>
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
  background: url('/images/MentoringBoardBanner.png') center/cover no-repeat; /* 기존 배너 이미지 사용 */
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
.category-filter {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
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
.author-title {
  font-size: 13px;
  color: #6b7280;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
  /* 두 줄 말줄임 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
  height: 39.2px; /* 14px * 1.4 * 2줄 */
}

.card-footer {
  margin-top: auto; /* 푸터를 카d- 하단에 고정 */
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
/* pagination-container의 space-between 정렬을 위해 반대쪽에 빈 공간 */
.search-bar-placeholder {
  width: 350px; /* .search-bar 너비와 비슷하게 */
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
.recent-post-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.recent-post-list li {
  font-size: 14px;
  color: #374151;
  line-height: 1.4;
  cursor: pointer;
}
.recent-post-list li:hover {
  color: #111827;
}
.recent-post-list li span {
  display: block;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 4px;
}
</style>