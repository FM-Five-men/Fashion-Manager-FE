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
            <div class="avatar poster-avatar">{{ postData.memberName?.charAt(0) || '?' }}</div>
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
                <div class="comment-edit-actions" v-if="comment.member_num === currentMemberNum"> 
                  <button @click="editComment(comment)">수정</button>
                  <button @click="deleteComment(comment.num)">삭제</button>
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
            <button v-for="category in categories" :key="category" :class="{ active: category === '전체' }">
              {{ category }}
            </button>
          </div>
        </div>
        <div class="widget mentors-widget">
          <h3><span class="icon">🏆</span> 인기 멘토</h3>
          <ul class="mentor-list">
            <li v-for="mentor in popularMentors" :key="mentor.name">
              <div class="mentor-info">
                <strong>{{ mentor.name }}</strong>
                <span>{{ mentor.field }}</span>
              </div>
              <div class="mentor-likes">
                <span class="icon">⭐</span> {{ mentor.likes }}
              </div>
            </li>
          </ul>
        </div>
        <div class="widget cta-widget">
          <h3>멘토로 활동하기</h3>
          <p>패션 전문가와 함께하세요</p>
          <button class="cta-button">신청하기</button>
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
// 댓글 수정/삭제는 json-server 직접 호출
const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3000',
});
// 게시글/댓글 조회/생성은 기존 프록시 사용 가정
const api = axios.create({
  baseURL: '/api', // 기존 프록시 경로
   withCredentials: true,
});
// 토큰 인터셉터 추가
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
});
// 401 에러 인터셉터 추가
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해 주세요.')
      router.push('/') // 로그인 페이지로 리다이렉트
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

// --- 임시 로그인 정보 ---
// ✅ 실제 구현 시 sessionStorage 또는 상태 관리 라이브러리(Pinia/Vuex)에서 가져오도록 수정
const currentMemberNum = ref(4); // 예: user01 (이민준)
const currentMemberName = ref('이민준');
// -----------------------

// const MENTORING_POST_CATEGORY = 3; // 사용되지 않음

onMounted(async () => {
  postId.value = route.params.id; // URL 파라미터에서 게시글 ID 가져오기
  if (!postId.value) {
    error.value = "게시글 ID가 주소에 포함되지 않았습니다.";
    isLoading.value = false;
    return;
  }
  await fetchPostAndComments(); // 데이터 로딩 함수 호출
});

