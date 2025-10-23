<template>
  <div id="fashion-community-page">
    <HeaderView />

    <section class="community-banner">
      <h1>FASHION COMMUNITY</h1>
      <p>당신의 스타일을 공유하세요</p>
    </section>

    <main class="main-container">
      
      <div class="post-column">
        <article class="post-card">
          <div class="post-header">
            <div class="avatar poster-avatar">{{ post.user.avatar }}</div>
            <div class="user-info">
              <div class="user-name">
                <span>{{ post.user.name }}</span>
                <span class="level-badge">Lv.{{ post.user.level }}</span>
              </div>
              <div class="post-time">{{ post.time }}</div>
            </div>
            <div class="more-options">...</div>
          </div>
          
          <div class="post-body">
            <h2>{{ post.title }}</h2>
            <div class="tags">
              <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="product-info">
              <div>착용 제품</div>
              <strong>{{ post.product }}</strong>
            </div>
            
            <img src="https://placehold.co/801x1202/cccccc/969696?text=Fashion+Image" alt="Knit Outfit" class="post-image" />
            
            <div class="post-content-text">
              <p>오늘은 제가 요즘 자주 입는 겨울 레이어링 코디를 소개합니다!</p>
              <p>카멜 코트가 정말 잘 어울리는 계절이에요 🧥</p>
              <p>📝 코디 구성<br/>
                - 아우터: {{ post.product }}<br/>
                - 이너: 무신사 스탠다드 후드 티셔츠<br/>
                - 팬츠: 디커버 와이드 데님<br/>
                - 신발: 닥터마틴 1460
              </p>
              <p>오버핏이라 안에 여러 벌 껴입어도 부담없어요!</p>
            </div>
          </div>

          <div class="post-meta">
            <span>조회 {{ post.stats.views }}</span>
            <span>·</span>
            <span>댓글 {{ comments.length }}</span>
          </div>

          <div class="post-actions">
            <button class="action-button">
              <span class="icon">❤️</span> 좋아요 {{ post.stats.likes }}
            </button>
            <button class="action-button">
              <span class="icon">💪</span> 힘내요 {{ post.stats.cheers }}
            </button>
            <button class="action-button">
              <span class="icon">🔗</span> 공유
            </button>
          </div>

          <section class="comment-section">
            <div class="comment-header">
              <h3>댓글 {{ comments.length }}</h3>
              <button>숨기기</button>
            </div>

            <ul class="comment-list">
              <li v-for="comment in comments" :key="comment.id" class="comment-item">
                <div class="avatar comment-avatar">{{ comment.user.avatar }}</div>
                <div class="comment-content">
                  <div class="comment-author-info">
                    <strong>{{ comment.user.name }}</strong>
                    <span v-if="comment.isAuthor" class="author-badge">작성자</span>
                    <span class="comment-time">{{ comment.time }}</span>
                  </div>
                  <p class="comment-text">{{ comment.text }}</p>
                  <div class="comment-likes">
                    <span class="icon">👍</span> {{ comment.likes }}
                  </div>
                </div>
                <div class="more-options">...</div>
              </li>
            </ul>

            <form class="comment-form">
              <div class="avatar comment-avatar">나</div>
              <input type="text" placeholder="댓글을 입력해주세요" class="comment-input" />
              <button type="submit" class="comment-submit-button">등록</button>
            </form>
          </section>

        </article>
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
import { ref } from 'vue';
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';

// 게시글 데이터
const post = ref({
  user: { name: '김패션', level: 15, avatar: '패' },
  time: '5시간 전',
  title: '겨울 레이어링 코디 추천 (오버핏 코트)',
  tags: ['#겨울코디', '#레이어링', '#오버핏', '#코트', '#데일리룩'],
  product: '더블유컨셉 오버핏 울 코트 - 카멜',
  stats: { views: '8,934', likes: 456, cheers: 234 },
});

// 댓글 데이터
const comments = ref([
  { 
    id: 1, 
    user: { name: '코디고민중', avatar: '코' }, 
    time: '4시간 전', 
    text: '색감 너무 예뻐요! 어떤 이너 색상이랑 매치하셨나요?', 
    likes: 8, 
    isAuthor: false 
  },
  { 
    id: 2, 
    user: { name: '패션매니아', avatar: '패' }, 
    time: '3시간 전', 
    text: '블랙, 화이트, 베이지 다 잘 어울려요! 저는 주로 블랙 후드 입어요', 
    likes: 15, 
    isAuthor: true 
  },
]);

