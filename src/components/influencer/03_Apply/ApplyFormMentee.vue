<template>
  <div class="mentee-form">
    <!-- 기본 정보 섹션 -->
    <section class="section-block">
      <div class="section-headline"><span>기본 정보</span></div>

      <div class="field-col">
        <div class="field">
          <label class="field-label">
            이름 <span class="req">*</span>
          </label>
          <div class="input-box">홍길동</div>
        </div>

        <div class="field">
          <label class="field-label">
            이메일 <span class="req">*</span>
          </label>
          <div class="input-box">example@email.com</div>
        </div>

        <div class="field">
          <label class="field-label">
            연락처
          </label>
          <div class="input-box">010-1234-5678</div>
        </div>
      </div>

      <!-- 업로드 박스 -->
      <div class="upload-area">
        <div class="upload-inner">
          <div class="upload-icon-placeholder">
            <span class="upload-arrow">⬆</span>
          </div>
          <div class="upload-hint">클릭하여 이미지 업로드</div>
        </div>
      </div>
    </section>

    <!-- 멘토링 정보 섹션 -->
    <section class="section-block">
      <div class="section-headline"><span>멘토링 정보</span></div>

      <div class="field-col">
        <div class="field">
          <label class="field-label">
            멘토링 분야 <span class="req">*</span>
          </label>
          <div class="select-box">분야를 선택하세요</div>
        </div>

        <div class="field">
          <label class="field-label">
            희망 멘토 (선택사항)
          </label>
          <div class="input-box">
            특정 멘토가 있다면 입력해주세요
          </div>
        </div>

        <div class="field">
          <label class="field-label">
            희망 멘토링 날짜 (선택사항)
          </label>
          <div class="date-box">
            <div class="date-icon-placeholder"></div>
            <span class="date-placeholder">날짜를 선택하세요</span>
          </div>
        </div>

        <div class="field">
          <label class="field-label">
            신청 메시지 <span class="req">*</span>
          </label>

          <div class="textarea-box">
            멘토링을 신청하게 된 이유와 현재 상황에 대해 간단히 설명해주세요...
          </div>

          <p class="textarea-hint">
            멘토링을 통해 얻고 싶은 것, 현재 고민하는 내용 등을 자유롭게 작성해주세요
          </p>
        </div>
      </div>
    </section>

    <!-- 제출 / 취소 -->
    <div class="actions">
      <button class="btn-cancel">취소</button>
      <button class="btn-submit">작성 완료</button>
    </div>
  </div>
</template>

<script setup>
/**
 * ApplyFormMentee.vue
 *
 * 멘티(멘토링 신청) 전용 폼.
 * ApplyLayout에서 mode="mentee"일 때 이 컴포넌트가 카드 내부에 삽입된다.
 *
 * 실제로는 네 기존 멘토링 신청 화면의 필드, placeholder 그대로 가져오면 된다.
 */
</script>

<style scoped>
/* 공통 섹션 구조 (멘토링 폼도 비슷하게 맞춰줌) */
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

.field-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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

/* mentee 폼은 읽기 전용 스타일 형태(회색 박스) */
.input-box,
.select-box,
.date-box,
.textarea-box {
  background: #f3f3f5;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0);
  padding: 8px 12px;
  font-size: 13px;
  line-height: 20px;
  color: #717182;
  display: flex;
  align-items: center;
}

.date-box {
  min-height: 36px;
  gap: 8px;
  border: 1px solid rgba(0,0,0,0.1);
}

.date-icon-placeholder {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #d1d1d1;
  border: 1px solid #999;
}
.date-placeholder {
  font-size: 13px;
  color: #717182;
}

.textarea-box {
  min-height: 100px;
  align-items: flex-start;
  padding: 12px;
}

.textarea-hint {
  font-size: 12px;
  line-height: 18px;
  color: #717182;
  margin: 0;
  font-weight: 400;
}

/* 업로드 영역 */
.upload-area {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 6px;
  min-height: 140px;
  padding: 24px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.upload-icon-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.4);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-arrow {
  font-size: 16px;
  line-height: 1;
  color: rgba(0,0,0,0.6);
}
.upload-hint {
  font-size: 13px;
  line-height: 18px;
  color: #6a7282;
  text-align: center;
}

/* 제출 버튼 줄 (멘토링 페이지처럼 오른쪽 정렬) */
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