// 게시글 및 댓글 데이터 로딩 함수
const fetchPostAndComments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // 1. 게시글 정보 가져오기 (기존 Spring API 사용)
    const postResponse = await api.get(`/manager-service/posts/mentoring/${postId.value}`);
    let fetchedPost = postResponse.data;

    // 2. 작성자 정보 가져오기 (json-server 사용)
    if (fetchedPost && fetchedPost.author_num != null) {
      try {
        // json-server에서 Member 정보 조회
        const memberResponse = await jsonServerApi.get(`/Member/${fetchedPost.author_num}`);
        // NAME 필드를 memberName으로 추가
        fetchedPost.memberName = memberResponse.data?.NAME || '작성자 정보 없음';
      } catch (memberError) {
        // Member 조회 실패 시 처리
        console.error(`작성자(${fetchedPost.author_num}) 정보 조회 실패:`, memberError);
        fetchedPost.memberName = '정보 조회 실패';
      }
    } else {
      // author_num이 없는 경우
      fetchedPost.memberName = '작성자 정보 없음';
    }
    postData.value = fetchedPost; // 게시글 데이터 상태 업데이트


    // 3. 댓글 정보 가져오기 (기존 Spring API 사용)
    const commentsResponse = await api.get(`/manager-service/comments/getcomments`, {
      params: { postType: 'mentoring', postNum: postId.value } // 백엔드 파라미터 확인 필요
    });
    // 기본 댓글 데이터 매핑 (반응 관련 필드 초기화)
    let fetchedComments = commentsResponse.data.map(c => ({ ...c, userReaction: null, isReacting: false }));

    // 4. 댓글 작성자 정보 가져오기 (json-server 사용)
    if (fetchedComments.length > 0) {
       // 댓글 작성자 num 목록 추출 (null 제외)
       const commentAuthorNums = fetchedComments.map(c => c.member_num).filter(num => num != null);
       if (commentAuthorNums.length > 0) {
         // 중복 제거
         const uniqueCommentAuthorNums = [...new Set(commentAuthorNums)];
         // json-server에 보낼 파라미터 생성 (예: ?num=4&num=5)
         const commentMemberParams = new URLSearchParams();
         uniqueCommentAuthorNums.forEach(num => commentMemberParams.append('num', num));
          try {
             // json-server에서 여러 Member 정보 한번에 조회
             const commentMemberResponse = await jsonServerApi.get(`/Member?${commentMemberParams.toString()}`);
             const commentMembers = Array.isArray(commentMemberResponse.data) ? commentMemberResponse.data : [];
             // num을 키로, NAME을 값으로 하는 Map 생성 (조회 효율성)
             const commentMemberMap = new Map(commentMembers.map(m => [m.num, m.NAME]));

             // 각 댓글에 memberName 추가
             fetchedComments = fetchedComments.map(comment => ({
                ...comment,
                memberName: commentMemberMap.get(comment.member_num) || '알 수 없음' // Map에서 이름 찾기
             }));
          } catch (commentMemberError) {
             console.error('댓글 작성자 정보 조회 실패:', commentMemberError);
             // 조회 실패 시 기본값 설정
             fetchedComments = fetchedComments.map(comment => ({ ...comment, memberName: '정보 조회 실패' }));
          }
       } else {
          // member_num이 없는 댓글 처리
          fetchedComments = fetchedComments.map(comment => ({ ...comment, memberName: '작성자 정보 없음' }));
       }
    }
    commentData.value = fetchedComments; // 최종 댓글 목록 상태 업데이트

  } catch (err) {
    console.error("데이터 로딩 에러:", err);
    error.value = "게시글 정보를 불러오는 데 실패했습니다.";
    // 404 에러 처리
    if (err.response && err.response.status === 404) {
      error.value = "해당 게시글을 찾을 수 없습니다.";
    }
  } finally {
    isLoading.value = false; // 로딩 상태 해제
  }
};


// 멘토링 댓글 반응 기능 없음 (호출 시 콘솔 로그만 출력)
const toggleCommentReaction = async (comment, reactionType) => {
  console.log("멘토링 게시글의 댓글은 반응 기능을 지원하지 않습니다.");
};

// 댓글 작성 (기존 Spring API 사용)
const handleCommentSubmit = async () => {
  if (!newCommentText.value.trim()) { alert("댓글 내용을 입력해주세요."); return; }
  try {
    // 백엔드 API 페이로드 형식 확인 필요
    const payload = {
        memberNum: currentMemberNum.value, // 현재 로그인 사용자 번호
        postType: 'mentoring',
        postNum: postId.value, // 현재 게시글 번호
        content: newCommentText.value.trim() // 입력된 댓글 내용
    };
    // 기존 백엔드 API 엔드포인트 사용
    const response = await api.post(`/manager-service/comments/createcomment`, payload);

    const newComment = response.data;
    // 새 댓글에 작성자 이름 추가 (현재 로그인 사용자 이름 사용)
    if (!newComment.memberName) {
        newComment.memberName = currentMemberName.value;
    }
    // member_num도 현재 사용자 번호로 설정 (백엔드 응답에 없을 경우 대비)
    if (newComment.member_num == null) {
        newComment.member_num = currentMemberNum.value;
    }

    // 댓글 목록에 새 댓글 추가
    commentData.value.push({ ...newComment, userReaction: null, isReacting: false });
    newCommentText.value = ''; // 입력 필드 초기화
  } catch (err) { console.error("댓글 등록 에러:", err); alert("댓글 등록 실패"); }
};

// --- 게시글/댓글 수정 및 삭제 함수 ---

// 게시글 수정 페이지 이동 (라우터 설정 필요)
const editPost = () => {
  // TODO: 멘토링 게시글 수정 페이지 라우트 이름('editMentoringPost' 등) 확인 및 설정 필요
  // 예시: router.push({ name: 'editMentoringPost', params: { id: postId.value } });
  alert('멘토링 게시글 수정 기능 구현 필요 (라우터 설정 확인)');
};

