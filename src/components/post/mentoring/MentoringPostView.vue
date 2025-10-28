<template>
  <div id="mentoring-post-page">
    <HeaderView />
    <section class="community-banner">
      <h1>FASHION MENTORING</h1>
      <p>전문가와 함께 성장하세요</p>
    </section>

    <main class="main-container">
      <div class="post-column">
        <div v-if="isLoading" class="state">
          <p>데이터를 불러오는 중입니다...</p>
        </div>
        <div v-else-if="error" class="state error">
          <p>오류 발생: {{ error }}</p>
        </div>
        <article v-else-if="postData" class="post-card">
          <div class="post-header">
            <img :src="'/images/mentoringpost' + postId + '.jpg'" alt="작성자 프로필" class="avatar poster-avatar" @error="($event) => ($event.target.src = fallbackImage)" />
            <div class="user-info">
              <div class="user-name">
                <span>{{ postData.memberName || '작성자 정보 없음' }}</span>
              </div>
            </div>
            <div class="post-edit-actions" v-if="postData.author_num === currentMemberNum">
              <button @click="editPost">수정</button>
              <button @click="deletePost">삭제</button>
            </div>
          </div>

          <div class="post-body">
            <div class="tags">
              <span class="recruiting-badge" :class="{ closed: postData.FINISH === 1 }">{{ postData.FINISH === 0 ? '모집중' : '마감' }}</span>
            </div>
            <h2>{{ postData.title || '제목 없음' }}</h2>
            <img :src="'/images/mentoringpost' + postId + '.jpg'" alt="Mentoring default image" class="post-image" @error="($event) => ($event.target.src = '/images/defaultimage.png')" />
            <div class="post-content-text" v-html="postData.content || '내용 없음'"></div>
            <button class="report-button post-report-button" @click="reportPost(postId)">🚨 게시글 신고</button>
          </div>

          <div class="post-meta">
            <span>조회 {{ postData.views || 0 }}</span> <span>·</span>
            <span>댓글 {{ commentData?.length || 0 }}</span>
          </div>

          <section class="comment-section">
            <div class="comment-header">
              <h3>댓글 {{ commentData?.length || 0 }}</h3>
            </div>
            <ul class="comment-list" v-if="commentData && commentData.length > 0">
              <li v-for="comment in commentData" :key="comment.num" class="comment-item">
                <div class="avatar comment-avatar">{{ comment.memberName?.charAt(0) || '?' }}</div>
                <div class="comment-content">
                  <div class="comment-author-info">
                    <strong>{{ comment.memberName || 'Unknown User' }}</strong>
                  </div>
                  <p class="comment-text">{{ comment.content || '댓글 내용 없음' }}</p>
                </div>
                <div class="comment-edit-actions">
                  <button @click="reportComment(comment.num)">🚨 신고</button>
                  <button v-if="comment.member_num === currentMemberNum" @click="deleteComment(comment.num)">삭제</button>
                </div>
              </li>
            </ul>
            <p v-else>아직 댓글이 없습니다.</p>
            <form class="comment-form" @submit.prevent="handleCommentSubmit">
               <div class="avatar comment-avatar">{{ currentMemberName?.charAt(0) || '나'}}</div>
              <input type="text" placeholder="댓글을 입력해주세요" class="comment-input" v-model="newCommentText" />
              <button type="submit" class="comment-submit-button">등록</button>
            </form>
          </section>
        </article>
        <div v-else class="state">
          <p>게시글 데이터를 찾을 수 없습니다.</p>
        </div>
      </div>

      <aside class="sidebar-column">
         <div class="widget category-widget">
          <h3>카테고리</h3>
          <div class="category-list">
            <button v-if="categoriesLoading">로딩중...</button>
            <button v-else v-for="category in categories" :key="category.num">
              {{ category.NAME }}
            </button>
             <button v-if="!categoriesLoading && categories.length === 0">없음</button>
          </div>
        </div>
        <div class="widget mentors-widget">
          <h3><span class="icon">🏆</span> 인기 멘토</h3>
          <ul class="mentor-list">
             <li v-for="mentor in popularMentors" :key="mentor.num" @click="goToMentorPage(mentor.num)" style="cursor: pointer;">
              <div class="mentor-info">
                <strong>{{ mentor.name }}</strong>
                <span>{{ mentor.field }}</span>
              </div>
              <div class="mentor-likes">
                <span class="icon">⭐</span> {{ mentor.likes }}
              </div>
            </li>
            <li v-if="popularMentors.length === 0">인기 멘토 없음</li>
          </ul>
        </div>
        <div class="widget cta-widget">
          <h3>멘토로 활동하기</h3>
          <p>패션 전문가와 함께하세요</p>
          <button class="cta-button" @click="goToApplyPage">신청하기</button>
        </div>
      </aside>
    </main>
    <FooterView/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';

