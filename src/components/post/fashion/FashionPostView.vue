<template>
  <div id="fashion-community-page">
    <HeaderView />
    <section class="community-banner">
      <h1>FASHION COMMUNITY</h1>
      <p>당신의 스타일을 공유하세요</p>
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
            <div class="avatar poster-avatar">{{ '?' }}</div>
            <div class="user-info">
              <div class="user-name">
                <span>{{ postData.memberName || 'Unknown User' }}</span>
                </div>
              </div>
            <div class="more-options">...</div>
          </div>

          <div class="post-body">
            <h2>{{ postData.title || '제목 없음' }}</h2>
            <div class="tags" v-if="postData.hashTags && postData.hashTags.length > 0">
              <span v-for="tag in postData.hashTags" :key="tag.name">{{ tag.name }}</span>
            </div>
            
            <div class="product-info" v-if="postData.items && postData.items.length > 0">
              <div>착용 제품</div>
              <strong v-for="item in postData.items" :key="item.name">
                {{ item.name }}
                </strong>
            </div>

            <img v-if="postData.imageUrl" :src="postData.imageUrl" alt="Post image" class="post-image" />
            <img v-else :src="`/images/fashionpost${postId}.jpg`" alt="Knit Outfit" class="post-image" />
            <div class="post-content-text" v-html="postData.content || '내용 없음'">
              </div>
          </div>

          <div class="post-meta">
            <span>조회 {{ postData.views || 0 }}</span> <span>·</span>
            <span>댓글 {{ commentData?.length || 0 }}</span>
          </div>

          <div class="post-actions">
            <button 
              class="action-button"
              :class="{ 'active-like': postReaction.isLiked }"
              @click="togglePostReaction('good')">
              <span class="icon">❤️</span> 좋아요 {{ postData.good || 0 }}
            </button>
            <button 
              class="action-button"
              :class="{ 'active-cheer': postReaction.isCheered }"
              @click="togglePostReaction('cheer')">
              <span class="icon">💪</span> 힘내요 {{ postData.cheer || 0 }}
            </button>
            <button class="action-button">
              <span class="icon">🔗</span> 공유
            </button>
          </div>

          <section class="comment-section">
            <div class="comment-header">
              <h3>댓글 {{ commentData?.length || 0 }}</h3>
              </div>

            <ul class="comment-list" v-if="commentData && commentData.length > 0">
              <li v-for="comment in commentData" :key="comment.num" class="comment-item">
                <div class="avatar comment-avatar">{{ '?' }}</div>
                <div class="comment-content">
                  <div class="comment-author-info">
                    <strong>{{ comment.memberName || 'Unknown User' }}</strong>
                    </div>
                  <p class="comment-text">{{ comment.content || '댓글 내용 없음' }}</p>
                  
                  <div class="comment-actions">
                    <div 
                      class="comment-likes" 
                      :class="{ 'active-like': comment.userReaction === 'good' }"
                      @click="toggleCommentReaction(comment, 'good')">
                      <span class="icon">👍</span> 좋아요 {{ comment.good || 0 }}
                    </div>
                    <div 
                      class="comment-cheers" 
                      :class="{ 'active-cheer': comment.userReaction === 'cheer' }"
                      @click="toggleCommentReaction(comment, 'cheer')">
                      <span class="icon">💪</span> 힘내요 {{ comment.cheer || 0 }}
                    </div>
                  </div>

                </div>
                <div class="more-options">...</div>
              </li>
            </ul>
             <p v-else>아직 댓글이 없습니다.</p>

            <form class="comment-form" @submit.prevent="handleCommentSubmit">
              <div class="avatar comment-avatar">나</div>
              <input 
                type="text" 
                placeholder="댓글을 입력해주세요" 
                class="comment-input"
                v-model="newCommentText" 
              />
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
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'

/* =========================== axios 인스턴스 (Board 스타일) =========================== */
const router = useRouter()
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해 주세요.')
      router.push('/')
    }
    return Promise.reject(err)
  }
)

/* =============================== 상태 =============================== */
const route = useRoute()

const postData = ref(null)
const commentData = ref([])
const isLoading = ref(true)
const error = ref(null)

/* 로그인 사용자 정보 */
const memberNum = ref(null)
const memberId = ref(null)
const memberEmail = ref(null)
const memberState = ref(null)
const currentMemberName = ref('') // 댓글 등 즉시 표시용

/* 기존 하드코딩 제거: currentMemberNum → memberNum 사용 */
const FASHION_POST_CATEGORY = 1

/* 반응 상태 */
const postReaction = reactive({
  isLiked: false,
  isCheered: false,
  isLiking: false,
  isCheering: false,
})

/* 상세 이미지 표시용 */
const mainImages = ref([])      // photoCategoryNum === 1
const itemImages = ref([])      // photoCategoryNum !== 1
const activeMainIndex = ref(0)
const fallbackImage = '/images/fallback.png'

