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
                <span>{{ postData.memberName || 'Unknown User' }}</span>
              </div>
            </div>
            <div class="post-edit-actions" v-if="postData.memberNum === currentMemberNum">
              <button @click="editPost">수정</button>
              <button @click="deletePost">삭제</button>
            </div>
          </div>

          <div class="post-body">
            <div class="tags">
              <span class="recruiting-badge">{{ postData.status === 'RECRUITING' ? '모집중' : '모집완료' }}</span>
            </div>
            <h2>{{ postData.title || '제목 없음' }}</h2>
            <img v-if="postData.imageUrl" :src="postData.imageUrl" alt="Post image" class="post-image" />
            <img v-else :src="`/images/mentoringpost${postId}.jpg`" alt="Mentoring default image" class="post-image" />
            <div class="post-content-text" v-html="postData.content || '내용 없음'"></div>
          </div>

          <div class="post-meta">
            <span>조회 {{ postData.views || 0 }}</span> <span>·</span>
            <span>댓글 {{ commentData?.length || 0 }}</span>
          </div>

          <div class="post-actions">
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
                <div class="comment-edit-actions" v-if="comment.memberNum === currentMemberNum">
                  <button @click="editComment(comment)">수정</button>
                  <button @click="deleteComment(comment.num)">삭제</button>
                </div>
              </li>
            </ul>
            <p v-else>아직 댓글이 없습니다.</p>
            <form class="comment-form" @submit.prevent="handleCommentSubmit">
              <div class="avatar comment-avatar">나</div>
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
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // useRouter 추가
import axios from 'axios';
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';

const route = useRoute();
const router = useRouter(); // router 인스턴스 가져오기

const postData = ref(null);
const commentData = ref([]);
const isLoading = ref(true);
const error = ref(null);

const newCommentText = ref('');
const postId = ref(null);

// --- [수정] 실제 로그인 구현 후 이 부분은 수정되어야 합니다 ---
const currentMemberNum = ref(4); 
const currentMemberName = ref('이민준');
// ----------------------------------------------------

const MENTORING_POST_CATEGORY = 3; // 멘토링 카테고리 번호 (백엔드 확인 필요)

// [수정] postReaction 관련 코드 제거
// const postReaction = reactive({ ... });

onMounted(async () => {
  postId.value = route.params.id;
  if (!postId.value) {
    error.value = "게시글 ID가 주소에 포함되지 않았습니다.";
    isLoading.value = false;
    return;
  }
  await fetchPostAndComments();
  // TODO: Fetch user's reaction status for comments
});

const fetchPostAndComments = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const postResponse = await axios.get(`/api/manager-service/posts/mentoring/${postId.value}`);
    postData.value = postResponse.data;

    const commentsResponse = await axios.get(`/api/manager-service/comments/getcomments`, {
      params: { postType: 'mentoring', postNum: postId.value }
    });
    commentData.value = commentsResponse.data.map(c => ({ ...c, userReaction: null, isReacting: false }));

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

// [수정] togglePostReaction 함수 전체 제거
// const togglePostReaction = async (reactionType) => { ... };

// [수정] 멘토링 댓글 반응 기능 제거
const toggleCommentReaction = async (comment, reactionType) => {
  console.log("Mentoring comments do not support reactions.");
  // 멘토링 댓글에 반응 기능이 필요하다면 여기에 Fashion/Review와 동일한 로직 구현
};

const handleCommentSubmit = async () => {
  if (!newCommentText.value.trim()) { alert("댓글 내용을 입력해주세요."); return; }
  try {
    const payload = { content: newCommentText.value, memberNum: currentMemberNum.value, postType: 'mentoring', postNum: postId.value };
    const response = await axios.post(`/api/manager-service/comments/createcomment`, payload);
    const newComment = response.data;
    if (!newComment.memberName) { newComment.memberName = currentMemberName.value; }
    commentData.value.push({ ...newComment, userReaction: null, isReacting: false });
    newCommentText.value = '';
  } catch (err) { console.error("댓글 등록 에러:", err); alert("댓글 등록 실패"); }
};

// --- [수정] 수정/삭제 함수 추가 ---
const editPost = () => {
  // 수정 페이지로 이동
  router.push({ name: 'editmentoringpost', params: { id: postId.value } });
};

const deletePost = async () => {
  if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    try {
      await axios.delete(`/api/manager-service/posts/mentoring/${postId.value}`);
      alert('게시글이 삭제되었습니다.');
      router.push({ name: 'mentoringboard' });
    } catch (err) { console.error("게시글 삭제 에러:", err); alert('게시글 삭제 실패'); }
  }
};

const editComment = (comment) => {
  const newContent = prompt('댓글 수정:', comment.content);
  if (newContent !== null && newContent.trim() !== comment.content) {
    // TODO: 댓글 수정 API 호출
    alert(`댓글 수정 API 호출: ${comment.num}, 내용: ${newContent}`);
    // 성공 시
    // const index = commentData.value.findIndex(c => c.num === comment.num);
    // if (index !== -1) { commentData.value[index].content = newContent; }
  }
};

const deleteComment = async (commentNum) => {
  if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
    try {
      await axios.delete(`/api/manager-service/comments/deletecomment`, { params: { commentNum: commentNum } });
      alert('댓글이 삭제되었습니다.');
      commentData.value = commentData.value.filter(c => c.num !== commentNum);
    } catch (err) { console.error("댓글 삭제 에러:", err); alert('댓글 삭제 실패'); }
  }
};
// ----------------------------

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

/* [수정] 멘토링 댓글 반응 관련 스타일 제거 */
/* .comment-likes, .comment-cheers { ... } */
/* .comment-likes:hover, .comment-cheers:hover { ... } */
/* .comment-likes.active-like { ... } */
/* .comment-cheers.active-cheer { ... } */

/* [수정] 멘토링 게시글 반응 관련 스타일 제거 */
/* .action-button.active-like { ... } */
/* .action-button.active-cheer { ... } */


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
  --recruiting-color: #008236;
  --recruiting-bg: #DCFCE7;
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
.level-badge {
  background: #ECEEF2;
  color: #030213;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
}
.post-time {
  font-size: 12px;
  color: var(--text-light);
  margin-top: 2px;
}

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
.tags span {
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
  background: #EFF6FF;
  padding: 2px 8px;
  border-radius: 4px;
}
.tags span.recruiting-badge {
  background-color: var(--recruiting-bg);
  color: var(--recruiting-color);
  font-weight: bold;
  padding: 4px 12px;
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
}
.post-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 5px solid var(--separator-color);
}
/* [수정] 공유 버튼 외 다른 버튼 스타일 제거 */
.action-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--bg-white);
  cursor: pointer;
  font-size: 14px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}
.action-button:hover {
  background-color: var(--bg-light);
}
.action-button .icon {
  font-size: 1.2em;
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
  word-break: break-word;
}
/* [수정] 멘토링 댓글 반응 관련 스타일 제거 */
/* .comment-actions { ... } */

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