const route = useRoute();
const router = useRouter();

/* ================== axios 인스턴스 ================== */
const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3000',
});
const api = axios.create({
  baseURL: '/api',
   withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해 주세요.')
      router.push('/')
    }
    return Promise.reject(err)
  }
);


const postData = ref(null);
const commentData = ref([]);
const isLoading = ref(true);
const error = ref(null);

const newCommentText = ref('');
const postId = ref(null);
const fallbackImage = '/images/default_avatar.png'; // ✅ 프로필 이미지 없을 때 fallback

// --- 임시 로그인 정보 ---
const currentMemberNum = ref(4); // 예: user01 (이민준)
const currentMemberName = ref('이민준');
// -----------------------

// --- 사이드바 데이터 ---
const categories = ref([]);
const categoriesLoading = ref(false);
const popularMentors = ref([]); // { num, name, field, likes }
// -----------------------


onMounted(async () => {
  postId.value = route.params.id;
  if (!postId.value) {
    error.value = "게시글 ID가 주소에 포함되지 않았습니다.";
    isLoading.value = false;
    return;
  }
  // ✅ 병렬 로딩: 게시글/댓글 + 카테고리 + 인기 멘토
  await Promise.all([
      fetchPostAndComments(),
      fetchCategories(),
      fetchPopularMentors()
  ]);
});

// ✅ 카테고리(해시태그) 로딩 함수
const fetchCategories = async () => {
  categoriesLoading.value = true;
  try {
    const response = await jsonServerApi.get('/Hash_Tag'); // db.json의 Hash_Tag 사용
    categories.value = Array.isArray(response.data) ? response.data : [];
  } catch (e) {
    console.error('카테고리(해시태그) 조회 실패:', e);
    categories.value = [];
  } finally {
    categoriesLoading.value = false;
  }
};

// ✅ 인기 멘토 로딩 함수 (임시 구현: 최근 멘토링 작성자 3명)
const fetchPopularMentors = async () => {
   try {
     // 1. 최근 멘토링 게시글 5개 정도 가져오기 (작성자 중복 가능)
     const recentMentoringRes = await jsonServerApi.get('/Mentoring_Post', {
       params: { _sort: 'num', _order: 'desc', _limit: 5 }
     });
     const recentPosts = Array.isArray(recentMentoringRes.data) ? recentMentoringRes.data : [];
     if (recentPosts.length === 0) {
       popularMentors.value = [];
       return;
     }

     // 2. 작성자 번호(author_num) 목록 추출 및 중복 제거 (최대 3명)
     const authorNums = [...new Set(recentPosts.map(p => p.author_num).filter(Boolean))].slice(0, 3);
     if (authorNums.length === 0) {
       popularMentors.value = [];
       return;
     }

     // 3. 해당 작성자(Member) 정보 조회
     const memberParams = new URLSearchParams();
     authorNums.forEach(num => memberParams.append('num', num));
     const membersRes = await jsonServerApi.get(`/Member?${memberParams.toString()}`);
     const members = Array.isArray(membersRes.data) ? membersRes.data : [];

     // 4. 사이드바 표시 형식으로 매핑
     popularMentors.value = members.map(m => ({
       num: m.num, // ✅ Member.num (인플루언서 페이지 이동 시 사용)
       name: m.NAME || '알 수 없음',
       field: '전문 멘토', // 임시 필드
       likes: m.good_count || 0 // Member 테이블의 good_count 사용 (임시 '인기' 지표)
     }));

   } catch (e) {
     console.error('인기 멘토 조회 실패:', e);
     popularMentors.value = [];
   }
};

