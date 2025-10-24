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
        <label class="form-label" for="post-title">제목</label>
        <div class="input-wrapper title-input-wrapper">
           <input type="text" id="post-title" class="form-input title-input" placeholder="제목을 입력하세요">
        </div>
      </div>
      <div class="form-group content-group">
        <label class="form-label" for="post-content">내용</label>
        <div class="textarea-wrapper content-textarea-wrapper">
           <textarea id="post-content" class="form-textarea content-textarea" placeholder="내용을 입력하세요"></textarea>
        </div>
      </div>
      <div class="form-group hashtag-group">
        <label class="form-label" for="post-hashtags">해시태그</label>
        <div class="hashtag-input-group">
          <div class="input-wrapper hashtag-input-wrapper">
             <input type="text" id="post-hashtags" class="form-input hashtag-input" placeholder="해시태그 입력 (Enter로 추가)">
          </div>
          <button class="hashtag-add-button">추가</button>
        </div>
      </div>
       <div class="form-group image-upload-group">
        <label class="form-label" for="post-image">이미지</label>
        <div class="image-upload-area">
          <div class="image-upload-icon">
            <div class="icon-part icon-part-1"></div>
            <div class="icon-part icon-part-2"></div>
          </div>
          <div class="image-upload-text">클릭하여 이미지 업로드</div>
          <input type="file" id="post-image" style="display: none;" accept="image/*">
        </div>
      </div>
       <div class="form-group item-info-group">
         <label class="form-label">패션 아이템</label>
         <div class="item-info-table-wrapper">
           <div class="item-info-table">
             <div class="table-row">
               <div class="table-header">의류</div>
               <div class="table-input-cell">
                 <div class="input-wrapper table-input-wrapper">
                   <input type="text" class="form-input table-input" placeholder="의류 입력">
                 </div>
               </div>
             </div>
             <div class="table-row">
               <div class="table-header">상의</div>
               <div class="table-input-cell">
                 <div class="input-wrapper table-input-wrapper">
                   <input type="text" class="form-input table-input" placeholder="상의 입력">
                 </div>
               </div>
             </div>
             <div class="table-row">
               <div class="table-header">하의</div>
               <div class="table-input-cell">
                 <div class="input-wrapper table-input-wrapper">
                   <input type="text" class="form-input table-input" placeholder="하의 입력">
                 </div>
               </div>
             </div>
             <div class="table-row">
               <div class="table-header">신발</div>
               <div class="table-input-cell">
                 <div class="input-wrapper table-input-wrapper">
                   <input type="text" class="form-input table-input" placeholder="신발 입력">
                 </div>
               </div>
             </div>
              <div class="table-row last-row">
                <div class="table-header">액세서리</div>
                <div class="table-input-cell">
                  <div class="input-wrapper table-input-wrapper">
                    <input type="text" class="form-input table-input" placeholder="액세서리 입력">
                  </div>
                </div>
              </div>
           </div>
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
  width: 1440px;
  height: 1715px; /* Updated height */
  position: relative;
  background: white;
  overflow: hidden;
  margin: 0 auto;
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
  top: 1561px; /* Updated top position */
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

