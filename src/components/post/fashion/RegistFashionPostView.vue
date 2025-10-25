<template>
  <div class="page-container">
    <HeaderView />

    <!-- 배너 -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>게시글 작성</h1>
        <p>당신의 스타일을 공유하세요</p>
      </div>
    </section>

    <!-- 메인 카드 -->
    <main class="main-content">
      <form class="card" @submit.prevent="onSubmit">
        <!-- 제목 -->
        <div class="form-row">
          <label class="label" for="title">제목</label>
          <input
            id="title"
            v-model.trim="form.title"
            type="text"
            class="input"
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <!-- 해시태그 -->
        <div class="form-row">
          <label class="label">해시태그</label>

          <!-- chips -->
          <div class="chips" v-if="form.hashtags.length">
            <span v-for="(tag, i) in form.hashtags" :key="tag + i" class="chip">
              #{{ tag }}
              <button type="button" class="chip-x" @click="removeHashtag(i)">×</button>
            </span>
          </div>

          <!-- 선택 버튼 -->
          <div class="hashtag-box">
            <button type="button" class="btn ghost" @click="openHashtagModal">
              추가
            </button>
          </div>
        </div>

        <!-- 이미지 업로드 (드롭존 안에 썸네일이 들어감) -->
        <div class="form-row">
          <label class="label">이미지</label>

          <div
            class="dropzone"
            @dragover.prevent
            @drop.prevent="onDrop"
            @click="() => fileEl?.click()"
          >
            <input ref="fileEl" type="file" accept="image/*" multiple hidden @change="onFileChange" />

            <!-- 안내문구 (이미지가 없을 때만 표시) -->
            <div v-if="!previews.length" class="dz-empty">
              <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16V8m0 0l-3 3m3-3l3 3M6 20h12a2 2 0 0 0 2-2V9l-4-4H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2Z"/></svg>
              <p>클릭하거나 이미지를 끌어다 놓으세요</p>
            </div>

            <!-- 썸네일 그리드 -->
            <div v-else class="dz-grid">
              <div v-for="(src, i) in previews" :key="i" class="thumb">
                <img :src="src" alt="preview" />
                <button type="button" class="thumb-x" @click.stop="removeImage(i)">×</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 패션 아이템 -->
        <div class="form-row">
          <label class="label">패션 아이템</label>
          <div class="grid-2">
            <div class="grid-item">
              <span class="sub-label">의류</span>
              <input v-model.trim="form.items.clothes" type="text" class="input" placeholder="의류 입력" />
            </div>
            <div class="grid-item">
              <span class="sub-label">상의</span>
              <input v-model.trim="form.items.top" type="text" class="input" placeholder="상의 입력" />
            </div>
            <div class="grid-item">
              <span class="sub-label">하의</span>
              <input v-model.trim="form.items.bottom" type="text" class="input" placeholder="하의 입력" />
            </div>
            <div class="grid-item">
              <span class="sub-label">신발</span>
              <input v-model.trim="form.items.shoes" type="text" class="input" placeholder="신발 입력" />
            </div>
            <div class="grid-item span-2">
              <span class="sub-label">악세서리</span>
              <input v-model.trim="form.items.accessory" type="text" class="input" placeholder="악세서리 입력" />
            </div>
          </div>
        </div>

        <!-- 내용 -->
        <div class="form-row">
          <label class="label" for="content">내용</label>
          <textarea
            id="content"
            v-model.trim="form.content"
            class="textarea"
            rows="10"
            placeholder="내용을 입력하세요"
            required
          ></textarea>
        </div>

        <!-- 버튼 -->
        <div class="btn-row">
          <button type="button" class="btn ghost" @click="goBoard">취소</button>
          <button type="submit" class="btn primary">작성 완료</button>
        </div>
      </form>
    </main>

    <FooterView />

    <!-- 🔶 해시태그 모달 -->
    <div v-if="showHashtagModal" class="modal-backdrop" @click.self="closeHashtagModal">
      <div class="modal-card">
        <div class="modal-head">
          <h3>해시태그 선택</h3>
        </div>

        <div class="modal-body">
          <div v-if="hashtagLoading" class="modal-loading">불러오는 중…</div>

          <div v-else class="tag-list">
            <label
              v-for="(tag, idx) in hashtagOptions"
              :key="idx"
              class="tag-option"
            >
              <input
                type="checkbox"
                :value="tag"
                v-model="selectedHashtags"
              />
              <span>#{{ tag }}</span>
            </label>
          </div>
        </div>

        <div class="modal-foot">
          <button class="btn ghost" @click="closeHashtagModal">취소</button>
          <button class="btn primary" @click="confirmHashtags">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';