/* ====================== 경로 변환: DB path+name → /images/... ====================== 
   예) path: C:\3rdProjectFE\public\images\fashion
       name: 1234-abcd.png
   → /images/fashion/1234-abcd.png
*/
const toPublicImageSrc = (path, name) => {
  if (!name) return null
  if (/^https?:\/\//i.test(name)) return name // 이미 절대 URL이면 그대로
  if (path && /public[\\/]/i.test(path)) {
    const afterPublic = path.split(/public[\\/]/i).pop() || ''
    const base = afterPublic.replaceAll('\\', '/').replace(/^\/+/, '')
    return (`/${base}/${name}`).replace(/\/+/g, '/')
  }
  if (path?.startsWith('/')) {
    return (`${path}/${name}`).replace(/\/+/g, '/')
  }
  // 안전 기본값 (프로젝트 기본 폴더 가정)
  return (`/images/fashion/${name}`).replace(/\/+/g, '/')
}

/* photos 배열 → mainImages/itemImages 구성 */
const buildImagesFromPhotos = (photos = []) => {
  const byPost = photos
    .filter(p => Number(p?.photoCategoryNum) === 1)
    .sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0))
  const byItem = photos
    .filter(p => Number(p?.photoCategoryNum) !== 1)
    .sort((a, b) => (a?.num ?? 0) - (b?.num ?? 0))

  mainImages.value = byPost.map(p => toPublicImageSrc(p?.path, p?.name)).filter(Boolean)
  itemImages.value = byItem.map(p => toPublicImageSrc(p?.path, p?.name)).filter(Boolean)
  activeMainIndex.value = 0
}

const onImgError = (e) => { e.target.src = fallbackImage }

/* =============================== 초기 로딩 =============================== */
const postId = ref(null)
onMounted(async () => {
  // 1) 인증 정보 조회
  const token = sessionStorage.getItem('token')
  if (!token) {
    alert('로그인 후 이용해 주세요.')
    router.push('/')
    return
  }

  try {
    const authRes = await api.get('/member-service/member/auth')
    const d = authRes?.data ?? {}
    memberNum.value = Number(d.memberNum ?? d.num ?? d.number) || null
    memberId.value = d.memberId ?? null
    memberEmail.value = d.memberEmail ?? d.email ?? null
    memberState.value = d.memberState ?? null
    currentMemberName.value = d.memberName ?? d.name ?? '' // 즉시 표시용 이름

    // 디버그 로깅
    console.log('[member auth raw]', d)
    console.log('[memberNum]', memberNum.value)
    console.log('[memberId]', memberId.value)
    console.log('[memberEmail]', memberEmail.value)
    console.log('[memberState]', memberState.value)

    if (!memberNum.value) {
      alert('회원 정보를 확인할 수 없습니다. 다시 로그인해 주세요.')
      router.push('/')
      return
    }
  } catch (e) {
    console.error('인증 정보 조회 실패:', e)
    router.push('/')
    return
  }

  // 2) 라우트 파라미터 확인
  postId.value = route.params.id
  if (!postId.value) {
    error.value = '게시글 ID가 주소에 포함되지 않았습니다. (예: /fashionpost/1)'
    isLoading.value = false
    return
  }

  // 3) 상세/댓글 로딩
  try {
    isLoading.value = true
    error.value = null

    const postRes = await api.get(`/manager-service/posts/fashion/${postId.value}`)
    postData.value = postRes.data

    // 상세의 photos를 사용해 정적 경로로 이미지 구성
    buildImagesFromPhotos(postData.value?.photos || [])

    const commentsRes = await api.get('/manager-service/comments/getcomments', {
      params: { postType: 'fashion', postNum: postId.value }
    })
    commentData.value = (commentsRes.data || []).map(comment => ({
      ...comment,
      userReaction: null,
      isReacting: false,
    }))
  } catch (err) {
    console.error('데이터 로딩 에러:', err)
    error.value = '게시글 정보를 불러오는 데 실패했습니다.'
  } finally {
    isLoading.value = false
  }
})

/* =========================== 게시글 반응 토글 =========================== */
const togglePostReaction = async (reactionType) => {
  if (postReaction.isLiking || postReaction.isCheering) return

  const isLikeAction = reactionType === 'good'
  if (isLikeAction) postReaction.isLiking = true
  else postReaction.isCheering = true

  const payload = {
    memberNum: memberNum.value,
    postCategoryNum: FASHION_POST_CATEGORY,
    reactionType, // 'good' | 'cheer'
  }

  try {
    await api.post(`/manager-service/posts/fashion/react/${postId.value}`, payload)

    if (isLikeAction) {
      const wasLiked = postReaction.isLiked
      postReaction.isLiked = !wasLiked
      postData.value.good += wasLiked ? -1 : 1

      if (postReaction.isLiked && postReaction.isCheered) {
        postReaction.isCheered = false
        postData.value.cheer -= 1
      }
    } else {
      const wasCheered = postReaction.isCheered
      postReaction.isCheered = !wasCheered
      postData.value.cheer += wasCheered ? -1 : 1

      if (postReaction.isCheered && postReaction.isLiked) {
        postReaction.isLiked = false
        postData.value.good -= 1
      }
    }
  } catch (err) {
    console.error(`Error toggling post ${reactionType}:`, err)
    alert('반응을 등록하는 데 실패했습니다.')
  } finally {
    if (isLikeAction) postReaction.isLiking = false
    else postReaction.isCheering = false
  }
}

