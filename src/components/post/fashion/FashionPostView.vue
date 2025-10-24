<template>
  <div id="fashion-community-page">
    <HeaderView /> <section class="community-banner">
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

            <img src="/images/fashionpost1.jpg" alt="Knit Outfit" class="post-image" />

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
import HeaderView from '../../HeaderView.vue'; // 경로 수정됨
import FooterView from '../../FooterView.vue'; // 경로 수정됨

// (기존 스크립트 내용 유지)
const post = ref({
  user: { name: '김패션', level: 15, avatar: '패' },
  time: '5시간 전',
  title: '겨울 레이어링 코디 추천 (오버핏 코트)',
  tags: ['#겨울코디', '#레이어링', '#오버핏', '#코트', '#데일리룩'],
  product: '더블유컨셉 오버핏 울 코트 - 카멜',
  stats: { views: '8,934', likes: 456, cheers: 234 },
});
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
const categories = ref([
  '전체', '코디 조언', '스타일링', '쇼핑 동행', '브랜드 추천', '트렌드 분석'
]);
const popularMentors = ref([
  { name: '김패션', field: '코디 멘토링', likes: 234 },
  { name: '배민', field: '브랜딩', likes: 189 },
  { name: '트렌드분석이', field: '트렌드 분석', likes: 156 },
]);
</script>

<style scoped>
/* 전역 스타일 변수 (이 컴포넌트 내에서만 유효) */
:root {
  --primary-color: #155DFC;
  --text-primary: #101828;
  --text-secondary: #364153;
  --text-light: #6A7282;
  --border-color: #E5E7EB;
  --bg-light: #F9FAFB;
  --bg-white: #FFFFFF; /* 흰색 변수 */
  --separator-color: #E5E7EB; /* 구분선 색상 변수 */
}

#fashion-community-page {
  font-family: 'ABeeZee', 'Arimo', sans-serif; /* 폰트 설정 */
  /* background-color: var(--bg-light); */ /* 기존 배경색 주석 처리 */
  background-color: var(--bg-white); /* 흰색 배경으로 변경 */
  color: var(--text-primary); /* 기본 텍스트 색상 */
  display: flex; /* flexbox 레이아웃 */
  flex-direction: column; /* 세로 배치 */
  min-height: 100vh; /* 최소 높이를 화면 전체로 */
}

/* 2. 커뮤니티 배너 - 배경 이미지 경로 수정 */
.community-banner {
  background: url('/images/FMbanner.jpg') center/cover no-repeat; /* 배경 이미지 설정 */
  color: white; /* 흰색 텍스트 */
  text-align: center; /* 가운데 정렬 */
  padding: 3rem 1rem; /* 내부 여백 */
  position: relative; /* 텍스트 위치 조정을 위해 */
}
/* 배너 어둡게 처리 (선택 사항) */
.community-banner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3); /* 검은색 투명도 */
    z-index: 1;
}
.community-banner h1, .community-banner p {
    position: relative; /* 텍스트가 overlay 위에 오도록 */
    z-index: 2;
}
.community-banner h1 {
  font-size: 36px; /* 제목 크기 */
  margin: 0 0 0.5rem 0; /* 제목 아래 여백 */
}
.community-banner p {
  font-size: 16px; /* 부제목 크기 */
  color: #D1D5DC; /* 부제목 색상 */
  margin: 0;
}

/* 3. 메인 컨텐츠 영역 */
.main-container {
  display: flex; /* flexbox 사용 (게시글과 사이드바 가로 배치) */
  justify-content: center; /* 가운데 정렬 */
  gap: 1.5rem; /* 게시글과 사이드바 간격 */
  padding: 2rem; /* 내부 여백 */
  max-width: 1400px; /* 최대 너비 제한 */
  margin: 0 auto; /* 좌우 마진 자동으로 가운데 정렬 */
  align-items: flex-start; /* 아이템 상단 정렬 */
  flex: 1; /* 남은 공간 채우도록 설정 */
}

