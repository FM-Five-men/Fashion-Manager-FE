<template>
  <div :style="{ width: '1440px', height: '1715px', position: 'relative', background: 'white', overflow: 'hidden' }">
    <div :style="{ left: '0px', top: '0px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }"></div>

    <div :style="{ left: '0px', top: '1561px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }">
      <div :style="{ width: '1440px', height: '154px', paddingLeft: '138px', paddingRight: '138px', position: 'relative', background: 'black', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', display: 'flex' }">
        <div :style="{ width: '1088px', left: '163px', top: '25px', position: 'absolute', textAlign: 'center', color: 'white', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }">FASHION MANAGER</div>
        <div :style="{ display: 'flex', justifyContent: 'center', gap: '20px', position: 'absolute', top: '60px' }">
          <div :style="{ width: '30px', textAlign: 'center', color: '#99A1AF', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word', cursor: 'pointer' }">소개</div>
          <div :style="{ width: '59px', textAlign: 'center', color: '#99A1AF', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word', cursor: 'pointer' }">커뮤니티</div>
          <div :style="{ width: '74px', textAlign: 'center', color: '#99A1AF', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word', cursor: 'pointer' }">가이드라인</div>
          <div :style="{ width: '30px', textAlign: 'center', color: '#99A1AF', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word', cursor: 'pointer' }">문의</div>
        </div>
        <div :style="{ width: '1164px', left: '138px', top: '115px', position: 'absolute', textAlign: 'center', color: '#6A7282', fontSize: '12px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '16px', wordWrap: 'break-word' }">© 2025 Fashion Manager Project. All rights reserved.</div>
      </div>
    </div>

    <div :style="{ width: '1440px', height: '177px', left: '0px', top: '65px', position: 'absolute', overflow: 'hidden', backgroundImage: 'url(https://placehold.co/1440x177)', backgroundSize: 'cover', backgroundPosition: 'center' }">
      <div :style="{ width: '236px', height: '24px', left: '87px', top: '114px', position: 'absolute' }"></div>
    </div>

    <div :style="{ width: '1396px', height: '1266px', left: '22px', top: '242px', position: 'absolute', background: 'white', boxShadow: '0px 2px 4px -2px rgba(0, 0, 0, 0.10)', borderRadius: '10px' }">
      <div :style="{ width: '1332px', height: '24px', left: '32px', top: '32px', position: 'absolute' }">
        <div :style="{ left: '0px', top: '-2.20px', position: 'absolute', color: '#0A0A0A', fontSize: '16px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word' }">게시글 작성</div>
      </div>

      <div :style="{ width: '1332px', height: '64px', left: '32px', top: '80px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
        <label :style="{ alignSelf: 'stretch', height: '20px', position: 'relative', color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">제목</label>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          :style="{
            alignSelf: 'stretch',
            height: '36px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '4px',
            paddingBottom: '4px',
            background: '#F3F3F5',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '0.80px solid rgba(0, 0, 0, 0)',
            fontSize: '14px',
            fontFamily: 'Arimo',
            color: '#717182'
          }"
        />
      </div>

      <div :style="{ width: '1332px', height: '64px', left: '32px', top: '159px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
        <label :style="{ alignSelf: 'stretch', height: '20px', position: 'relative', color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">해시태그</label>
        <div :style="{ alignSelf: 'stretch', height: '36px', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
          <input
            type="text"
            placeholder="해시태그 입력 (Enter로 추가)"
            :style="{
              flex: '1 1 0',
              height: '36px',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '4px',
              paddingBottom: '4px',
              background: '#F3F3F5',
              overflow: 'hidden',
              borderRadius: '8px',
              border: '0.80px solid rgba(0, 0, 0, 0)',
              fontSize: '14px',
              fontFamily: 'Arimo',
              color: '#717182'
            }"
          />
          <button :style="{ width: '60px', height: '36px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', background: 'black', borderRadius: '8px', justifyContent: 'center', alignItems: 'center', gap: '8px', display: 'flex', border: 'none', cursor: 'pointer' }">
            <span :style="{ color: 'white', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">추가</span>
          </button>
        </div>
      </div>

      <div :style="{ width: '1332px', height: '228px', left: '32px', top: '238px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
        <label :style="{ alignSelf: 'stretch', height: '20px', position: 'relative', color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">이미지</label>
        <div :style="{ alignSelf: 'stretch', height: '200px', position: 'relative', borderRadius: '10px', border: '1.60px solid #D1D5DC', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', cursor: 'pointer' }">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ marginBottom: '8px' }">
            <path d="M38 18C39.1 18 40 17.1 40 16C40 14.9 39.1 14 38 14C36.9 14 36 14.9 36 16C36 17.1 36.9 18 38 18Z" stroke="#99A1AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M44 24V40C44 42.2 42.2 44 40 44H8C5.8 44 4 42.2 4 40V12C4 9.8 5.8 8 8 8H20" stroke="#99A1AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 36L15.3 28.5C16.4 27.8 17.8 27.9 18.8 28.7L24 33" stroke="#99A1AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27 30L33.1 26.1C34.3 25.3 35.8 25.4 36.9 26.3L44 32" stroke="#99A1AF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div :style="{ color: '#6A7282', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">클릭하여 이미지 업로드</div>
        </div>
      </div>

      <div :style="{ width: '1332px', /* Adjusted width */ height: 'auto', left: '32px', /* Adjusted left */ top: '480px', /* Adjusted top */ position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
        <label :style="{ alignSelf: 'stretch', height: '20px', position: 'relative', color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">패션 아이템</label>
        <div :style="{ width: '100%', /* Use percentage for flexibility */ height: 'auto', border: '0.80px solid #D1D5DC', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }">
          <div :style="{ display: 'flex', borderBottom: '0.80px solid rgba(0, 0, 0, 0.10)', minHeight: '52px' }">
            <div :style="{ width: '120px', background: '#F9FAFB', padding: '16px', display: 'flex', alignItems: 'center', color: '#4A5565', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400' }">의류</div>
            <div :style="{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center' }">
              <input type="text" placeholder="의류 입력" :style="{ width: '100%', height: '36px', background: '#F3F3F5', borderRadius: '8px', border: 'none', padding: '4px 12px', fontSize: '14px', fontFamily: 'Arimo', color: '#717182' }" />
            </div>
          </div>
          <div :style="{ display: 'flex', borderBottom: '0.80px solid rgba(0, 0, 0, 0.10)', minHeight: '52px' }">
            <div :style="{ width: '120px', background: '#F9FAFB', padding: '16px', display: 'flex', alignItems: 'center', color: '#4A5565', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400' }">상의</div>
            <div :style="{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center' }">
              <input type="text" placeholder="상의 입력" :style="{ width: '100%', height: '36px', background: '#F3F3F5', borderRadius: '8px', border: 'none', padding: '4px 12px', fontSize: '14px', fontFamily: 'Arimo', color: '#717182' }" />
            </div>
          </div>
          <div :style="{ display: 'flex', borderBottom: '0.80px solid rgba(0, 0, 0, 0.10)', minHeight: '52px' }">
            <div :style="{ width: '120px', background: '#F9FAFB', padding: '16px', display: 'flex', alignItems: 'center', color: '#4A5565', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400' }">하의</div>
            <div :style="{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center' }">
              <input type="text" placeholder="하의 입력" :style="{ width: '100%', height: '36px', background: '#F3F3F5', borderRadius: '8px', border: 'none', padding: '4px 12px', fontSize: '14px', fontFamily: 'Arimo', color: '#717182' }" />
            </div>
          </div>
          <div :style="{ display: 'flex', borderBottom: '0.80px solid rgba(0, 0, 0, 0.10)', minHeight: '52px' }">
            <div :style="{ width: '120px', background: '#F9FAFB', padding: '16px', display: 'flex', alignItems: 'center', color: '#4A5565', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400' }">신발</div>
            <div :style="{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center' }">
              <input type="text" placeholder="신발 입력" :style="{ width: '100%', height: '36px', background: '#F3F3F5', borderRadius: '8px', border: 'none', padding: '4px 12px', fontSize: '14px', fontFamily: 'Arimo', color: '#717182' }" />
            </div>
          </div>
          <div :style="{ display: 'flex', minHeight: '52px' }">
            <div :style="{ width: '120px', background: '#F9FAFB', padding: '16px', display: 'flex', alignItems: 'center', color: '#4A5565', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400' }">액세서리</div>
            <div :style="{ flex: 1, padding: '8px 16px', display: 'flex', alignItems: 'center' }">
              <input type="text" placeholder="액세서리 입력" :style="{ width: '100%', height: '36px', background: '#F3F3F5', borderRadius: '8px', border: 'none', padding: '4px 12px', fontSize: '14px', fontFamily: 'Arimo', color: '#717182' }" />
            </div>
          </div>
        </div>
      </div>


      <div :style="{ width: '1332px', height: '328px', left: '32px', top: '815px', position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '8px', display: 'inline-flex' }">
        <label :style="{ alignSelf: 'stretch', height: '20px', position: 'relative', color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">내용</label>
        <textarea
          placeholder="내용을 입력하세요"
          :style="{
            alignSelf: 'stretch',
            height: '300px',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            background: '#F3F3F5',
            overflow: 'auto', /* Changed from hidden */
            borderRadius: '8px',
            border: '0.80px solid rgba(0, 0, 0, 0)',
            fontSize: '14px',
            fontFamily: 'Arimo',
            color: '#717182',
            lineHeight: '20px',
            resize: 'none' /* Prevent manual resizing */
          }"
        ></textarea>
      </div>

      <div :style="{ width: '1332px', height: '44px', left: '32px', top: '1190px', position: 'absolute', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '16px', display: 'inline-flex' }">
        <button :style="{ width: '120px', height: '44px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', background: 'white', borderRadius: '8px', border: '0.80px solid rgba(0, 0, 0, 0.10)', justifyContent: 'center', alignItems: 'center', gap: '8px', display: 'flex', cursor: 'pointer' }">
          <span :style="{ color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">취소</span>
        </button>
        <button :style="{ width: '120px', height: '44px', paddingLeft: '16px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', background: 'black', borderRadius: '8px', justifyContent: 'center', alignItems: 'center', gap: '8px', display: 'flex', border: 'none', cursor: 'pointer' }">
          <span :style="{ color: 'white', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">작성 완료</span>
        </button>
      </div>
    </div>


    <div :style="{ width: '1441px', height: '65px', paddingRight: '22px', left: '-1px', top: '0px', position: 'absolute', background: 'rgba(242.99, 242.99, 242.99, 0.80)', borderBottom: '0.67px solid rgba(0, 0, 0, 0.10)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }">
      <div :style="{ alignSelf: 'stretch', height: '64px', paddingLeft: '16px', paddingRight: '16px', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }">
        <div :style="{ width: 'auto', height: '32px', justifyContent: 'flex-start', alignItems: 'center', gap: '32px', display: 'flex' }">
           <div :style="{ width: '189px', height: '32px', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex' }">
            <img :style="{ width: '125px', height: '52px' }" src="https://placehold.co/125x52" alt="Logo" />
          </div>
          <div :style="{ height: '20px', justifyContent: 'flex-start', alignItems: 'center', gap: '24px', display: 'flex' }">
            <div :style="{ color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word', cursor: 'pointer' }">패션</div>
            <div :style="{ color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word', cursor: 'pointer' }">후기</div>
            <div :style="{ color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word', cursor: 'pointer' }">멘토링</div>
            <div :style="{ color: '#0A0A0A', fontSize: '14px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word', cursor: 'pointer' }">인플루언서</div>
          </div>
        </div>
        <div :style="{ width: 'auto', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }">
          <div :style="{ width: '256px', height: '36px', position: 'relative', background: '#EDEDED', borderRadius: '8px', display: 'flex', alignItems: 'center', paddingLeft: '32px' /* Space for icon */ }">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :style="{ position: 'absolute', left: '12px', top: '10px' }">
              <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.0006 14L11.1006 11.1" stroke="black" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
             <input type="text" placeholder="Search..." :style="{ width: '100%', height: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '14px' }" />
          </div>
          <div :style="{ position: 'relative', cursor: 'pointer' }">
            <img :style="{ width: '28px', height: '28px' }" src="https://placehold.co/28x28" alt="Notifications" />
            <div :style="{ width: '8px', height: '8px', position: 'absolute', background: '#E17100', borderRadius: '50%', right: '-2px', top: '-1px', border: '1px solid white' }"></div>
          </div>
          <div :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">
            <div :style="{ width: '32px', height: '32px', overflow: 'hidden', borderRadius: '50%', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex' }">
              <img :style="{ width: '32px', height: '32px' }" src="https://placehold.co/32x32" alt="User Avatar" />
            </div>
            <button :style="{ paddingLeft: '14px', paddingRight: '14px', paddingTop: '1px', paddingBottom: '1px', background: '#B1B1B1', borderRadius: '8px', border: 'none', cursor: 'pointer' }">
              <span :style="{ textAlign: 'center', color: 'white', fontSize: '12px', fontFamily: 'Arimo', fontWeight: '400', lineHeight: '20px', wordWrap: 'break-word' }">로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';

// Add reactive variables for inputs if needed
// const title = ref('');
// const hashtag = ref('');
// const content = ref('');
// const clothing = ref('');
// const top = ref('');
// const bottom = ref('');
// const shoes = ref('');
// const accessory = ref('');
</script>

<style scoped>
/* Scoped styles can be added here if needed */
input::placeholder, textarea::placeholder {
  color: #717182;
  opacity: 1; /* Override default opacity */
}
input, textarea {
    outline: none; /* Remove focus outline */
}
</style>