/* =========================== 댓글 반응 토글 =========================== */
const toggleCommentReaction = async (comment, reactionType) => {
  if (comment.isReacting) return
  comment.isReacting = true

  const payload = {
    memberNum: memberNum.value,
    reactionType, // 'good' | 'cheer'
  }

  try {
    await api.post(`/manager-service/comments/${comment.num}/react`, payload)

    const currentReaction = comment.userReaction
    if (reactionType === 'good') {
      if (currentReaction === 'good') {
        comment.userReaction = null
        comment.good -= 1
      } else {
        comment.userReaction = 'good'
        comment.good += 1
        if (currentReaction === 'cheer') comment.cheer -= 1
      }
    } else {
      if (currentReaction === 'cheer') {
        comment.userReaction = null
        comment.cheer -= 1
      } else {
        comment.userReaction = 'cheer'
        comment.cheer += 1
        if (currentReaction === 'good') comment.good -= 1
      }
    }
  } catch (err) {
    console.error(`Error toggling comment ${reactionType}:`, err)
    alert('댓글 반응을 등록하는 데 실패했습니다.')
  } finally {
    comment.isReacting = false
  }
}

/* =============================== 댓글 등록 =============================== */
const newCommentText = ref('')

const handleCommentSubmit = async () => {
  if (!newCommentText.value.trim()) {
    alert('댓글 내용을 입력해주세요.')
    return
  }

  try {
    const newCommentPayload = {
      content: newCommentText.value,
      memberNum: memberNum.value,
      postType: 'fashion',
      postNum: postId.value,
    }

    const res = await api.post('/manager-service/comments/createcomment', newCommentPayload)
    const created = res.data || {}

    if (!created.memberName) {
      created.memberName = currentMemberName.value || '익명'
    }

    commentData.value.push({
      ...created,
      userReaction: null,
      isReacting: false,
    })

    newCommentText.value = ''
  } catch (err) {
    console.error('댓글 등록 에러:', err)
    alert('댓글 등록에 실패했습니다. (로그인 상태 확인 또는 백엔드 API 확인 필요)')
  }
}

</script>

<style scoped>
:root {
  --primary-color: #155DFC;
  --text-primary: #101828;
  --text-secondary: #364153;
  --text-light: #6A7282;
  --border-color: #E5E7EB;
  --bg-light: #F9FAFB;
  --bg-white: #FFFFFF;
  --separator-color: #E5E7EB;
  /* [신규] 반응 색상 */
  --like-color: #D32F2F;
  --like-bg: #ffebee;
  --like-border: #ffcdd2;
  --cheer-color: #1976D2;
  --cheer-bg: #e3f2fd;
  --cheer-border: #bbdefb;
}

#fashion-community-page {
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
.more-options {
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: var(--text-light);
  margin-left: auto;
  padding: 0.5rem;
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
.product-info {
  background: var(--bg-light);
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 12px;
  color: var(--text-light);
}
.product-info strong {
  display: block;
  font-size: 14px;
  color: var(--text-primary);
  margin-top: 2px;
}
.post-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 1rem;
}
.post-content-text {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
}
.post-content-text p {
  margin: 0.5rem 0;
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

.action-button.active-like {
  background-color: var(--like-bg);
  color: var(--like-color);
  border-color: var(--like-border);
  font-weight: bold;
}
.action-button.active-cheer {
  background-color: var(--cheer-bg);
  color: var(--cheer-color);
  border-color: var(--cheer-border);
  font-weight: bold;
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
.author-badge {
  font-size: 12px;
  background: #EFF6FF;
  color: var(--primary-color);
  padding: 2px 6px;
  border-radius: 4px;
}
.comment-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0.5rem 0;
}
.comment-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}
.comment-likes, .comment-cheers {
  font-size: 12px;
  color: var(--text-light);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}
.comment-likes .icon, .comment-cheers .icon {
  margin-right: 4px;
  font-size: 1.1em;
}
.comment-likes:hover, .comment-cheers:hover {
  background-color: var(--bg-light);
}

.comment-likes.active-like {
  color: var(--like-color);
  background-color: var(--like-bg);
  font-weight: bold;
}
.comment-cheers.active-cheer {
  color: var(--cheer-color);
  background-color: var(--cheer-bg);
  font-weight: bold;
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