/* 3-1. 게시글 컬럼 */
.post-column {
  flex: 2; /* 사이드바보다 넓게 (2:1 비율) */
  max-width: 800px; /* 최대 너비 제한 */
}
.post-card {
  background: var(--bg-white); /* 흰색 배경 */
  border-radius: 10px; /* 둥근 모서리 */
  border: 1px solid var(--border-color); /* 옅은 회색 테두리 */
  overflow: hidden; /* 내용 넘칠 경우 숨김 */
  margin-bottom: 1.5rem; /* 카드 아래 여백 */
}
.post-header {
  display: flex; /* flexbox 사용 (아바타, 정보, 더보기 가로 배치) */
  align-items: center; /* 세로 가운데 정렬 */
  padding: 1.5rem; /* 내부 여백 */
  gap: 0.75rem; /* 요소 간 간격 */
}
.avatar { /* 아바타 공통 스타일 */
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 원형 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  background: var(--border-color); /* 기본 배경색 */
  color: var(--text-light); /* 기본 글자색 */
  flex-shrink: 0; /* 크기 줄어들지 않도록 */
}
.poster-avatar { /* 작성자 아바타 스타일 */
  background: var(--text-primary); /* 어두운 배경 */
  color: white; /* 흰색 글자 */
}
.user-info {
  flex: 1; /* 남은 공간 차지 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
}
.user-name {
  display: flex; /* 이름과 레벨 뱃지 가로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  gap: 0.5rem; /* 이름과 뱃지 간격 */
  font-size: 14px;
  font-weight: bold;
}
.level-badge { /* 레벨 뱃지 스타일 */
  background: #ECEEF2; /* 배경색 */
  color: #030213; /* 글자색 */
  font-size: 12px;
  padding: 2px 8px; /* 내부 여백 */
  border-radius: 8px; /* 둥근 모서리 */
}
.post-time { /* 게시 시간 스타일 */
  font-size: 12px;
  color: var(--text-light);
  margin-top: 2px; /* 이름 아래 약간의 여백 */
}
.more-options { /* 더보기(...) 버튼 스타일 */
  cursor: pointer; /* 마우스 커서 변경 */
  font-weight: bold;
  font-size: 20px;
  color: var(--text-light);
  margin-left: auto; /* 오른쪽 끝으로 밀기 */
  padding: 0.5rem; /* 클릭 영역 확보 */
}

.post-body {
  padding: 0 1.5rem 1.5rem; /* 내부 여백 (위 제외) */
  text-align: left; /* 텍스트 왼쪽 정렬 */
  /* 본문과 메타 영역 사이에 구분선 추가 */
  border-bottom: 5px solid var(--separator-color); /* <<< 굵기 수정 (5px) */
  padding-bottom: 1.5rem; /* 패딩 조정 */
}
.post-body h2 { /* 게시글 제목 */
  font-size: 18px; /* 크기 조정 */
  color: var(--text-primary);
  margin: 0 0 0.75rem 0; /* 아래 여백 */
  font-weight: bold;
}
.tags { /* 태그 영역 */
  display: flex;
  flex-wrap: wrap; /* 태그 많으면 줄바꿈 */
  gap: 0.5rem; /* 태그 간 간격 */
  margin-bottom: 1rem; /* 아래 여백 */
}
.tags span { /* 개별 태그 */
  font-size: 14px;
  color: var(--primary-color);
  cursor: pointer;
  background: #EFF6FF; /* 연한 파랑 배경 */
  padding: 2px 8px; /* 내부 여백 */
  border-radius: 4px; /* 둥근 모서리 */
}
.product-info { /* 착용 제품 정보 영역 */
  background: var(--bg-light); /* 약간 어두운 배경 */
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 12px;
  color: var(--text-light);
}
.product-info strong { /* 제품명 */
  display: block; /* 줄바꿈 */
  font-size: 14px;
  color: var(--text-primary);
  margin-top: 2px;
}
.post-image { /* 게시글 이미지 */
  width: 100%;
  height: auto; /* 비율 유지 */
  border-radius: 4px;
  margin-bottom: 1rem;
}
.post-content-text { /* 게시글 본문 텍스트 */
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7; /* 줄 간격 */
}
.post-content-text p {
  margin: 0.5rem 0; /* 단락 위아래 여백 */
}

.post-meta { /* 조회수, 댓글 수 영역 */
  padding: 1rem 1.5rem;
  font-size: 14px;
  color: var(--text-light);
  /* border-top 제거 (post-body의 border-bottom 사용) */
  text-align: left;
}
.post-actions { /* 좋아요, 힘내요, 공유 버튼 영역 */
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem 1.5rem; /* 상단 여백 추가, 좌우/아래 유지 */
  /* 액션 버튼과 댓글 섹션 사이에 구분선 추가 */
  border-top: 5px solid var(--separator-color); /* <<< 굵기 수정 (5px) */
}
.action-button { /* 액션 버튼 공통 스타일 */
  flex: 1; /* 동일 너비 차지 */
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
  gap: 0.25rem; /* 아이콘과 텍스트 간격 */
}
.action-button:hover {
  background-color: var(--bg-light); /* 마우스 올리면 배경 변경 */
}
.action-button .icon {
  font-size: 1.2em; /* 아이콘 크기 약간 키움 */
}