/* --------------------------- 라우터 --------------------------- */
const router = useRouter()
const goBoard = () => router.push({ name: 'fashionBoard' })

/* --------------------------- 폼 상태 --------------------------- */
const form = reactive({
  title: '',
  content: '',
  hashtags: [] as string[],
  items: { clothes: '', top: '', bottom: '', shoes: '', accessory: '' },
  images: [] as File[],
})

/* --------------------------- 해시태그(모달) --------------------------- */
const showHashtagModal = ref(false)
const hashtagLoading = ref(false)
const hashtagOptions = ref<string[]>([])
const selectedHashtags = ref<string[]>([])

// 모달 열기 → 서버에서 목록 조회
const openHashtagModal = async () => {
  showHashtagModal.value = true
  hashtagLoading.value = true
  try {
    // 서버 응답: 문자열 배열이거나, 객체 배열일 수 있음(name/hashtag 필드 가정)
    const { data } = await axios.get('/api/manager-service/hashtag/selecthashtag', { withCredentials: true })

    const arr = Array.isArray(data) ? data : []
    // 문자열이면 그대로, 객체면 name/hashtag/label/keyword 중 첫 존재값 사용
    hashtagOptions.value = arr.map((v: any) => {
      if (typeof v === 'string') return v
      return v?.name ?? v?.hashtag ?? v?.label ?? v?.keyword ?? ''
    }).filter(Boolean)
  } catch (e) {
    console.error('해시태그 목록 조회 실패:', e)
    hashtagOptions.value = []
  } finally {
    hashtagLoading.value = false
  }
}

const closeHashtagModal = () => {
  showHashtagModal.value = false
  selectedHashtags.value = []
}

const confirmHashtags = () => {
  // 기존 + 신규 중복 제거
  const set = new Set([...form.hashtags, ...selectedHashtags.value])
  form.hashtags = Array.from(set)
  closeHashtagModal()
}

const removeHashtag = (i: number) => form.hashtags.splice(i, 1)

/* --------------------------- 이미지 업로드(드롭존 내부에 표시) --------------------------- */
const fileEl = ref<HTMLInputElement | null>(null)
const previews = ref<string[]>([])

const appendFiles = (files: File[]) => {
  files.forEach((f) => {
    form.images.push(f)
    previews.value.push(URL.createObjectURL(f))
  })
}
const onFileChange = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  appendFiles(files)
}
const onDrop = (e: DragEvent) => {
  const files = Array.from(e.dataTransfer?.files || [])
  appendFiles(files)
}
const removeImage = (i: number) => {
  form.images.splice(i, 1)
  URL.revokeObjectURL(previews.value[i])
  previews.value.splice(i, 1)
}

/* --------------------------- 제출(임시) --------------------------- */
const onSubmit = async () => {
  if (!form.title || !form.content) return alert('제목과 내용을 입력하세요.')
  // TODO: FormData 만들어 API에 전송
  alert('작성 폼 준비 완료! 백엔드 API만 연결하면 저장됩니다.')
  router.push({ name: 'fashionBoard' })
}
</script>

