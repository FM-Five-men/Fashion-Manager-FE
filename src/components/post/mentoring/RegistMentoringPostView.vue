<template>
  <div class="page-container">
    <div class="empty-div-placeholder"></div>
    <footer class="footer-container">
      <div class="footer-content">
        <div class="footer-title">FASHION MANAGER</div>
        <div class="footer-links">
           <div class="footer-link">소개</div>
           <div class="footer-link community">커뮤니티</div>
           <div class="footer-link guideline">가이드라인</div>
           <div class="footer-link contact">문의</div>
        </div>
        <div class="footer-copyright">© 2025 Fashion Manager Project. All rights reserved.</div>
      </div>
    </footer>
    <div class="banner">
      <div class="banner-placeholder-div"></div>
    </div>
    <div class="post-editor-container">
      <div class="post-editor-header">
        <div class="post-editor-title">게시글 작성</div>
      </div>
      <div class="form-group title-group">
        <label class="form-label">제목</label>
        <div class="input-wrapper title-input-wrapper">
           <input type="text" class="form-input title-input" placeholder="제목을 입력하세요">
        </div>
      </div>
      <div class="form-group content-group">
        <label class="form-label">내용</label>
        <div class="textarea-wrapper content-textarea-wrapper">
           <textarea class="form-textarea content-textarea" placeholder="내용을 입력하세요"></textarea>
        </div>
      </div>
      <div class="form-group hashtag-group">
        <label class="form-label">해시태그</label>
        <div class="hashtag-input-group">
          <div class="input-wrapper hashtag-input-wrapper">
             <input type="text" class="form-input hashtag-input" placeholder="해시태그 입력 (Enter로 추가)">
          </div>
          <button class="hashtag-add-button">추가</button>
        </div>
      </div>
      <div class="button-group">
        <button class="form-button cancel-button">취소</button>
        <button class="form-button submit-button">작성 완료</button>
      </div>
    </div>
    <nav class="top-nav">
      <div class="nav-content">
        <div class="nav-left">
          <div class="logo-container">
            <img class="logo-img" src="https://placehold.co/125x52" alt="Logo"/>
          </div>
          <div class="nav-links">
            <div class="nav-link">패션</div>
            <div class="nav-link">후기</div>
            <div class="nav-link">멘토링</div>
            <div class="nav-link">인플루언서</div>
          </div>
        </div>
        <div class="nav-right">
           <div class="user-actions">
                <div class="action-item logout-wrapper">
                    <div class="logout-button-container">
                        <button class="logout-button">
                            <span class="logout-text">로그아웃</span>
                        </button>
                    </div>
                    <div class="profile-img-wrapper">
                        <img class="profile-img" src="https://placehold.co/32x32" alt="User Profile"/>
                    </div>
                </div>
                <div class="action-item search-icon-placeholder"> <div class="search-input-icon"></div> </div>
               <div class="action-item search-action">
                    <div class="search-icon-outer">
                        <div class="search-icon-inner">
                           <div class="search-icon-detail detail-1"></div>
                            <div class="search-icon-detail detail-2"></div>
                        </div>
                    </div>
                </div>
                <img class="action-item notification-icon" src="https://placehold.co/28x28" alt="Notifications"/>
                <div class="action-item notification-dot"></div>
           </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
// No script logic is needed based on the provided HTML, but kept for consistency
</script>

<style scoped>
/* Base container styles */
.page-container {
  width: 1440px;
  height: 1311px; /* Updated height */
  position: relative;
  background: white;
  overflow: hidden;
  margin: 0 auto; /* Center page */
}