.comment-section { /* 댓글 섹션 */
  padding: 1.5rem;
  /* 댓글 섹션 시작 부분에도 구분선 추가 */
  border-top: 5px solid var(--separator-color); /* <<< 굵기 수정 (5px) */
  /* margin-top: -1px; */ /* 굵기가 커져서 제거 또는 조정 */
}
.comment-header { /* 댓글 헤더 (제목, 숨기기 버튼) */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.comment-header h3 {
  font-size: 16px;
  margin: 0;
  font-weight: bold; /* 제목 굵게 */
}
.comment-header button { /* 숨기기 버튼 */
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 14px;
  cursor: pointer;
}
.comment-list { /* 댓글 목록 */
  list-style: none; /* 리스트 점 제거 */
  padding: 0;
  margin: 0;
}
.comment-item { /* 개별 댓글 */
  display: flex;
  gap: 0.75rem;
  padding: 1rem 0; /* 위아래 여백 */
  border-bottom: 1px solid #F3F4F6; /* 아래 구분선 (댓글 사이는 1px 유지) */
  align-items: flex-start; /* 상단 정렬 */
}
.comment-item:last-child {
  border-bottom: none; /* 마지막 댓글 구분선 제거 */
}
.comment-avatar { /* 댓글 아바타 */
  width: 32px;
  height: 32px;
  font-size: 12px;
  margin-top: 4px; /* 위치 조정 */
}
.comment-content {
  flex: 1;
  text-align: left;
}
.comment-author-info { /* 댓글 작성자 정보 (이름, 뱃지, 시간) */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
.comment-author-info strong {
  font-size: 14px;
}
.author-badge { /* '작성자' 뱃지 */
  font-size: 12px;
  background: #EFF6FF;
  color: var(--primary-color);
  padding: 2px 6px;
  border-radius: 4px;
}
.comment-time { /* 댓글 시간 */
  font-size: 12px;
  color: #99A1AF;
  margin-left: auto; /* 오른쪽으로 밀기 */
}
.comment-text { /* 댓글 내용 */
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0.5rem 0;
}
.comment-likes { /* 댓글 좋아요 */
  font-size: 12px;
  color: var(--text-light);
  cursor: pointer;
  display: inline-block; /* 아이콘과 숫자 함께 클릭 가능하게 */
}
.comment-likes .icon {
  margin-right: 4px; /* 아이콘 오른쪽 여백 */
}

.comment-form { /* 댓글 작성 폼 */
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #F3F4F6; /* 위쪽 구분선 (폼 위는 1px 유지) */
}
.comment-input { /* 댓글 입력 필드 */
  flex: 1;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 16px;
}
.comment-submit-button { /* 댓글 등록 버튼 */
  padding: 0.75rem 1rem;
  background: var(--text-primary); /* 활성화 시 색상 (임시) */
  color: var(--bg-white);
  border: none;
  border-radius: 4px;
  cursor: pointer; /* 클릭 가능하도록 수정 */
  transition: background-color 0.2s; /* 부드러운 색상 변경 */
}
.comment-submit-button:hover {
    background-color: var(--text-secondary); /* 마우스 올렸을 때 색상 */
}

/* 3-2. 사이드바 컬럼 */
.sidebar-column {
  flex: 1; /* 게시글 컬럼과 1:2 비율 */
  max-width: 390px;
  min-width: 300px; /* 최소 너비 */
}
.widget { /* 사이드바 위젯 공통 스타일 */
  background: var(--bg-white);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: left; /* 내부 요소 왼쪽 정렬 */
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
.widget h3 .icon { /* 위젯 제목 아이콘 */
  font-size: 1.2em;
}

.category-list { /* 카테고리 버튼 목록 */
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.category-list button { /* 카테고리 버튼 */
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  background: var(--bg-light);
  color: var(--text-secondary);
  font-size: 14px;
  cursor: pointer;
}
.category-list button.active { /* 활성화된 카테고리 버튼 */
  background: var(--text-primary);
  color: var(--bg-white);
}

.mentor-list { /* 인기 멘토 목록 */
  list-style: none;
  padding: 0;
  margin: 0;
}
.mentor-list li { /* 멘토 항목 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}
.mentor-info { /* 멘토 정보 (이름, 분야) */
  display: flex;
  flex-direction: column;
}
.mentor-info strong { /* 멘토 이름 */
  font-size: 14px;
  color: var(--text-primary);
}
.mentor-info span { /* 멘토 분야 */
  font-size: 12px;
  color: var(--text-light);
  margin-top: 2px;
}
.mentor-likes { /* 멘토 좋아요 수 */
  font-size: 12px;
  color: #99A1AF;
  display: flex;
  align-items: center;
  gap: 2px; /* 아이콘과 숫자 간격 */
}

.cta-widget { /* 멘토 신청 유도 위젯 */
  background: linear-gradient(135deg, #155DFC 0%, #51A2FF 100%); /* 그라데이션 배경 */
  color: white;
  text-align: center;
}
.cta-widget h3 {
  color: white;
  justify-content: center; /* 제목 가운데 정렬 */
}
.cta-widget p {
  color: #DBEAFE; /* 부제목 색상 */
  font-size: 14px;
  margin: 0.5rem 0 1rem 0;
}
.cta-button { /* 신청하기 버튼 */
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

/* 4. 하단 푸터 (FooterView 컴포넌트 사용하므로 여기서는 제거) */
</style>