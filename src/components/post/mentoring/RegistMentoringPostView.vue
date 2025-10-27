<template>
  <div class="page-container">
    <HeaderView/>

    <div class="banner">
      <div class="banner-placeholder-div"></div>
    </div>

    <div class="post-editor-container">
      <div class="post-editor-header">
        <div class="post-editor-title">멘토링 게시글 작성</div>
      </div>
      {/* ✅ @submit.prevent 핸들러 추가 */}
      <form @submit.prevent="onSubmit">
        <div class="form-group title-group">
          <label class="form-label" for="title">제목 <span class="req">*</span></label>
          <div class="input-wrapper title-input-wrapper">
             {/* ✅ v-model 추가 */}
             <input type="text" id="title" class="form-input title-input" placeholder="제목을 입력하세요" v-model="form.title" required>
          </div>
        </div>
        <div class="form-group content-group">
          <label class="form-label" for="content">내용 <span class="req">*</span></label>
          <div class="textarea-wrapper content-textarea-wrapper">
             {/* ✅ v-model 추가 */}
             <textarea id="content" class="form-textarea content-textarea" placeholder="내용을 입력하세요" v-model="form.content" required></textarea>
          </div>
        </div>
        {/* 해시태그는 현재 API에 없으므로 일단 UI만 유지 */}
        <div class="form-group hashtag-group">
          <label class="form-label">해시태그</label>
          <div class="hashtag-input-group">
            <div class="input-wrapper hashtag-input-wrapper">
               <input type="text" class="form-input hashtag-input" placeholder="해시태그 입력 (Enter로 추가)">
            </div>
            <button type="button" class="hashtag-add-button">추가</button> {/* submit 방지 위해 type="button" */}
          </div>
        </div>
        <div class="button-group">
           {/* ✅ 취소 버튼 type="button" 및 @click 핸들러 추가 */}
          <button type="button" class="form-button cancel-button" @click="goBoard">취소</button>
          {/* ✅ 작성 완료 버튼 type="submit" */}
          <button type="submit" class="form-button submit-button">작성 완료</button>
        </div>
      </form>
    </div>

    <FooterView/>
  </div>
</template>

<script setup>
import HeaderView from '../../HeaderView.vue'; // 경로 확인 필요
import FooterView from '../../FooterView.vue'; // 경로 확인 필요
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

/* ================== axios 인스턴스 (json-server용 baseURL) ================== */
const api = axios.create({
  baseURL: 'http://localhost:3000', // ✅ json-server 주소
});

// 폼 데이터 상태
const form = reactive({
  title: '',
  content: '',
});

// 게시판으로 돌아가기
const goBoard = () => {
  // ✅ 게시판 라우트 이름 확인 ('mentoringboardview')
  router.push({ name: 'mentoringboardview' });
};

// 폼 제출 로직
const onSubmit = async () => {
  if (!form.title.trim() || !form.content.trim()) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  // ✅ 실제로는 로그인된 사용자 정보에서 가져와야 함
  // db.json의 Member 데이터 중 김숙희(num: 23)를 임시 작성자로 사용
  const currentAuthorNum = 23;

  const newPostData = {
    title: form.title.trim(),
    content: form.content.trim(),
    FINISH: 0, // 0: 모집중
    author_num: currentAuthorNum, // ✅ 작성자 번호 추가
    // num은 json-server가 자동으로 생성/관리
  };

  try {
    const response = await api.post('/Mentoring_Post', newPostData); // ✅ 엔드포인트 확인
    console.log('게시글 작성 성공:', response.data);
    alert('게시글이 성공적으로 작성되었습니다.');
    goBoard(); // 작성 성공 후 게시판으로 이동
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
  }
};

</script>

