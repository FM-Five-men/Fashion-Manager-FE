<template>
  <div class="home-container">
    <!-- 헤더 -->
    <header class="header">
      <div class="logo">FASHIONMANAGER</div>
      <nav>
        <a href="#">패션</a>
        <a href="#">후기</a>
        <a href="#">멘토링</a>
      </nav>
      <div class="header-actions">
        <i class="fas fa-search"></i>
        <i class="fas fa-user"></i>
        <button class="login-btn">로그인</button>
      </div>
    </header>

    <!-- 메인 배너 -->
    <section class="banner">
      <div class="banner-text">
        <h1>FASHION MANAGER PROJECT</h1>
        <p>발견하고, 연결하고, 스타일을 높이세요</p>
      </div>
    </section>

    <!-- 인기 게시물 -->
    <section class="popular-section">
      <h2>인기 인플루언서</h2>
      <div class="post-grid">
        <div
          v-for="(card, index) in posts"
          :key="index"
          class="post-card"
          :style="{ backgroundImage: `url(${card.image})` }"
        >
          <div class="post-info">
            <p>@{{ card.username }}</p>
            <div class="post-stats">
              <span>❤️ {{ card.likes }}</span>
              <span>💬 {{ card.comments }}</span>
              <span>{{ card.engagement }}%</span>
            </div>
          </div>
        </div>
      </div>
      <button class="more-btn">더 많은 게시물 보기</button>
    </section>

    <!-- 커뮤니티 게시판 -->
    <section class="community-section">
      <h2>커뮤니티 게시판</h2>
      <div class="community-columns">
        <div v-for="(board, i) in community" :key="i" class="board-card">
          <h3>{{ board.title }}</h3>
          <ul>
            <li v-for="(item, j) in board.posts" :key="j">
              {{ item }}
            </li>
          </ul>
          <button>모든 게시물 보기</button>
        </div>
      </div>
    </section>

    <!-- 인플루언서 소개 -->
    <section class="influencer-section">
      <h2>인플루언서 스포트라이트</h2>
      <p>패션 세계를 만들어가는 트렌드세터를 팔로우하세요</p>
      <div class="influencer-grid">
        <div
          v-for="(inf, k) in influencers"
          :key="k"
          class="influencer-card"
        >
          <img :src="inf.image" :alt="inf.name" />
          <h4>{{ inf.name }}</h4>
          <p>{{ inf.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="footer">
      <h3>FASHION MANAGER</h3>
      <p>비저너리 프로젝트</p>
      <div class="footer-links">
        <a href="#">소개</a>
        <a href="#">커뮤니티</a>
        <a href="#">가이드라인</a>
        <a href="#">문의</a>
      </div>
      <small>© 2025 Fashion Manager Project. All rights reserved.</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([
  { username: "fashionista_elite", image: "/images/f1.jpg", likes: 1243, comments: 87, engagement: 92 },
  { username: "luxe_lifestyle", image: "/images/f2.jpg", likes: 892, comments: 54, engagement: 78 },
  { username: "street_style_icon", image: "/images/f3.jpg", likes: 567, comments: 32, engagement: 45 },
  { username: "minimal_chic", image: "/images/f4.jpg", likes: 234, comments: 18, engagement: 22 },
  { username: "urban_edge", image: "/images/f5.jpg", likes: 1456, comments: 102, engagement: 88 },
  { username: "designer_daily", image: "/images/f6.jpg", likes: 678, comments: 45, engagement: 52 },
  { username: "vintage_vibes", image: "/images/f7.jpg", likes: 189, comments: 12, engagement: 15 },
  { username: "boutique_boss", image: "/images/f8.jpg", likes: 945, comments: 63, engagement: 71 },
]);

const community = ref([
  {
    title: "패션",
    posts: [
      "2025 봄 시즌 트렌드",
      "스타일링 가이드",
      "빈티지 룩 연출법",
      "패션 브랜드 추천",
    ],
  },
  {
    title: "후기",
    posts: [
      "패션 리뷰 모음",
      "스타일링 서비스 후기",
      "트렌드 비교 리뷰",
      "신상품 피드백",
    ],
  },
  {
    title: "멘토링",
    posts: [
      "패션 브랜드 창업 팁",
      "멘토 인터뷰 모음",
      "스타일링 코치 가이드",
      "멘토와의 상담 후기",
    ],
  },
]);

const influencers = ref([
  { name: "이사벨라 핀", desc: "럭셔리 패션", image: "/images/p1.jpg" },
  { name: "마커스 손슨", desc: "스트릿웨어", image: "/images/p2.jpg" },
  { name: "소피아 로드리게스", desc: "지속가능 스타일", image: "/images/p3.jpg" },
  { name: "제임스 킴", desc: "미니멀리스트", image: "/images/p4.jpg" },
  { name: "엘레나 포포프", desc: "에디토리얼", image: "/images/p5.jpg" },
  { name: "다비데 오카포", desc: "여행과 스타일", image: "/images/p6.jpg" },
]);

onMounted(() => {
  alert('안녕하세요! 페이지가 로드되었습니다 😄');
})
</script>

<style scoped>
.home-container {
  font-family: "Noto Sans KR", sans-serif;
  color: #222;
  overflow-x: hidden;
}

/* 헤더 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 60px;
  background: #000;
  color: #fff;
}

.header nav a {
  margin: 0 15px;
  color: #fff;
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.login-btn {
  background: #f0b400;
  border: none;
  padding: 6px 15px;
  border-radius: 4px;
  cursor: pointer;
}

/* 배너 */
.banner {
  background: url("/images/banner.jpg") center/cover no-repeat;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.banner h1 {
  font-size: 2.5rem;
}

/* 인기 게시물 */
.popular-section {
  padding: 60px;
  background: #fafafa;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.post-card {
  border-radius: 12px;
  height: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.post-info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(255,255,255,0.85);
  padding: 10px;
  text-align: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.more-btn {
  margin-top: 30px;
  background: #000;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
}

/* 커뮤니티 */
.community-section {
  padding: 80px 60px;
}

.community-columns {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.board-card {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
}

.board-card h3 {
  margin-bottom: 15px;
}

.board-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.board-card li {
  margin-bottom: 8px;
  color: #555;
}

/* 인플루언서 */
.influencer-section {
  background: #fffbea;
  padding: 80px 60px;
  text-align: center;
}

.influencer-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
}

.influencer-card img {
  width: 100%;
  border-radius: 50%;
  height: 140px;
  object-fit: cover;
}

/* 푸터 */
.footer {
  background: #000;
  color: #fff;
  text-align: center;
  padding: 50px 20px;
}

.footer-links {
  margin: 20px 0;
}

.footer-links a {
  margin: 0 10px;
  color: #fff;
  text-decoration: none;
}
</style>