// 사이드바: 카테고리 데이터
const categories = ref([
  '전체', '코디 조언', '스타일링', '쇼핑 동행', '브랜드 추천', '트렌드 분석'
]);

// 사이드바: 인기 멘토 데이터
const popularMentors = ref([
  { name: '김패션', field: '코디 멘토링', likes: 234 },
  { name: '배민', field: '브랜딩', likes: 189 },
  { name: '트렌드분석이', field: '트렌드 분석', likes: 156 },
]);
</script>

<style scoped>
/* 전역 스타일 */
:root {
  --primary-color: #155DFC;
  --text-primary: #101828;
  --text-secondary: #364153;
  --text-light: #6A7282;
  --border-color: #E5E7EB;
  --bg-light: #F9FAFB;
  --bg-white: #FFFFFF;
}

#fashion-community-page {
  font-family: 'ABeeZee', 'Arimo', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-primary);
}

/* 1. 상단 헤더 */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background: rgba(243, 243, 243, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav-left .logo { height: 32px; width: auto; }
.nav-left a {
  text-decoration: none;
  color: var(--text-primary);
  font-size: 14px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.search-bar {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.5rem;
}
.icon { width: 24px; height: 24px; cursor: pointer; }
.profile-pic {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}
.logout-button {
  font-size: 12px;
  padding: 0.5rem 1rem;
  background: #B1B1B1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* 2. 커뮤니티 배너 */
.community-banner {
  background: #101828;
  color: white;
  text-align: center;
  padding: 3rem 1rem;
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

/* 3. 메인 컨텐츠 */
.main-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
}

/* 3-1. 게시글 컬럼 */
.post-column {
  flex: 2;
  max-width: 800px;
}
.post-card {
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  overflow: hidden;
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
}
.poster-avatar {
  background: var(--text-primary);
  color: white;
}
.user-info { flex: 1; }
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
}
.more-options {
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: var(--text-light);
}

.post-body { padding: 0 1.5rem 1.5rem; }
.post-body h2 {
  font-size: 16px;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
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
  border-top: 1px solid #F3F4F6;
}
.post-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;
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
  gap: 0.5rem;
}
.action-button:hover { background-color: var(--bg-light); }

.comment-section {
  border-top: 1px solid var(--border-color);
  padding: 1.5rem;
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
}
.comment-header button {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
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
}
.comment-item:last-child { border-bottom: none; }
.comment-avatar {
  width: 32px;
  height: 32px;
  font-size: 12px;
  background: var(--border-color);
  color: var(--text-light);
}
.comment-content { flex: 1; }
.comment-author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.comment-author-info strong { font-size: 14px; }
.author-badge {
  font-size: 12px;
  background: #EFF6FF;
  color: var(--primary-color);
  padding: 2px 6px;
  border-radius: 4px;
}
.comment-time {
  font-size: 12px;
  color: #99A1AF;
}
.comment-text {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0.5rem 0;
}
.comment-likes {
  font-size: 12px;
  color: var(--text-light);
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
  background: #D1D5DC;
  color: var(--bg-white);
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
}

/* 3-2. 사이드바 컬럼 */
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
}
.widget h3 {
  font-size: 16px;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
}
.mentor-likes {
  font-size: 12px;
  color: #99A1AF;
}

.cta-widget {
  background: linear-gradient(135deg, #155DFC 0%, #51A2FF 100%);
  color: white;
  text-align: center;
}
.cta-widget h3 { color: white; justify-content: center; }
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

/* 4. 하단 푸터 */
.app-footer {
  background: var(--text-primary);
  color: var(--bg-white);
  text-align: center;
  padding: 2rem 1rem;
}
.app-footer h2 {
  font-size: 16px;
  margin: 0 0 1rem 0;
}
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
.footer-links a {
  text-decoration: none;
  color: #99A1AF;
  font-size: 16px;
}
.copyright {
  font-size: 12px;
  color: #6A7282;
}
</style>