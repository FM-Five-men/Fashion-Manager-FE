<template>
  <div class="influencer-form">
    <!-- 카드 헤더 -->
    <div class="card-header">
      <h3 class="card-title">신청서 작성</h3>
      <p class="card-desc">
        모든 항목을 정확하게 입력해주세요. 제출하신 정보는 심사 후
        24–48시간 내에 답변드립니다.
      </p>
    </div>

    <!-- 기본 정보 -->
    <section class="section-block">
      <div class="section-headline"><span>기본 정보</span></div>

      <div class="form-grid">
        <div class="field">
          <label class="field-label">
            이름 <span class="req">*</span>
          </label>
          <input class="input" placeholder="홍길동" />
        </div>

        <div class="field">
          <label class="field-label">
            이메일 <span class="req">*</span>
          </label>
          <input class="input" placeholder="example@email.com" />
        </div>

        <div class="field">
          <label class="field-label">
            연락처 <span class="req">*</span>
          </label>
          <input class="input" placeholder="010-1234-5678" />
        </div>

        <div class="field">
          <label class="field-label">
            주요 활동 분야 <span class="req">*</span>
          </label>
          <select class="input">
            <option>분야를 선택하세요</option>
          </select>
        </div>
      </div>
    </section>

    <!-- 추가 정보 -->
    <section class="section-block">
      <div class="section-headline"><span>추가 정보</span></div>

      <div class="field-col">
        <div class="field">
          <label class="field-label">
            총 팔로워/구독자 수 <span class="req">*</span>
          </label>
          <select class="input">
            <option>팔로워 수를 선택하세요</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label">활동 경력</label>
          <select class="input">
            <option>경력을 선택하세요</option>
          </select>
        </div>

        <div class="field">
          <label class="field-label">
            자기소개 <span class="req">*</span>
          </label>
          <textarea
            class="textarea"
            placeholder="본인의 콘텐츠 스타일, 강점, 협업 경험 등을 자유롭게 작성해주세요."
          ></textarea>
        </div>

        <div class="field">
          <label class="field-label">포트폴리오 링크</label>
          <input class="input" placeholder="https://..." />
          <p class="note">
            대표 콘텐츠나 미디어킷 링크를 공유해주세요.
          </p>
        </div>
      </div>
    </section>

    <!-- 이미지 업로드 -->
    <section class="section-block">
      <div class="section-headline"><span>이미지 업로드</span></div>

      <div class="upload-box">
        <!-- 업로드 아이콘 (인라인 SVG) -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 3v12"></path>
          <path d="M8 11l4-4 4 4"></path>
          <path
            d="M20 17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
          ></path>
        </svg>

        <p class="upload-text">클릭하여 이미지 업로드</p>
        <input type="file" />
      </div>
    </section>

    <!-- 개인정보 동의 -->
    <section class="section-block agree-block">
      <div class="agree-row">
        <input type="checkbox" class="checkbox" />
        <label class="agree-label">
          개인정보 수집 및 이용 동의 (필수)
        </label>
      </div>
      <p class="agree-desc">
        제공하신 정보는 인플루언서 심사 및 파트너십 운영 목적으로만
        사용되며, 관련 법령에 따라 안전하게 관리됩니다.
      </p>
    </section>

    <!-- 제출 / 취소 버튼 -->
    <div class="actions">
      <button class="btn-cancel">취소</button>
      <button class="btn-submit">작성 완료</button>
    </div>
  </div>
</template>

<script setup>
/**
 * ApplyFormInfluencer.vue
 *
 * 인플루언서 전용 신청 폼.
 * 이 컴포넌트는 ApplyLayout.vue 안의 카드 영역(form-card) 안에 삽입된다.
 *
 * 폼 제출 로직, v-model, 유효성 검사 등은 추후 이 파일에 넣으면 된다.
 */
</script>

<style scoped>
/* 카드 헤더 */
.card-header {
  text-align: center;
  margin-bottom: 24px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #0a0a0a;
  margin: 0;
}
.card-desc {
  font-size: 13px;
  line-height: 20px;
  color: #717182;
  margin: 8px 0 0 0;
  font-weight: 400;
}

/* 공통 섹션 블록 */
.section-block {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.section-headline {
  border-bottom: 1px solid rgba(0,0,0,0.12);
  padding-bottom: 8px;
  margin-bottom: 16px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #0a0a0a;
  font-weight: 500;
}

/* 필드 묶음 레이아웃 */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 16px;
}

.field-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 필드 */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  line-height: 16px;
  color: #0a0a0a;
  font-weight: 500;
}
.req {
  color: #d4183d;
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
}

/* 기본 입력류 */
.input {
  background: #f3f3f5;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0);
  min-height: 36px;
  padding: 8px 12px;
  font-size: 13px;
  line-height: 20px;
  color: #0a0a0a;
  outline: none;
}
.input::placeholder {
  color: #717182;
}

.textarea {
  background: #f3f3f5;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0);
  min-height: 100px;
  padding: 12px;
  font-size: 13px;
  line-height: 20px;
  color: #0a0a0a;
  outline: none;
  resize: none;
}
.textarea::placeholder {
  color: #717182;
}

.note {
  font-size: 12px;
  line-height: 18px;
  color: #6a7282;
  margin: 4px 0 0 0;
}

/* 업로드 박스 */
.upload-box {
  border: 1.6px dashed #d1d5dc;
  border-radius: 10px;
  padding: 32px 16px;
  text-align: center;
  color: #6a7282;
  background: #fff;
}
.upload-box svg {
  margin-bottom: 12px;
  color: #6a7282;
}
.upload-text {
  font-size: 13px;
  line-height: 20px;
  color: #6a7282;
}
.upload-box input[type="file"] {
  display: none;
}

/* 개인정보 동의 */
.agree-block {
  background: #f9fafb;
  border-radius: 10px;
  padding: 24px;
}
.agree-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.checkbox {
  margin-top: 2px;
}
.agree-label {
  font-size: 13px;
  line-height: 16px;
  color: #0a0a0a;
  font-weight: 500;
}
.agree-desc {
  font-size: 12px;
  line-height: 18px;
  color: #4a5565;
  margin: 8px 0 0 0;
  font-weight: 400;
}

/* 액션 버튼 */
.actions {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
  border-top: 1px solid rgba(0,0,0,0.07);
  padding-top: 16px;
}
.btn-cancel {
  background: #fff;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 10px 16px;
  font-size: 13px;
  line-height: 20px;
  color: #0a0a0a;
  cursor: pointer;
}
.btn-submit {
  background: #000;
  border-radius: 6px;
  border: none;
  padding: 10px 16px;
  font-size: 13px;
  line-height: 20px;
  color: #fff;
  cursor: pointer;
}
</style>