<style scoped>
/* Base container styles */
.page-container {
  width: 1440px;
  /* height: 1311px; */ /* 컨텐츠 길이에 따라 자동 조절되도록 제거 */
  min-height: 100vh; /* 최소 높이 설정 */
  position: relative;
  background: white;
  overflow: hidden; /* 스크롤은 내부에서 */
  margin: 0 auto; /* Center page */
  display: flex; /* Flexbox 레이아웃 */
  flex-direction: column; /* 세로 방향 */
}

/* HeaderView와 FooterView는 flex-shrink: 0으로 고정 높이 유지 */
HeaderView, FooterView {
  flex-shrink: 0;
}


.empty-div-placeholder {
 /* 불필요하므로 제거 */
 display: none;
}

/* Footer styles */
.footer-container {
  /* left/top/position:absolute 제거 -> flex item으로 자연스럽게 배치 */
  width: 100%;
  flex-shrink: 0; /* 푸터 높이 고정 */
  /* background: black; */ /* footer-content에서 이미 설정됨 */
}

.footer-content {
  width: 1440px; /* 고정 */
  height: 154px;
  padding-left: 138px;
  padding-right: 138px;
  position: relative; /* 내부 요소 absolute 배치를 위해 */
  background: black;
  display: flex; /* Flexbox 사용 */
  flex-direction: column;
  justify-content: center; /* 세로 중앙 정렬 (flex-end 대신) */
  align-items: center;
  /* gap 제거 (position:absolute로 배치하므로) */
  box-sizing: border-box;
  margin: 0 auto; /* 혹시 page-container보다 넓을 경우 대비 */
}