<style scoped>
/* ====== 보드와 동일 너비(1440px)로 통일 ====== */
.page-container{ width:1440px; margin:0 auto; background:#fff; min-height:100vh; display:flex; flex-direction:column; }

/* ====== 배너 ====== */
.banner{
  height:220px;
  background:url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1440&auto=format&fit=crop') center/cover no-repeat;
  position:relative;
  margin-bottom:24px;
}
.banner-overlay{ position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.1) 60%, rgba(0,0,0,0) 100%); }
.banner-text{ position:absolute; left:64px; bottom:32px; color:#fff; }
.banner-text h1{ font-size:24px; font-weight:800; letter-spacing:.4px; margin:0 0 6px; }
.banner-text p{ font-size:13px; opacity:.9; margin:0; }

/* ====== 메인 카드는 1440 안에서 자연스러운 폭 ====== */
.main-content{ width:100%; padding:0 57px 40px; box-sizing:border-box; }
.card{
  background:#fff; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06);
  padding:20px; display:flex; flex-direction:column; gap:18px;
}

/* ====== 폼 공통 ====== */
.form-row{ display:flex; flex-direction:column; gap:10px; }
.label{ font-size:14px; color:#111827; font-weight:700; }
.sub-label{ display:block; font-size:12px; color:#6b7280; margin-bottom:6px; }
.input{
  width:100%; height:40px; border-radius:8px; border:1px solid #e5e7eb; background:#f6f6f8;
  padding:0 12px; font-size:14px; color:#111827; box-sizing:border-box;
}
.input:focus{ outline:none; border-color:#111827; background:#fff; }
.textarea{
  width:100%; border-radius:8px; border:1px solid #e5e7eb; background:#f6f6f8;
  padding:10px 12px; font-size:14px; color:#111827; min-height:240px; resize:vertical;
}
.textarea:focus{ outline:none; border-color:#111827; background:#fff; }

/* 해시태그 */
.hashtag-box{ display:flex; gap:8px; align-items:center; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{
  background:#111827; color:#fff; border-radius:999px; padding:6px 10px; font-size:12px;
  display:inline-flex; align-items:center; gap:6px;
}
.chip-x{ background:transparent; border:none; color:#fff; font-size:14px; cursor:pointer; line-height:1; }

/* 드롭존(안에 그리드) */
.dropzone{
  border:1px dashed #cbd5e1; border-radius:12px; min-height:220px;
  display:flex; align-items:center; justify-content:center; position:relative;
  color:#6b7280; cursor:pointer; padding:12px;
}
.dropzone:hover{ background:#f9fafb; }

.dz-empty{ display:flex; flex-direction:column; align-items:center; gap:8px; pointer-events:none; }
.dz-grid{
  width:100%; display:grid; grid-template-columns:repeat(6, 1fr); gap:10px;
}
@media (max-width: 1200px){ .dz-grid{ grid-template-columns:repeat(4, 1fr); } }
@media (max-width: 820px){ .dz-grid{ grid-template-columns:repeat(3, 1fr); } }
@media (max-width: 560px){ .dz-grid{ grid-template-columns:repeat(2, 1fr); } }

.thumb{ width:100%; aspect-ratio: 4 / 3; position:relative; border-radius:8px; overflow:hidden; box-shadow:0 1px 6px rgba(0,0,0,.08); }
.thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
.thumb-x{
  position:absolute; top:6px; right:6px; width:22px; height:22px; border:none; border-radius:50%;
  background:rgba(17,24,39,.9); color:#fff; cursor:pointer; line-height:1;
}

/* 아이템 그리드 */
.grid-2{ display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; }
.grid-item{ display:flex; flex-direction:column; }
.grid-item.span-2{ grid-column:span 2; }

/* 버튼 */
.btn-row{ display:flex; justify-content:flex-end; gap:10px; margin-top:6px; }
.btn{ height:40px; min-width:110px; padding:0 14px; border-radius:8px; font-size:14px; cursor:pointer; border:1px solid #e5e7eb; }
.btn.ghost{ background:#fff; }
.btn.primary{ background:#111827; color:#fff; border-color:#111827; }

/* ====== 모달 ====== */
.modal-backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.35); display:flex; align-items:center; justify-content:center; z-index:50;
}
.modal-card{
  width:560px; max-width:90vw; background:#fff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,.25);
  display:flex; flex-direction:column; overflow:hidden;
}
.modal-head{ padding:14px 16px; border-bottom:1px solid #e5e7eb; }
.modal-head h3{ margin:0; font-size:16px; font-weight:800; }
.modal-body{ padding:12px 16px; max-height:60vh; overflow:auto; }
.modal-loading{ color:#6b7280; font-size:14px; }
.tag-list{ display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; }
.tag-option{
  display:flex; align-items:center; gap:8px; border:1px solid #e5e7eb; border-radius:8px; padding:8px 10px; cursor:pointer;
}
.modal-foot{ padding:12px 16px; border-top:1px solid #e5e7eb; display:flex; justify-content:flex-end; gap:8px; }
</style>