// 게시글 삭제 (json-server 직접 호출)
const deletePost = async () => {
  if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    try {
      // ✅ json-server DELETE 요청
      await jsonServerApi.delete(`/Mentoring_Post/${postId.value}`);
      alert('게시글이 삭제되었습니다.');
      // ✅ 게시판 라우트 이름 확인 ('mentoringboardview')
      router.push({ name: 'mentoringboardview' });
    } catch (err) { console.error("게시글 삭제 에러:", err); alert('게시글 삭제 실패'); }
  }
};

// 댓글 수정 (json-server 직접 호출)
const editComment = async (comment) => {
  const newContent = prompt('댓글 수정:', comment.content);
  // 사용자가 취소하지 않았고, 내용이 변경되었을 경우에만 실행
  if (newContent !== null && newContent.trim() !== comment.content) {
    try {
      // ✅ json-server PATCH 요청으로 content만 업데이트
      const response = await jsonServerApi.patch(`/Comment/${comment.num}`, {
        content: newContent.trim() // 공백 제거 후 전송
      });
      // 성공 시 로컬 데이터 업데이트
      const index = commentData.value.findIndex(c => c.num === comment.num);
      if (index !== -1) {
        // 서버 응답값(업데이트된 댓글 객체)으로 교체하는 것이 더 안전
        commentData.value[index] = {
            ...commentData.value[index], // 기존 정보 유지 (작성자 등)
            content: response.data.content // 서버에서 받은 content로 업데이트
        };
      }
      alert('댓글이 수정되었습니다.');
    } catch (err) {
      console.error('댓글 수정 실패:', err);
      alert('댓글 수정에 실패했습니다.');
    }
  }
};

// 댓글 삭제 (json-server 직접 호출)
const deleteComment = async (commentNum) => {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    try {
      // ✅ json-server DELETE 요청
      await jsonServerApi.delete(`/Comment/${commentNum}`);
      alert('댓글이 삭제되었습니다.');
      // 로컬 상태 업데이트 (삭제된 댓글 제거)
      commentData.value = commentData.value.filter(c => c.num !== commentNum);
    } catch (err) { console.error("댓글 삭제 에러:", err); alert('댓글 삭제 실패'); }
  }
};

// --- 사이드바 데이터 (고정값) ---
const categories = ref(['전체', '코디 조언', '스타일링', '쇼핑 동행', '브랜드 추천', '트렌드 분석']);
const popularMentors = ref([
  { name: '김패션', field: '코디 멘토링', likes: 234 },
  { name: '배민', field: '브랜딩', likes: 189 },
  { name: '트렌드분석이', field: '트렌드 분석', likes: 156 },
]);
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

/* ✅ 멘토링 댓글 반응 관련 스타일 제거됨 */
/* ✅ 멘토링 게시글 반응 관련 스타일 제거됨 */


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
/* .level-badge, .post-time 제거됨 */

.post-body {
  padding: 0 1.5rem 1.5rem;
  text-align: left;
  border-bottom: 5px solid var(--separator-color);
  padding-bottom: 1.5rem;
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
  cursor: default !important; /* 클릭 불가 표시 */
  padding: 4px 12px !important;
  border-radius: 4px;
  font-weight: bold !important;
  background-color: var(--recruiting-bg);
  color: var(--recruiting-color);
}
.tags span.recruiting-badge.closed { /* FINISH === 1 일 때 */
  background-color: var(--closed-bg);
  color: var(--closed-color);
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
  object-fit: cover;
  max-height: 500px; /* 이미지 최대 높이 제한 */
}
.post-content-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  white-space: pre-wrap; /* 줄바꿈 및 공백 유지 */
}
.post-content-text p {
  margin: 0.5rem 0;
}
.post-content-text pre { /* 코드 블록 등 */
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
  border-top: 1px solid var(--separator-color); /* 구분선 추가 */
}

/* ✅ .post-actions 제거됨 */

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
  position: relative; /* 수정/삭제 버튼 위치 기준 */
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
  word-break: break-word; /* 긴 텍스트 줄바꿈 */
  white-space: pre-wrap; /* 댓글 내 줄바꿈 유지 */
}

/* ✅ .comment-actions 제거됨 */

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

/* --- 사이드바 스타일 (기존과 동일) --- */
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