// 게시글 및 댓글 데이터 로딩 함수 (이전과 거의 동일, 작성자/댓글 이름 가져오는 부분만 jsonServerApi 사용)
const fetchPostAndComments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // 1. 게시글 정보 가져오기 (Spring API)
    const postResponse = await api.get(`/manager-service/posts/mentoring/${postId.value}`);
    let fetchedPost = postResponse.data;

    // 2. 작성자 정보 가져오기 (json-server)
    if (fetchedPost && fetchedPost.author_num != null) {
      try {
        const memberResponse = await jsonServerApi.get(`/Member/${fetchedPost.author_num}`);
        fetchedPost.memberName = memberResponse.data?.NAME || '작성자 정보 없음';
      } catch (memberError) {
        console.error(`작성자(${fetchedPost.author_num}) 정보 조회 실패:`, memberError);
        fetchedPost.memberName = '정보 조회 실패';
      }
    } else {
      fetchedPost.memberName = '작성자 정보 없음';
    }
    postData.value = fetchedPost;


    // 3. 댓글 정보 가져오기 (Spring API)
    const commentsResponse = await api.get(`/manager-service/comments/getcomments`, {
      params: { postType: 'mentoring', postNum: postId.value }
    });
    let fetchedComments = commentsResponse.data.map(c => ({ ...c, userReaction: null, isReacting: false }));

    // 4. 댓글 작성자 정보 가져오기 (json-server)
    if (fetchedComments.length > 0) {
       const commentAuthorNums = fetchedComments.map(c => c.member_num).filter(num => num != null);
       if (commentAuthorNums.length > 0) {
         const uniqueCommentAuthorNums = [...new Set(commentAuthorNums)];
         const commentMemberParams = new URLSearchParams();
         uniqueCommentAuthorNums.forEach(num => commentMemberParams.append('num', num));
          try {
             const commentMemberResponse = await jsonServerApi.get(`/Member?${commentMemberParams.toString()}`);
             const commentMembers = Array.isArray(commentMemberResponse.data) ? commentMemberResponse.data : [];
             const commentMemberMap = new Map(commentMembers.map(m => [m.num, m.NAME]));
             fetchedComments = fetchedComments.map(comment => ({
                ...comment,
                memberName: commentMemberMap.get(comment.member_num) || '알 수 없음'
             }));
          } catch (commentMemberError) {
             console.error('댓글 작성자 정보 조회 실패:', commentMemberError);
             fetchedComments = fetchedComments.map(comment => ({ ...comment, memberName: '정보 조회 실패' }));
          }
       } else {
          fetchedComments = fetchedComments.map(comment => ({ ...comment, memberName: '작성자 정보 없음' }));
       }
    }
    commentData.value = fetchedComments;

  } catch (err) {
    console.error("데이터 로딩 에러:", err);
    error.value = "게시글 정보를 불러오는 데 실패했습니다.";
    if (err.response && err.response.status === 404) {
      error.value = "해당 게시글을 찾을 수 없습니다.";
    }
  } finally {
    isLoading.value = false;
  }
};


// 댓글 반응 없음
const toggleCommentReaction = (comment, reactionType) => {
  console.log("멘토링 게시글의 댓글은 반응 기능을 지원하지 않습니다.");
};

// 댓글 작성 (Spring API 사용)
const handleCommentSubmit = async () => {
  if (!newCommentText.value.trim()) { alert("댓글 내용을 입력해주세요."); return; }
  try {
    const payload = {
        memberNum: currentMemberNum.value,
        postType: 'mentoring',
        postNum: postId.value,
        content: newCommentText.value.trim()
    };
    const response = await api.post(`/manager-service/comments/createcomment`, payload);
    const newComment = response.data;
    if (!newComment.memberName) {
        // ✅ 새 댓글에 현재 사용자 이름 설정
        newComment.memberName = currentMemberName.value;
    }
    if (newComment.member_num == null) {
        newComment.member_num = currentMemberNum.value;
    }
    commentData.value.push({ ...newComment, userReaction: null, isReacting: false });
    newCommentText.value = '';
  } catch (err) { console.error("댓글 등록 에러:", err); alert("댓글 등록 실패"); }
};