.footer-title {
  width: 1088px;
  left: 163px;
  top: 25px; /* 고정 위치 */
  position: absolute;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

/* Footer Links */
.footer-links {
   width: auto; /* 자동 너비 */
   position: absolute; /* 중앙 배치 */
   left: 50%;
   top: 70px; /* 제목 아래 위치 조정 */
   transform: translateX(-50%); /* 정확히 중앙 */
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 20px;
}

.footer-link {
  text-align: center;
  color: #99A1AF;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  white-space: nowrap;
  cursor: pointer;
  /* width 제거 */
}
/* Width class 제거 */
/* .footer-link.community { ... } */
/* .footer-link.guideline { ... } */
/* .footer-link.contact { ... } */


.footer-copyright {
  width: 1164px;
  left: 138px;
  bottom: 20px; /* 하단 기준으로 배치 */
  top: auto; /* top 제거 */
  position: absolute;
  text-align: center;
  color: #6A7282;
  font-size: 12px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

/* Banner styles */
.banner {
  width: 1440px; /* 고정 너비 */
  height: 177px;
  /* left/top/position 제거 -> flex item */
  flex-shrink: 0; /* 배너 높이 고정 */
  overflow: hidden;
  background-image: url('https://placehold.co/1440x177'); /* Placeholder */
  background-size: cover;
  background-position: center;
  position: relative; /* 내부 요소 absolute 배치를 위해 */
}

.banner-placeholder-div { /* Empty div inside banner */
  /* 불필요 */
  display: none;
}

/* Post Editor styles */
.post-editor-container {
  width: 1396px; /* 고정 */
  /* height 제거 -> 내용 따라 늘어나도록 */
  min-height: 868px; /* 최소 높이 유지 */
  /* left/top/position 제거 -> flex item + margin */
  margin: 24px auto; /* 상하 간격 및 중앙 정렬 */
  background: white;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.10);
  border-radius: 10px;
  padding: 32px; /* 내부 패딩 */
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  position: relative; /* 버튼 그룹 absolute 배치를 위해 */
  padding-bottom: 80px; /* 버튼 그룹 공간 확보 */
}

/* Form container */
form {
  display: flex; /* Flexbox 사용 */
  flex-direction: column; /* 세로 방향 배치 */
  gap: 16px; /* 폼 그룹 간 간격 */
}

.post-editor-header {
  /* width/height/left/top/position 제거 */
  margin-bottom: 24px; /* 아래 요소와 간격 */
}

.post-editor-title {
  /* left/top/position 제거 */
  color: #0A0A0A;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 700; /* 강조 */
  line-height: 24px;
  word-wrap: break-word;
}

.form-group {
  /* position 제거 */
  display: flex; /* 변경 */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  width: 100%; /* 부모 너비 채움 */
  /* height 제거 */
}
/* .title-group, .content-group, .hashtag-group 제거 */

.form-label {
  /* align-self 제거 */
  /* height 제거 */
  /* position 제거 */
  color: #0A0A0A;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 500; /* 약간 강조 */
  line-height: 20px;
  word-wrap: break-word;
  /* padding-top 제거 */
}

/* ✅ Required field indicator */
.req {
  color: #d4183d; /* Red color for asterisk */
  margin-left: 4px;
}

.input-wrapper, .textarea-wrapper {
  /* align-self 제거 */
  width: 100%; /* 너비 100% */
  padding: 8px 12px; /* 패딩 조정 */
  background: #F3F3F5;
  border-radius: 8px;
  /* outline 제거 */
  border: 1px solid #D1D5DC; /* 테두리 추가 */
  overflow: hidden;
  display: flex; /* 변경 */
  box-sizing: border-box;
}
.title-input-wrapper { height: 40px; align-items: center; } /* 높이 살짝 증가 */
.content-textarea-wrapper {
  min-height: 300px; /* 최소 높이 */
  height: auto; /* 내용 따라 늘어나도록 */
  padding-top: 8px;
  padding-bottom: 8px;
  align-items: flex-start;
}
.hashtag-input-wrapper { flex: 1 1 0; height: 40px; align-items: center; }


.form-input, .form-textarea {
  border: none;
  background: transparent;
  outline: none;
  color: #0A0A0A; /* 입력 텍스트 색상 */
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  width: 100%;
}
.form-input::placeholder, .form-textarea::placeholder {
   color: #717182;
   font-size: 14px;
   font-family: 'Arimo', sans-serif;
   font-weight: 400;
   word-wrap: break-word;
}
.form-textarea {
    height: 100%; /* Fill wrapper */
    min-height: 280px; /* content-textarea-wrapper min-height - padding */
    resize: vertical; /* 세로 리사이즈 허용 */
    line-height: 20px;
}

.hashtag-input-group {
  /* align-self 제거 */
  width: 100%; /* 너비 100% */
  height: 40px; /* 높이 통일 */
  justify-content: flex-start;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 8px;
  display: flex; /* 변경 */
}

.hashtag-add-button {
  width: 60px;
  height: 40px; /* 높이 통일 */
  padding: 8px 16px;
  background: black;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
  color: white;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  flex-shrink: 0; /* 버튼 크기 고정 */
}

.button-group {
  /* width/height/left/top/position 제거 */
  width: 100%; /* 너비 100% */
  position: absolute; /* 카드 하단에 고정 */
  bottom: 32px; /* 카드 패딩 고려 */
  right: 32px;
  justify-content: flex-end;
  align-items: center; /* 세로 중앙 */
  gap: 16px;
  display: flex; /* 변경 */
}

.form-button {
  width: 120px;
  height: 44px;
  padding: 8px 16px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: flex;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  cursor: pointer;
  box-sizing: border-box;
}

.cancel-button {
  background: white;
  /* outline 제거 */
  border: 1px solid rgba(0, 0, 0, 0.10); /* 테두리 사용 */
  color: #0A0A0A;
}

.submit-button {
  background: black;
  color: white;
  border: none;
}

/* Top Navigation styles */
.top-nav {
  width: 1440px; /* 고정 */
  height: 65px;
  /* padding-right 제거 */
  /* left/top/position 제거 -> flex item */
  flex-shrink: 0; /* 헤더 높이 고정 */
  background: rgba(242.99, 242.99, 242.99, 0.80);
  border-bottom: 0.67px solid rgba(0, 0, 0, 0.10);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
  position: sticky; /* 스크롤 시 상단 고정 */
  top: 0;
}

/* ...(기존 네비게이션 내부 스타일 유지)... */
.nav-content {
  width: 100%;
  max-width: 1440px;
  height: 64px;
  padding-left: 16px;
  padding-right: 16px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  box-sizing: border-box;
}

.nav-left {
  width: auto;
  height: 32px;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  display: flex;
}

.logo-container {
  width: 189px;
  height: 32px;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  display: flex;
}

.logo-img {
  width: 125px;
  height: 52px;
  object-fit: contain;
}

.nav-links {
  height: 20px;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  display: flex;
}

.nav-link {
  color: #0A0A0A;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  cursor: pointer;
}

.nav-right {
  width: 448px;
  height: 36px;
  position: relative; /* Keep relative for absolute positioning of children */
}

.user-actions {
    position: absolute; /* Keep absolute within nav-right */
    width: 100%; /* Take full width of parent */
    height: 100%;
    top: 0;
    left: 0;
    display: flex; /* Use flex to position items relative to each other */
    align-items: center; /* Vertically align items */
    justify-content: flex-end; /* 오른쪽 정렬 */
}

.action-item {
    position: relative; /* static 대신 relative 사용 */
    /* left/top 제거 */
    margin-left: 16px; /* 아이템 간 간격 */
}
.action-item:first-child {
  margin-left: 0; /* 첫 아이템 왼쪽 마진 제거 */
}

.logout-wrapper {
    /* width/height/left/top 제거 */
    display: flex;
    align-items: center;
    gap: 8px; /* 프로필 이미지와 버튼 간격 */
    order: 3; /* 순서 조정: 검색 -> 알림 -> 프로필/로그아웃 */
}
.search-icon-placeholder {
    /* width/height/left/top 제거 */
    /* 불필요하면 아예 제거 가능 */
    display: none;
}

.search-action {
   /* width/height/left/top 제거 */
   cursor: pointer;
   order: 1; /* 순서 조정 */
   display: flex; /* 아이콘 중앙 정렬 */
   align-items: center;
   justify-content: center;
   width: 24px; /* 아이콘 크기 + 약간의 여백 */
   height: 24px;
}

.search-icon-outer {
    width: 20px; /* 아이콘 실제 크기 */
    height: 20px;
    position: relative;
    overflow: hidden;
}
.search-icon-inner {}

.search-icon-detail {
    position: absolute;
    outline: 1.67px black solid;
    outline-offset: -0.83px;
    border-radius: 50%; /* 원 형태로 */
}
.detail-1 { width: 3.62px; height: 3.62px; left: 13.88px; top: 13.88px; }
.detail-2 { width: 13.33px; height: 13.33px; left: 2.50px; top: 2.50px; }

.notification-icon {
   /* width/height/left/top 제거 */
   width: 28px;
   height: 28px;
   cursor: pointer;
   order: 2; /* 순서 조정 */
   position: relative; /* 점 위치 기준 */
}
.notification-dot {
   width: 6px; /* 좀 더 잘 보이게 */
   height: 6px;
   /* left/top 제거 */
   position: absolute; /* 아이콘 기준 배치 */
   top: 0px;
   right: 0px;
   background: #E17100;
   border-radius: 50%;
   border: 1px solid white; /* 흰 테두리 추가 */
}


.logout-button-container {
  /* width/height/left/top/position 제거 */
  display: inline-flex; /* 내부 요소 정렬 */
  align-items: center;
}

.logout-button {
  padding: 4px 12px; /* 패딩 조정 */
  background: #B1B1B1;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}

.logout-text {
  text-align: center;
  color: white;
  font-size: 12px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.profile-img-wrapper {
  /* width/height/left/top/position 제거 */
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-radius: 50%;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  display: block; /* 이미지 아래 여백 제거 */
}
</style>