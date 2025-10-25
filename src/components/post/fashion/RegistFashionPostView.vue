<template>
  <div class="page">
    <HeaderView />

    <!-- 배너 -->
    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>게시글 작성</h1>
        <p>당신의 스타일을 공유하세요</p>
      </div>
    </section>

    <!-- 폼 카드 -->
    <main class="container">
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
          <label class="label" for="hashtag">해시태그</label>
          <div class="hashtag-box">
            <input
              id="hashtag"
              v-model.trim="hashtagInput"
              type="text"
              class="input tag-input"
              placeholder="해시태그 입력 후 Enter"
              @keydown.enter.prevent="addHashtag"
            />
            <button type="button" class="btn small" @click="addHashtag">추가</button>
          </div>
          <div class="chips" v-if="form.hashtags.length">
            <span
              v-for="(tag, i) in form.hashtags"
              :key="tag + i"
              class="chip"
            >
              #{{ tag }}
              <button type="button" class="chip-x" @click="removeHashtag(i)">×</button>
            </span>
          </div>
        </div>

        <!-- 이미지 업로드 -->
        <div class="form-row">
          <label class="label">이미지</label>

          <div
            class="dropzone"
            @dragover.prevent
            @drop.prevent="onDrop"
            @click="() => fileEl?.click()"
          >
            <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16V8m0 0l-3 3m3-3l3 3M6 20h12a2 2 0 0 0 2-2V9l-4-4H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2Z"/></svg>
            <p>클릭하거나 이미지를 끌어다 놓으세요</p>
            <input ref="fileEl" type="file" accept="image/*" multiple hidden @change="onFileChange" />
          </div>

          <div class="preview" v-if="previews.length">
            <div v-for="(src, i) in previews" :key="i" class="thumb">
              <img :src="src" alt="preview" />
              <button type="button" class="thumb-x" @click="removeImage(i)">×</button>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import HeaderView from '../../HeaderView.vue';
import FooterView from '../../FooterView.vue';

const router = useRouter()

// 폼 상태
const form = reactive({
  title: '',
  content: '',
  hashtags: [] as string[],
  items: {
    clothes: '',
    top: '',
    bottom: '',
    shoes: '',
    accessory: '',
  },
  images: [] as File[],
})

const hashtagInput = ref('')

// 해시태그 추가/삭제
const addHashtag = () => {
  const v = hashtagInput.value.trim().replace(/^#/, '')
  if (!v) return
  if (!form.hashtags.includes(v)) form.hashtags.push(v)
  hashtagInput.value = ''
}
const removeHashtag = (i: number) => form.hashtags.splice(i, 1)

// 이미지 업로드
const fileEl = ref<HTMLInputElement | null>(null)
const previews = ref<string[]>([])

const onFileChange = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || [])
  appendFiles(files)
}
const onDrop = (e: DragEvent) => {
  const files = Array.from(e.dataTransfer?.files || [])
  appendFiles(files)
}
const appendFiles = (files: File[]) => {
  files.forEach((f) => {
    form.images.push(f)
    const url = URL.createObjectURL(f)
    previews.value.push(url)
  })
}
const removeImage = (i: number) => {
  form.images.splice(i, 1)
  URL.revokeObjectURL(previews.value[i])
  previews.value.splice(i, 1)
}

// 제출(추후 API 연결만 추가)
// 예: await api.post('/api/manager-service/posts/fashion', formData)
const onSubmit = async () => {
  // 예시: 간단 검증
  if (!form.title || !form.content) {
    alert('제목과 내용을 입력하세요.')
    return
  }
  console.log('submit payload', {
    ...form,
    images: form.images.map((f) => ({ name: f.name, size: f.size })),
  })
  alert('작성 폼이 준비되었습니다. 백엔드 API만 연결하면 돼요!')
  router.push({ name: 'fashionBoard' })
}

const goBoard = () => router.push({ name: 'fashionBoard' })
</script>

<style scoped>
.page { background:#fff; min-height:100vh; display:flex; flex-direction:column; }

/* 배너 */
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

/* 레이아웃 */
.container{ width:100%; max-width:1240px; margin:0 auto 40px; padding:0 24px; box-sizing:border-box; }
.card{
  background:#fff; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,.06);
  padding:20px; display:flex; flex-direction:column; gap:18px;
}

/* 폼 공통 */
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
.tag-input{ flex:1; }
.chips{ display:flex; gap:8px; flex-wrap:wrap; }
.chip{
  background:#111827; color:#fff; border-radius:999px; padding:6px 10px; font-size:12px;
  display:inline-flex; align-items:center; gap:6px;
}
.chip-x{
  background:transparent; border:none; color:#fff; font-size:14px; cursor:pointer; line-height:1;
}

/* 드롭존/미리보기 */
.dropzone{
  border:1px dashed #cbd5e1; border-radius:12px; height:220px;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  color:#6b7280; gap:8px; cursor:pointer;
}
.dropzone:hover{ background:#f9fafb; }
.dropzone svg{ opacity:.7; }
.preview{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
.thumb{ width:120px; height:90px; position:relative; border-radius:8px; overflow:hidden; box-shadow:0 1px 6px rgba(0,0,0,.08); }
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
.btn.small{ height:36px; min-width:auto; }
.btn.ghost{ background:#fff; }
.btn.primary{ background:#111827; color:#fff; border-color:#111827; }

/* 반응 */
@media (max-width: 860px){
  .grid-2{ grid-template-columns:1fr; }
}
</style>