// 게시글 수정 페이지 이동 (멘토링용 수정 페이지 라우트 필요)
const editPost = () => {
  // router.push({ name: 'editMentoringPost', params: { id: postId.value } });
  alert('멘토링 게시글 수정 라우터 설정 필요');
};

// 게시글 삭제 (json-server API)
const deletePost = async () => {
  if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    try {
      await jsonServerApi.delete(`/Mentoring_Post/${postId.value}`);
      alert('게시글이 삭제되었습니다.');
      router.push({ name: 'mentoringboardview' });
    } catch (err) { console.error("게시글 삭제 에러:", err); alert('게시글 삭제 실패'); }
  }
};

// 댓글 수정 기능 제거됨 (신고로 대체)

// ✅ 댓글 삭제 (json-server API)
const deleteComment = async (commentNum) => {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    try {
      await jsonServerApi.delete(`/Comment/${commentNum}`); // db.json의 Comment 테이블 사용
      alert('댓글이 삭제되었습니다.');
      commentData.value = commentData.value.filter(c => c.num !== commentNum);
    } catch (err) { console.error("댓글 삭제 에러:", err); alert('댓글 삭제 실패'); }
  }
};

// ✅ 게시글 신고 페이지 이동
const reportPost = (postNum) => {
  router.push({ name: 'reportMentoringPost', params: { num: postNum } });
};

// ✅ 댓글 신고 페이지 이동
const reportComment = (commentNum) => {
  router.push({ name: 'reportComment', params: { num: commentNum } });
};

// ✅ 인플루언서 페이지 이동
const goToMentorPage = (mentorNum) => {
  if (!mentorNum) return;
  router.push({ name: 'influencerpage-profile', params: { num: mentorNum } });
};

// ✅ 인플루언서 신청 페이지 이동
const goToApplyPage = () => {
  router.push({ name: 'influencerapply' });
};

</script>

<style scoped>
/* [수정] 수정/삭제 버튼 스타일 추가 */
.post-edit-actions, .comment-edit-actions {
  display: flex;
  gap: 8px;
  margin-left: auto; /* 헤더에서 오른쪽 정렬 */
}
.post-edit-actions button, .comment-edit-actions button {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.post-edit-actions button:hover, .comment-edit-actions button:hover {
  background-color: var(--bg-light);
  color: var(--text-primary);
}
.comment-item {
  position: relative;
}
.comment-edit-actions {
  position: absolute; /* 댓글 우측 상단 배치 */
  top: 1rem;
  right: 0;
}

/* ✅ 게시글 신고 버튼 */
.report-button {
  display: inline-flex; /* 텍스트 옆에 배치되도록 */
  background: #fff0f0; /* 연한 빨강 배경 */
  color: #d4183d; /* 빨강 텍스트 */
  border: 1px solid #ffcccc; /* 연한 빨강 테두리 */
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 16px; /* 본문 내용과 간격 */
  font-weight: 500;
}
.report-button:hover {
  background: #ffe0e0;
}
/* 댓글 신고 버튼은 기본 버튼 스타일 사용 */


/* 기존 스타일 복사 */
:root {
  --primary-color: #155DFC;
  --text-primary: #101828;
  --text-secondary: #364153;
  --text-light: #6A7282;
  --border-color: #E5E7EB;
  --bg-light: #F9FAFB;
  --bg-white: #FFFFFF;
  --separator-color: #E5E7EB;
  --recruiting-color: #008236; /* 모집중 텍스트 색 */
  --recruiting-bg: #DCFCE7; /* 모집중 배경 색 */
  --closed-color: #4B5563; /* 마감 텍스트 색 */
  --closed-bg: #F3F4F6; /* 마감 배경 색 */
}

#mentoring-post-page {
  font-family: 'ABeeZee', 'Arimo', sans-serif;
  background-color: var(--bg-white);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.community-banner {
  background: url('/images/FMbanner.jpg') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  position: relative;
}
.community-banner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
}
.community-banner h1, .community-banner p {
    position: relative;
    z-index: 2;
}
.community-banner h1 {
  font-size: 36px;
  margin: 0 0 0.5rem 0;
}
.community-banner p {
  font-size: 16px;
  color: #D1D5DC;
  margin: 0;
}

.main-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
  flex: 1;
}