.footer-links {
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 20px;
   margin-bottom: 30px;
   width: 100%;
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
.footer-link { width: 30px; }
.footer-link.community { width: 59px; }
.footer-link.guideline { width: 74px; }
.footer-link.contact { width: 30px; }

.footer-copyright {
  width: 1164px;
  left: 138px;
  top: 115px;
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

.banner-placeholder-div {
  width: 236px;
  height: 24px;
  left: 87px;
  top: 114px;
  position: absolute;
}

/* Post Editor styles */
.post-editor-container {
  width: 1396px;
  height: 1266px; /* Updated height */
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
  top: -2.20px;
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
  width: 1332px;
}
.title-group { height: 64px; left: 32px; top: 80px; }
.content-group { height: 328px; left: 32px; top: 815px; } /* Updated height & top */
.hashtag-group { height: 64px; left: 32px; top: 159px; }
.image-upload-group { height: 228px; left: 32px; top: 238px; }
.item-info-group { height: 292.80px; left: 54px; top: 481px; /* Adjusted top based on image upload */ width: 736px; /* Specific width */ }

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
  padding-top: 1.2px;
}

.input-wrapper, .textarea-wrapper {
  align-self: stretch;
  padding: 4px 12px;
  background: #F3F3F5;
  border-radius: 8px;
  outline: 0.80px solid transparent;
  overflow: hidden;
  display: inline-flex;
  box-sizing: border-box;
}
.title-input-wrapper { height: 36px; align-items: center; }
.content-textarea-wrapper { height: 300px; padding: 8px 12px; align-items: flex-start; } /* Updated height */
.hashtag-input-wrapper { flex: 1 1 0; height: 36px; align-items: center; }


.form-input, .form-textarea {
  border: none;
  background: transparent;
  outline: none;
  color: #0A0A0A;
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
    height: 100%;
    resize: none;
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

/* Image Upload Area */
.image-upload-area {
  align-self: stretch;
  height: 200px;
  position: relative;
  border-radius: 10px;
  outline: 1.60px solid #D1D5DC;
  outline-offset: -1.60px;
  display: flex; /* Center content */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* Indicate clickable */
}

.image-upload-icon {
  width: 48px;
  height: 48px;
  position: relative; /* Changed from absolute */
  overflow: hidden;
  margin-bottom: 8px; /* Space between icon and text */
}
.image-upload-icon .icon-part {
    position: absolute;
    outline: 4px solid #99A1AF;
    outline-offset: -2px;
}
.icon-part-1 { width: 20px; height: 10px; left: 14px; top: 6px; }
.icon-part-2 { width: 36px; height: 12px; left: 6px; top: 30px; }

.image-upload-text {
  /* width: 149.85px; */ /* Auto width */
  height: 20px;
  position: relative; /* Changed */
  color: #6A7282;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

/* Item Info Table */
.item-info-table-wrapper {
  width: 1332px; /* Match parent width */
  height: 265px;
  padding: 0.80px;
  overflow: hidden;
  border-radius: 10px;
  outline: 0.80px solid #D1D5DC;
  outline-offset: -0.80px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.item-info-table {
  align-self: stretch;
  height: 263.20px;
  position: relative;
  width: 100%; /* Ensure it takes full width */
}

.table-row {
   width: 100%; /* Use full width */
   /* height: 52px; Adjusted slightly based on content */
   position: relative; /* Changed from absolute */
   display: flex;
   border-bottom: 0.80px solid rgba(0, 0, 0, 0.10);
}
.table-row.last-row { border-bottom: none; } /* Remove border for last row */

.table-header {
  width: 120px;
  height: 52.4px; /* Approximate height */
  background: #F9FAFB;
  display: flex;
  align-items: center;
  padding-left: 16px;
  box-sizing: border-box;
  color: #4A5565;
  font-size: 14px;
  font-family: 'Arimo', sans-serif;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
}

.table-input-cell {
  flex: 1; /* Take remaining space */
  height: 52.4px; /* Match header height */
  display: flex;
  align-items: center;
  padding: 8.1px 16.2px; /* Approximate padding */
  box-sizing: border-box;
}

.table-input-wrapper {
   width: 100%; /* Full width within cell */
   height: 36px;
   padding: 4px 0; /* Adjust vertical padding if needed */
   align-self: center; /* Vertically center */
   background: #F3F3F5;
   border-radius: 8px;
   overflow: hidden;
   justify-content: flex-start;
   align-items: center;
   display: inline-flex;
}
.table-input { padding-left: 12px; } /* Add padding for input text */


.button-group {
  width: 1332px;
  height: 44px;
  left: 32px;
  top: 1190px; /* Updated top position */
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
  width: 1441px; /* Specific width */
  height: 65px;
  padding-right: 22px;
  left: -1px; /* Specific offset */
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
  position: relative;
}

.user-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
}

.action-item {
    position: absolute;
}

.logout-wrapper {
    width: 124px;
    height: 32px;
    left: 313px; /* Adjusted position */
    top: 2px;
}
.search-icon-placeholder {
    width: 256px;
    height: 36px;
    left: -11px; /* Adjusted position */
    top: 0px;
}
.search-input-icon {
   width: 16px;
   height: 16px;
   left: 12px;
   top: 10px;
   position: absolute;
}

.search-action {
   width: 20px;
   height: 20px;
   left: 229px; /* Adjusted position */
   top: 8px;
   flex-direction: column;
   justify-content: flex-start;
   align-items: flex-start;
   display: inline-flex;
   cursor: pointer;
}

.search-icon-outer {
    align-self: stretch;
    height: 20px;
    position: relative;
    overflow: hidden;
}
.search-icon-inner {}

.search-icon-detail {
    position: absolute;
    outline: 1.67px black solid;
    outline-offset: -0.83px;
}
.detail-1 { width: 3.62px; height: 3.62px; left: 13.88px; top: 13.88px; border-radius: 50%;}
.detail-2 { width: 13.33px; height: 13.33px; left: 2.50px; top: 2.50px; border-radius: 50%; }

.notification-icon {
   width: 28px;
   height: 28px;
   left: 266px; /* Adjusted position */
   top: 4px;
   cursor: pointer;
}
.notification-dot {
   width: 4px;
   height: 4px;
   left: 292px; /* Adjusted position */
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
  width: 32px;
  height: 32px;
  left: 4px;
  top: 0px;
  position: absolute;
  overflow: hidden;
  border-radius: 50%;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
</style>