.empty-div-placeholder {
  left: 0px;
  top: 0px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

/* Footer styles */
.footer-container {
  left: 0px;
  top: 1157px; /* Updated top position */
  position: absolute;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.footer-content {
  width: 1440px;
  height: 154px;
  padding-left: 138px;
  padding-right: 138px;
  position: relative;
  background: black;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  display: flex;
  box-sizing: border-box;
}

.footer-title {
  width: 1088px;
  left: 163px;
  top: 25px;
  position: absolute;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

/* Footer Links - Assuming they are meant to be centered horizontally */
.footer-links {
   display: flex;
   justify-content: center;
   gap: 20px; /* Adjust gap as needed */
   margin-bottom: 30px; /* Space above copyright, adjust as needed */
}


.footer-link {
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #99A1AF;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  white-space: nowrap; /* Prevent wrapping */
  cursor: pointer;
}
/* Width adjustments based on original inline styles */
.footer-link { width: 30px; } /* Default/소개/문의 */
.footer-link.community { width: 59px; }
.footer-link.guideline { width: 74px; }
.footer-link.contact { width: 30px; }

.footer-copyright {
  width: 1164px;
  left: 138px;
  top: 115px; /* Or use bottom: 20px; depending on exact layout needs */
  position: absolute;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  color: #6A7282;
  font-size: 12px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

/* Banner styles */
.banner {
  width: 1440px;
  height: 177px;
  left: 0px;
  top: 65px;
  position: absolute;
  overflow: hidden;
  background-image: url('https://placehold.co/1440x177');
  background-size: cover;
  background-position: center;
}

.banner-placeholder-div { /* Empty div inside banner */
  width: 236px;
  height: 24px;
  left: 87px;
  top: 114px;
  position: absolute;
}
/* Banner text elements are removed in this version */

/* Post Editor styles */
.post-editor-container {
  width: 1396px;
  height: 868px;
  left: 22px;
  top: 242px;
  position: absolute;
  background: white;
  box-shadow: 0px 2px 4px -2px rgba(0, 0, 0, 0.10);
  border-radius: 10px;
}

.post-editor-header {
  width: 1332px;
  height: 24px;
  left: 32px;
  top: 32px;
  position: absolute;
}

.post-editor-title {
  left: 0px;
  top: -2.20px; /* Adjust vertical alignment */
  position: absolute;
  color: #0A0A0A;
  font-size: 16px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.form-group {
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  width: 1332px; /* Common width */
}
.title-group { height: 64px; left: 32px; top: 80px; }
.content-group { height: 523px; left: 32px; top: 238px; }
.hashtag-group { height: 64px; left: 32px; top: 159px; }


.form-label {
  align-self: stretch;
  height: 20px;
  position: relative;
  color: #0A0A0A;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  padding-top: 1.2px; /* Offset compensation from top: -1.20px */
}

.input-wrapper, .textarea-wrapper {
  align-self: stretch;
  padding: 4px 12px;
  background: #F3F3F5;
  border-radius: 8px;
  outline: 0.80px solid transparent; /* Mimic original outline */
  overflow: hidden;
  display: inline-flex;
  box-sizing: border-box;
}
.title-input-wrapper { height: 36px; align-items: center; }
.content-textarea-wrapper { height: 495px; padding-top: 8px; padding-bottom: 8px; align-items: flex-start; }
.hashtag-input-wrapper { flex: 1 1 0; height: 36px; align-items: center; }


.form-input, .form-textarea {
  border: none;
  background: transparent;
  outline: none;
  color: #717182;
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
    resize: none; /* Disable resizing */
    line-height: 20px;
}

.hashtag-input-group {
  align-self: stretch;
  height: 36px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
}

.hashtag-add-button {
  width: 60px;
  height: 36px;
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
}

.button-group {
  width: 1332px;
  height: 44px;
  left: 32px;
  top: 792px;
  position: absolute;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 16px;
  display: inline-flex;
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
  outline: 0.80px solid rgba(0, 0, 0, 0.10);
  outline-offset: -0.80px;
  color: #0A0A0A;
  border: none; /* Remove default border if needed */
}

.submit-button {
  background: black;
  color: white;
  border: none;
}

/* Top Navigation styles */
.top-nav {
  width: 1440px;
  height: 65px;
  padding-right: 22px;
  left: 0px;
  top: 0px;
  position: absolute;
  background: rgba(242.99, 242.99, 242.99, 0.80);
  border-bottom: 0.67px solid rgba(0, 0, 0, 0.10);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
}

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
}

.action-item {
    position: absolute; /* Position each action item absolutely */
}

.logout-wrapper {
    width: 124px;
    height: 32px;
    left: 329px;
    top: 2px;
}
.search-icon-placeholder { /* Represents the div containing the search icon */
    width: 256px;
    height: 36px;
    left: 5px;
    top: 0px;
    /* This div seems to act as a container or spacer */
}
.search-input-icon { /* Placeholder for potential icon inside search */
   width: 16px;
   height: 16px;
   left: 12px;
   top: 10px;
   position: absolute;
}

.search-action { /* Wrapper for the magnifying glass icon */
   width: 20px;
   height: 20px;
   left: 245px;
   top: 8px;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   display: inline-flex;
   cursor: pointer; /* Add pointer */
}

.search-icon-outer {
    align-self: stretch;
    height: 20px;
    position: relative;
    overflow: hidden;
}
.search-icon-inner {} /* Inner container, if needed */

.search-icon-detail {
    position: absolute;
    outline: 1.67px black solid;
    outline-offset: -0.83px;
}
.detail-1 { width: 3.62px; height: 3.62px; left: 13.88px; top: 13.88px; }
.detail-2 { width: 13.33px; height: 13.33px; left: 2.50px; top: 2.50px; border-radius: 50%; } /* Circle */

.notification-icon {
   width: 28px;
   height: 28px;
   left: 282px;
   top: 4px;
   cursor: pointer;
}
.notification-dot {
   width: 4px;
   height: 4px;
   left: 308px;
   top: 5px;
   background: #E17100;
   border-radius: 50%;
}


.logout-button-container {
  width: 80px;
  height: 32px;
  padding-left: 12px;
  padding-right: 12px;
  left: 48px;
  top: 0px;
  position: absolute;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  display: inline-flex;
  box-sizing: border-box;
}

.logout-button {
  padding: 1px 14px;
  background: #B1B1B1;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border: none; /* Remove default button border */
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
  width: 32px;
  height: 32px;
  left: 4px;
  top: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: 50%; /* Large radius approximation */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.profile-img {
  width: 100%; /* Fill the wrapper */
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio */
  cursor: pointer;
}
</style>