.post-column {
  flex: 2;
  max-width: 800px;
}
.post-card {
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.post-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 0.75rem;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  background: var(--border-color);
  color: var(--text-light);
  flex-shrink: 0;
  object-fit: cover; /* ✅ 추가: 이미지가 원에 맞게 잘리도록 */
}
.poster-avatar {
  background: var(--text-primary);
  color: white;
}
.user-info {
  flex: 1;
  text-align: left;
}
.user-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: bold;
}

.post-body {
  padding: 0 1.5rem 1.5rem;
  text-align: left;
  /* border-bottom 제거됨 */
}
.post-body h2 {
  font-size: 18px;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  font-weight: bold;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
/* 모집중/마감 배지 스타일 */
.tags span.recruiting-badge {
  font-size: 14px;
  cursor: default !important;
  padding: 4px 12px !important;
  border-radius: 4px;
  font-weight: bold !important;
  background-color: var(--recruiting-bg);
  color: var(--recruiting-color);
}
.tags span.recruiting-badge.closed {
  background-color: var(--closed-bg);
  color: var(--closed-color);
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
  object-fit: cover;
  max-height: 500px;
}
.post-content-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  white-space: pre-wrap;
}
.post-content-text p {
  margin: 0.5rem 0;
}
.post-content-text pre {
  background-color: var(--bg-light);
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: monospace;
}

.post-meta {
  padding: 1rem 1.5rem;
  font-size: 14px;
  color: var(--text-light);
  text-align: left;
  border-top: 1px solid var(--separator-color); /* 상단 구분선 추가 */
}

.comment-section {
  padding: 1.5rem;
  border-top: 5px solid var(--separator-color);
}
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.comment-header h3 {
  font-size: 16px;
  margin: 0;
  font-weight: bold;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comment-item {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0;
  border-bottom: 1px solid #F3F4F6;
  align-items: flex-start;
  position: relative;
}
.comment-item:last-child {
  border-bottom: none;
}
.comment-avatar {
  width: 32px;
  height: 32px;
  font-size: 12px;
  margin-top: 4px;
}
.comment-content {
  flex: 1;
  text-align: left;
}
.comment-author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.comment-author-info strong {
  font-size: 14px;
}
.comment-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0.5rem 0;
  word-break: break-word;
  white-space: pre-wrap;
}

.comment-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #F3F4F6;
}
.comment-input {
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 16px;
}
.comment-submit-button {
  padding: 0.75rem 1rem;
  background: var(--text-primary);
  color: var(--bg-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.comment-submit-button:hover {
    background-color: var(--text-secondary);
}

/* --- 사이드바 스타일 (기존과 동일, 카테고리 버튼 추가) --- */
.sidebar-column {
  flex: 1;
  max-width: 390px;
  min-width: 300px;
}
.widget {
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left;
}
.widget h3 {
  font-size: 16px;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}
.widget h3 .icon {
  font-size: 1.2em;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.category-list button {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  background: var(--bg-light);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
}
.category-list button.active {
  background: var(--text-primary);
  color: var(--bg-white);
}

.mentor-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.mentor-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F3F4F6;
}
.mentor-list li:last-child {
  border-bottom: none;
}
.mentor-info {
  display: flex;
  flex-direction: column;
}
.mentor-info strong {
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 600; /* 추가 */
}
.mentor-info strong:hover { /* ✅ 추가: 호버 효과 */
  color: var(--primary-color);
  text-decoration: underline;
}
.mentor-info span {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 2px;
}
.mentor-likes {
  font-size: 12px;
  color: #99A1AF;
  display: flex;
  align-items: center;
  gap: 2px;
}

.cta-widget {
  background: linear-gradient(135deg, #155DFC 0%, #51A2FF 100%);
  color: white;
  text-align: center;
}
.cta-widget h3 {
  color: white;
  justify-content: center;
}
.cta-widget p {
  color: #DBEAFE;
  font-size: 14px;
  margin: 0.5rem 0 1rem 0;
}
.cta-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--bg-white);
  color: var(--primary-color);
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s; /* ✅ 추가: 호버 효과 */
}
.cta-button:hover { /* ✅ 추가: 호버 효과 */
  background-color: #f0f5ff;
}

.state {
  text-align: center;
  color: var(--text-light);
  padding: 2rem;
}
.state.error {
  color: #e53935;
}
</style>