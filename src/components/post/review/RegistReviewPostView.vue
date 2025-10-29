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
// No script logic is needed based on the provided HTML
</script>

<style scoped>
/* Base container styles */
.page-container {
  width: 1624px;
  height: 2553px;
  position: relative;
  background: #F9FAFB;
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
  top: 1157px;
  position: absolute;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.footer-content {
  width: 1440px; /* Specific width */
  height: 154px;
  padding-left: 138px;
  padding-right: 138px;
  position: relative;
  background: black;
  flex-direction: column;
  justify-content: flex-end; /* Align bottom */
  align-items: center;
  gap: 10px;
  display: flex;
  box-sizing: border-box;
  margin: 0 auto; /* Center if page-container is wider */
}

.footer-title {
  width: 1088px;
  left: 163px; /* Position relative to footer-content */
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

/* Footer Links - Using Flexbox for centering and spacing */
.footer-links {
   display: flex;
   justify-content: center;
   align-items: center; /* Center vertically if needed */
   gap: 20px; /* Adjust gap as needed */
   margin-bottom: 30px; /* Space above copyright */
   width: 100%; /* Take full width */
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
}
/* Width adjustments based on original inline styles */
.footer-link { width: 30px; } /* Default/소개/문의 */
.footer-link.community { width: 59px; }
.footer-link.guideline { width: 74px; }
.footer-link.contact { width: 30px; }


.footer-copyright {
  width: 1164px;
  left: 138px; /* Position relative to footer-content */
  top: 115px; /* Or use bottom: 20px; depending on exact layout needs */
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
/* Removed banner text styles as they are not in this HTML version */

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
  color: #0A0A0A; /* Use default text color, placeholder style below */
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
  border: none;
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

/* Specific styles from second block (some might conflict or overlap, adjust as needed) */
.right-column { /* Container for right side elements */
  position: absolute;
  right: 20px; /* Example, adjust as needed */
  top: 368px; /* Example */
  display: flex;
  flex-direction: column;
  gap: 16px; /* Example gap */
}

.category-box, .popular-mentors-box, .mentor-ad-box {
  width: 389.34px; /* Common width */
  background: white;
  border-radius: 10px;
  outline: 0.61px solid #E5E7EB;
  outline-offset: -0.61px;
  padding: 20.61px; /* Common padding */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.category-box {
  height: 153.16px;
  gap: 15.99px;
  /* top: 368px; left: 1216px; */ /* Positioned relatively now */
}

.category-title-wrapper {
  align-self: stretch;
  height: 24.01px;
  position: relative;
}

.category-title {
  left: 0px;
  top: -1.79px; /* Adjust alignment */
  position: absolute;
  color: #101828;
  font-size: 16px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.category-grid {
  align-self: stretch;
  height: 71.95px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto); /* Adjust based on content */
  gap: 8px; /* Example gap */
}

.category-item {
  height: 31.98px;
  border-radius: 4px;
  padding: 3.99px 12px; /* Top/bottom, Left/right */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  white-space: nowrap;
  cursor: pointer;
}
.category-item.active { background: #101828; color: white; }
.category-item.inactive { background: #F9FAFB; color: #364153; }


.popular-mentors-box {
  height: 213.16px;
  gap: 15.99px;
  /* top: 537.16px; left: 1216px; */
}

.popular-mentors-header {
  align-self: stretch;
  height: 24.01px;
  justify-content: flex-start;
  align-items: center;
  gap: 7.99px;
  display: inline-flex;
}

.popular-mentors-icon {
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;
}
.popular-mentors-icon div { position: absolute; outline: 1.67px #2B7FFF solid; outline-offset: -0.83px; }
.popular-mentors-icon .part1 { width: 5px; height: 5px; left: 13.33px; top: 5.83px; }
.popular-mentors-icon .part2 { width: 16.67px; height: 8.33px; left: 1.67px; top: 5.83px; }


.popular-mentors-title-wrapper {
  width: 69.63px;
  height: 24.01px;
  position: relative;
}

.popular-mentors-title {
  left: 0px;
  top: -1.79px; /* Adjust alignment */
  position: absolute;
  color: #101828;
  font-size: 16px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.popular-mentors-list {
  align-self: stretch;
  height: 131.95px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  display: flex;
}

.mentor-item {
  align-self: stretch;
  height: 35.98px;
  position: relative;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
  cursor: pointer;
}

.mentor-info {
  flex: 1 1 0;
  height: 35.98px;
  position: relative;
}

.mentor-name {
  color: #101828;
  font-size: 14px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 0; /* Override default margin if any */
  height: 19.99px; /* Explicit height */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mentor-category {
  height: 15.99px;
  position: relative;
}

.mentor-category-text {
  left: 0px;
  top: -1.61px; /* Adjust alignment */
  position: absolute;
  color: #6A7282;
  font-size: 12px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.mentor-stats {
  width: 35.82px;
  height: 15.99px;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  display: flex;
}

.mentor-stat-icon {
  width: 12px;
  height: 12px;
  position: relative;
  overflow: hidden;
}
.mentor-stat-icon div { position: absolute; outline: 1px #99A1AF solid; outline-offset: -0.50px; }
.mentor-stat-icon .part1 { width: 7px; height: 3px; left: 1px; top: 7.50px; }
.mentor-stat-icon .part2 { width: 1.50px; height: 3.87px; left: 8px; top: 1.56px; }
.mentor-stat-icon .part3 { width: 1.50px; height: 2.93px; left: 9.50px; top: 7.56px; }
.mentor-stat-icon .part4 { width: 4px; height: 4px; left: 2.50px; top: 1.50px; }


.mentor-stat-value-wrapper {
  width: 19.83px;
  height: 15.99px;
  position: relative;
}

.mentor-stat-value {
  left: 0px;
  top: -1.61px; /* Adjust alignment */
  position: absolute;
  color: #99A1AF;
  font-size: 12px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.mentor-ad-box {
  height: 147.95px;
  background: linear-gradient(135deg, #155DFC 0%, #51A2FF 100%);
  gap: 7.99px;
  /* top: 774.08px; left: 1216px; */
}

.mentor-ad-title-wrapper {
  align-self: stretch;
  height: 24.01px;
  position: relative;
}

.mentor-ad-title {
  /* left: 116.86px; Adjusted - use text-align center */
  top: -1.79px;
  position: absolute;
  width: 100%; /* Center text */
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.mentor-ad-subtitle-wrapper {
  align-self: stretch;
  height: 19.99px;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.mentor-ad-subtitle {
  flex: 1 1 0;
  text-align: center;
  color: #DBEAFE;
  font-size: 14px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.mentor-ad-button {
  align-self: stretch;
  height: 35.98px;
  position: relative;
  background: white;
  border-radius: 4px;
  display: flex; /* Center text */
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
}

.mentor-ad-button-text {
  /* Removed absolute positioning */
  color: #155DFC;
  font-size: 14px;
  font-family: 'ABeeZee', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

/* Post Detail Specific Styles (overlaps with post editor, adjust classes if needed) */
.post-detail-content { /* Assuming the main white box contains post details now */
  width: 802.67px;
  height: 2052.63px; /* Original height */
  left: 0px; /* Adjust based on parent */
  top: 0px;  /* Adjust based on parent */
  position: absolute; /* Was absolute, depends on layout */
  background: white;
  overflow: hidden;
  border-radius: 10px;
  outline: 0.61px #E5E7EB solid;
  outline-offset: -0.61px;
}

.post-header-section {
  width: 801.46px;
  height: 145.78px;
  left: 0.61px;
  top: 0.61px;
  position: absolute;
  border-bottom: 0.61px solid #F3F4F6;
}

.post-meta-actions {
  width: 753.47px;
  height: 40px;
  left: 24px;
  top: 15.99px;
  position: absolute;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
}

.post-author-info {
  width: 229.19px;
  height: 40px;
  position: relative;
}

.post-author-details {
  width: 177.19px;
  height: 37.20px;
  left: 52px;
  top: 1.40px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.post-author-name-level {
  align-self: stretch;
  height: 21.20px;
  justify-content: flex-start;
  align-items: center;
  gap: 7.99px;
  display: inline-flex;
}

.author-name-wrapper {
  width: 126px; /* Adjusted to fit content better potentially */
  height: 19.99px;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.author-name {
  flex: 1 1 0;
  color: #101828;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.author-level-badge {
  width: 43.19px;
  height: 21.20px;
  padding: 2px 8px;
  background: #ECEEF2;
  border-radius: 8px;
  outline: 0.61px solid transparent;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: flex;
  box-sizing: border-box;
}

.author-level-text {
  color: #030213;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.post-timestamp-wrapper {
  align-self: stretch;
  height: 15.99px;
  position: relative;
}

.post-timestamp {
  left: 0px;
  top: -1.61px; /* Adjust alignment */
  position: absolute;
  color: #6A7282;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.post-author-avatar {
  width: 40px;
  height: 40px;
  left: 0px;
  top: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: 50%; /* Large radius approx */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.avatar-inner {
  flex: 1 1 0;
  height: 40px;
  background: #101828;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.avatar-initial {
  color: white;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.post-options-button {
  width: 20px;
  height: 20px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  cursor: pointer;
}

.post-options-icon {
  align-self: stretch;
  height: 20px;
  position: relative;
  overflow: hidden;
}

.dot {
  width: 1.67px;
  height: 1.67px;
  left: 9.17px;
  position: absolute;
  outline: 1.67px solid #99A1AF;
  outline-offset: -0.83px;
  border-radius: 50%; /* Make dots round */
}
.dot1 { top: 3.33px; }
.dot2 { top: 9.17px; }
.dot3 { top: 15px; }


.post-title-section {
  width: 753.47px;
  height: 27.98px;
  left: 24px;
  top: 67.99px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
  display: inline-flex;
}

.post-status-badge {
  width: 66px;
  height: 27.98px; /* Slightly taller? */
  position: relative;
  background: #DCFCE7;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 12px; /* Adjust padding */
  box-sizing: border-box;
}

.post-status-text {
  /* left: 12px; top: 2px; position: absolute; */ /* Centered by flex */
  color: #008236;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.post-title-wrapper {
  flex: 1 1 0;
  height: 24.01px;
  position: relative;
}

.post-title-text {
  left: 0px;
  top: -1.79px; /* Adjust alignment */
  position: absolute;
  color: #101828;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.post-tag {
  height: 21.20px;
  padding: 2px 8px;
  left: 24px;
  top: 107.97px;
  position: absolute;
  overflow: hidden;
  border-radius: 8px;
  outline: 0.61px solid rgba(0, 0, 0, 0.10);
  outline-offset: -0.61px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
  box-sizing: border-box;
}

.post-tag-text {
  color: #0A0A0A;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.post-body-section {
  width: 801.46px; /* Match container */
  height: 1444.58px;
  padding: 24px;
  left: 0.61px; /* Offset for outline */
  top: 146.38px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15.99px;
  display: inline-flex;
  box-sizing: border-box;
}

.post-image {
  align-self: stretch;
  height: 626.49px;
  position: relative;
  border-radius: 10px;
  object-fit: cover; /* Ensure image covers area */
}

.post-text-content-wrapper {
  align-self: stretch;
  height: 754.11px; /* Adjust based on actual content */
  position: relative;
}

.post-text-content {
  width: auto; /* Adjust based on content, limit width if needed */
  max-width: 753px; /* Match image width */
  left: 0px;
  top: -2.18px; /* Adjust alignment */
  position: absolute;
  color: #364153;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 26px;
  word-wrap: break-word;
  white-space: pre-wrap; /* Preserve line breaks */
}

/* Post Actions Section */
.post-actions-section {
  width: 801.46px;
  height: 109.79px;
  left: 0.61px; /* Offset for outline */
  top: 1590.97px;
  position: absolute;
  border-top: 0.61px solid #F3F4F6;
}

.post-view-comment-count {
  width: auto; /* Adjust width */
  height: 19.99px;
  left: 24px;
  top: 16.60px;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  gap: 15.99px;
  display: inline-flex;
}

.view-count-wrapper, .comment-count-wrapper {
  height: 19.99px;
  position: relative;
  width: auto; /* Adjust */
}

.view-count, .comment-count {
  left: 0px;
  top: -2px; /* Adjust alignment */
  position: absolute;
  color: #6A7282;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  white-space: nowrap;
}

.count-separator-wrapper {
  width: auto; /* Adjust */
  height: 19.99px;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.count-separator {
  color: #6A7282;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.post-action-buttons {
  width: 753.47px;
  height: 41.21px;
  left: 24px;
  top: 52.59px;
  position: absolute;
  display: flex; /* Use flex for button layout */
  gap: 7.99px; /* Gap between buttons */
}

.action-button {
  height: 41.21px;
  border-radius: 4px;
  outline: 0.61px solid #E5E7EB;
  outline-offset: -0.61px;
  justify-content: center;
  align-items: center;
  gap: 7.99px;
  display: inline-flex;
  cursor: pointer;
  background: white; /* Default background */
  border: none;
  padding: 0 16px; /* Example padding, adjust */
  box-sizing: border-box;
}
.like-button, .comment-button { width: 311.54px; }
.share-button, .bookmark-button { width: 53.20px; padding: 10.61px 16.60px 0.61px; /* Specific padding */ flex-direction: column; }


.action-icon {
  width: 20px;
  height: 20px;
  position: relative;
  overflow: hidden;
}
.action-icon div { position: absolute; } /* For outline icons */
.like-icon .outline { outline: 1.67px #364153 solid; outline-offset: -0.83px; }
.comment-icon .outline { outline: 1.67px #364153 solid; outline-offset: -0.83px; }
.share-icon .outline { outline: 1.67px #364153 solid; outline-offset: -0.83px; }
.bookmark-icon .outline { outline: 1.67px #364153 solid; outline-offset: -0.83px; }

/* Specific icon shapes (using simplified div representation) */
.like-icon .shape { width: 16.67px; height: 14.18px; left: 1.67px; top: 3.32px; }
.comment-icon .shape { width: 16.67px; height: 16.67px; left: 1.67px; top: 1.67px; }
.share-icon .dot-shape { width: 5px; height: 5px; border-radius: 50%; }
.share-icon .dot1 { left: 12.50px; top: 1.67px; }
.share-icon .dot2 { left: 2.50px; top: 7.50px; }
.share-icon .dot3 { left: 12.50px; top: 13.33px; }
.share-icon .line-shape { outline: 1.67px #364153 solid; outline-offset: -0.83px; }
.share-icon .line1 { width: 5.69px; height: 3.32px; left: 7.16px; top: 11.26px; }
.share-icon .line2 { width: 5.68px; height: 3.32px; left: 7.16px; top: 5.43px; }
.bookmark-icon .shape { width: 13.33px; height: 16.67px; left: 3.33px; top: 1.67px; }


.action-text-wrapper {
  height: 19.99px;
  position: relative;
  width: auto; /* Adjust */
}

.action-text {
  left: 0px;
  top: -2px; /* Adjust */
  position: absolute;
  color: #364153;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  white-space: nowrap;
}

/* Report button - positioned over the actions section */
.report-button {
  width: 60px;
  height: 36px;
  padding: 8px 16px;
  left: 701.91px;
  top: -5.36px; /* Position relative to .post-actions-section top */
  position: absolute;
  background: black;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  display: inline-flex;
  cursor: pointer;
  border: none;
  box-sizing: border-box;
}

.report-button-text {
  color: white;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

/* Divider Line */
.divider-line {
  width: 801.46px;
  height: 0.99px;
  left: 0.61px; /* Offset for outline */
  top: 1700.76px;
  position: absolute;
  background: rgba(0, 0, 0, 0.10);
}

/* Comments Section */
.comments-section {
  width: 801.46px; /* Match container */
  height: 350.27px;
  padding: 15.99px 24px 0; /* Top, L/R, Bottom */
  left: 0.61px; /* Offset for outline */
  top: 1701.75px;
  position: absolute;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 15.99px;
  display: inline-flex;
  box-sizing: border-box;
}

.comments-header {
  align-self: stretch;
  height: 24.01px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.comments-count-wrapper {
  width: auto; /* Adjust */
  height: 24.01px;
  position: relative;
}

.comments-count-text {
  /* width: 47px; */ /* Auto width */
  left: 0px;
  top: -1.79px; /* Adjust */
  position: absolute;
  color: #101828;
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
}

.comments-hide-button {
  width: auto; /* Adjust */
  height: 19.99px;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  color: #6A7282;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  cursor: pointer;
}

.comments-list {
  align-self: stretch;
  height: 204.51px; /* Adjust if content varies */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 19.99px;
  display: flex;
  overflow-y: auto; /* Allow scroll if needed */
}

.comment-item {
  align-self: stretch;
  height: auto; /* Adjust height based on content */
  min-height: 100.56px; /* Original fixed height as min */
  padding-top: 15.99px;
  padding-bottom: 0.61px;
  border-bottom: 0.61px solid #F3F4F6;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.comment-content-wrapper {
  align-self: stretch;
  height: auto; /* Adjust */
  min-height: 67.96px; /* Original height */
  position: relative;
}

.comment-text-options {
  /* width: 681.48px; */ /* Use margin/padding instead */
  height: auto;
  min-height: 67.96px;
  margin-left: 44px; /* Space for avatar */
  position: relative; /* Changed from absolute */
}

.comment-author-time {
  width: 100%; /* Take full width */
  height: 19.99px;
  position: relative; /* Changed from absolute */
  /* left: 0px; top: 0px; */
  justify-content: flex-start;
  align-items: center;
  gap: 7.99px;
  display: inline-flex;
  margin-bottom: 4px; /* Space below author/time */
}

.comment-author-name-wrapper {
  width: auto; /* Adjust */
  height: 19.99px;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.comment-author-name {
  color: #101828;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  white-space: nowrap;
}

.comment-time-wrapper {
  width: auto; /* Adjust */
  height: 15.99px;
  position: relative;
}

.comment-time {
  left: 0px;
  top: -1.61px; /* Adjust */
  position: absolute;
  color: #99A1AF;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.comment-text-wrapper {
  width: 100%;
  height: auto; /* Adjust */
  min-height: 19.99px; /* Original height */
  position: relative; /* Changed */
  /* left: 0px; top: 23.99px; */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.comment-text {
  flex: 1 1 0;
  color: #364153;
  font-size: 14px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.comment-like-wrapper {
  width: auto; /* Adjust */
  height: 15.99px;
  position: relative; /* Changed */
  /* left: 0px; top: 51.97px; */
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  display: inline-flex;
  margin-top: 8px; /* Space above likes */
}

.comment-like-icon {
  width: 14px;
  height: 14px;
  position: relative;
  overflow: hidden;
}
.comment-like-icon div { position: absolute; outline: 1.17px #6A7282 solid; outline-offset: -0.58px; }
.comment-like-icon .shape { width: 11.56px; height: 11.66px; left: 1.17px; top: 1.17px; }


.comment-like-count-wrapper {
  width: auto; /* Adjust */
  height: 15.99px;
  position: relative;
}

.comment-like-count {
  left: 0px;
  top: -1.61px; /* Adjust */
  position: absolute;
  color: #6A7282;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

.comment-options-button {
  width: 15.99px;
  height: auto; /* Adjust */
  min-height: 15.99px; /* Original height based on icon */
  position: absolute; /* Keep absolute relative to comment-content-wrapper */
  right: 0; /* Position to the right */
  top: 0; /* Align with top */
  /* padding-top: 25.98px; Removed padding */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  cursor: pointer;
}

.comment-options-icon {
  align-self: stretch;
  height: 15.99px;
  position: relative;
  overflow: hidden;
}
.comment-options-icon .dot {
    width: 1.33px; height: 1.33px; left: 7.33px; position: absolute;
    outline: 1.33px #99A1AF solid; outline-offset: -0.67px; border-radius: 50%;
}
.comment-options-icon .dot1 { top: 2.67px; }
.comment-options-icon .dot2 { top: 7.33px; }
.comment-options-icon .dot3 { top: 12px; }

.comment-avatar-wrapper {
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: 50%; /* Large radius approx */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.comment-avatar-inner {
  flex: 1 1 0;
  height: 32px;
  background: #E5E7EB;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.comment-avatar-initial {
  color: #4A5565;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}

/* Comment Input Area */
.comment-input-section {
  align-self: stretch;
  height: 57.78px;
  padding-top: 16.60px;
  border-top: 0.61px solid #F3F4F6;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.comment-input-wrapper {
  align-self: stretch;
  height: 41.18px;
  position: relative;
}

.comment-input-group {
  width: auto; /* Adjust width */
  max-width: 709.47px; /* Original width */
  height: 41.18px;
  left: 44px; /* Space for avatar */
  top: 0px;
  position: absolute;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 7.99px;
  display: inline-flex;
}

.comment-input-field-wrapper {
  flex: 1 1 0;
  height: 41.18px;
  padding: 8px 16px; /* Adjust padding */
  overflow: hidden;
  border-radius: 4px;
  outline: 0.61px solid #E5E7EB;
  outline-offset: -0.61px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  box-sizing: border-box;
}

.comment-input {
   border: none;
   background: transparent;
   outline: none;
   color: #0A0A0A; /* Default text color */
   font-size: 16px;
   font-family: Arial, sans-serif;
   font-weight: 400;
   word-wrap: break-word;
   width: 100%;
}
.comment-input::placeholder {
  color: rgba(10, 10, 10, 0.50);
  font-size: 16px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  word-wrap: break-word;
}


.comment-submit-button {
  width: 47.98px;
  height: 41.18px;
  padding: 12.59px 15.99px 0; /* Specific padding */
  background: #D1D5DC;
  border-radius: 4px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
}

.comment-submit-icon-wrapper {
  align-self: stretch;
  height: 15.99px;
  position: relative;
  overflow: hidden;
}
.comment-submit-icon div { position: absolute; outline: 1.33px white solid; outline-offset: -0.67px; }
.icon-part-a { width: 13.33px; height: 13.33px; left: 1.33px; top: 1.33px; }
.icon-part-b { width: 7.29px; height: 7.29px; left: 7.27px; top: 1.43px; }


.comment-input-avatar-wrapper {
  width: 32px;
  height: 32px;
  left: 0px;
  top: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: 50%; /* Large radius approx */
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.comment-input-avatar-inner {
  flex: 1 1 0;
  height: 32px;
  background: #E5E7EB;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.comment-input-avatar-initial {
  color: #4A5565;
  font-size: 12px;
  font-family: Arial, sans-serif;
  font-weight: 400;
  line-height: 16px;
  word-wrap: break-word;
}
</style>