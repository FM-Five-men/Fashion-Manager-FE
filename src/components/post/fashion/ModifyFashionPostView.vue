<template>
  <div class="page-container">
    <HeaderView />

    <section class="banner">
      <div class="banner-overlay"></div>
      <div class="banner-text">
        <h1>게시글 수정</h1>
        <p>내용을 변경한 뒤 저장하세요</p>
      </div>
    </section>

    <main class="main-content">
      <form class="card" @submit.prevent="onUpdate" novalidate>
        <!-- 제목 -->
        <div class="form-row">
          <label class="label" for="title">제목</label>
          <input id="title" v-model.trim="form.title" type="text" class="input" placeholder="제목을 입력하세요" required />
        </div>


        <!-- 해시태그 -->
        <div class="form-row">
          <label class="label">해시태그</label>

          <div class="chips" v-if="selectedHashtagIds.length">
            <span class="chip" v-for="id in selectedHashtagIds" :key="id">
              {{ hashtagName(id) }}
              <button type="button" class="chip-x" @click="removeHashtag(id)">×</button>
            </span>
          </div>

          <div class="hashtag-box">
            <button type="button" class="btn ghost" @click="openHashtagModal">추가</button>
          </div>
        </div>

        
        <!-- ✅ 게시글 이미지 (기존 + 신규) -->
        <div class="form-row">
          <label class="label">게시글 이미지</label>

          <!-- 기존 이미지 미리보기 -->
          <div v-if="existingPostImages.length" class="dz-grid">
            <div v-for="(img, i) in existingPostImages" :key="'ep-'+i" class="thumb">
              <img :src="img.url" alt="existing post image" />
              <button type="button" class="thumb-x" @click="removeExisting('post', i)">×</button>
            </div>
          </div>

          <!-- 신규 업로드 드롭존 -->
          <div class="dropzone" @dragover.prevent @drop.prevent="onDropPost" @click="() => postFileEl?.click()">
            <input ref="postFileEl" type="file" accept="image/*" multiple hidden @change="onFileChangePost" />
            <div v-if="!postPreviews.length" class="dz-empty">
              <svg width="32" height="32" viewBox="0 0 24 24"><path d="M19 16v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8l4 4v6Z"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
              <p>클릭하거나 이미지를 끌어다 놓으세요</p>
            </div>
            <div v-else class="dz-grid">
              <div v-for="(src, i) in postPreviews" :key="'p-'+i" class="thumb">
                <img :src="src" alt="post preview" />
                <button type="button" class="thumb-x" @click.stop="removePostImage(i)">×</button>
              </div>
            </div>
          </div>
        </div>

        <!-- ✅ 아이템 이미지 (기존 + 신규) -->
        <div class="form-row">
          <label class="label">아이템 이미지</label>

          <!-- 기존 이미지 미리보기 -->
          <div v-if="existingItemImages.length" class="dz-grid">
            <div v-for="(img, i) in existingItemImages" :key="'ei-'+i" class="thumb">
              <img :src="img.url" alt="existing item image" />
              <button type="button" class="thumb-x" @click="removeExisting('item', i)">×</button>
            </div>
          </div>

          <!-- 신규 업로드 드롭존 -->
          <div class="dropzone" @dragover.prevent @drop.prevent="onDropItem" @click="() => itemFileEl?.click()">
            <input ref="itemFileEl" type="file" accept="image/*" multiple hidden @change="onFileChangeItem" />
            <div v-if="!itemPreviews.length" class="dz-empty">
              <svg width="32" height="32" viewBox="0 0 24 24"><path d="M19 16v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8l4 4v6Z"/><path d="M12 12v6"/><path d="M9 15h6"/></svg>
              <p>클릭하거나 이미지를 끌어다 놓으세요</p>
            </div>
            <div v-else class="dz-grid">
              <div v-for="(src, i) in itemPreviews" :key="'i-'+i" class="thumb">
                <img :src="src" alt="item preview" />
                <button type="button" class="thumb-x" @click.stop="removeItemImage(i)">×</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 착용 아이템 텍스트 -->
        <div class="form-row">
        <div class="section-title">패션 아이템</div>

        <div class="item-grid">
            <!-- 의류 -->
            <div class="field">
            <div class="field-label">의류</div>
            <input class="input" v-model="form.items.clothes" placeholder="의류 입력" />
            </div>

            <!-- 상의 -->
            <div class="field">
            <div class="field-label">상의</div>
            <input class="input" v-model="form.items.top" placeholder="상의 입력" />
            </div>

            <!-- 하의 -->
            <div class="field">
            <div class="field-label">하의</div>
            <input class="input" v-model="form.items.bottom" placeholder="하의 입력" />
            </div>

            <!-- 신발 -->
            <div class="field">
            <div class="field-label">신발</div>
            <input class="input" v-model="form.items.shoes" placeholder="신발 입력" />
            </div>

            <!-- 악세서리 라벨(가운데 정렬, 2열 전체) -->
            <div class="field col-span-2 center-label">악세서리</div>

            <!-- 악세서리 입력(2열 전체) -->
            <div class="field col-span-2">
            <input class="input" v-model="form.items.accessory" placeholder="악세서리 입력" />
            </div>
        </div>
        </div>

        <!-- 본문 -->
        <div class="form-row">
          <label class="label" for="content">내용</label>
          <textarea id="content" v-model="form.content" class="textarea" rows="8" placeholder="내용을 입력하세요"></textarea>
        </div>

        <div class="actions">
          <button type="submit" class="btn primary">수정 저장</button>
          <button type="button" class="btn ghost" @click="goBack">취소</button>
        </div>
      </form>
    </main>

    <FooterView />

    <!-- 해시태그 모달 -->
    <div v-if="showHashtagModal" class="modal-backdrop" @click.self="closeHashtagModal">
      <div class="modal-card">
        <div class="modal-head"><h3>해시태그 선택</h3></div>
        <div class="modal-body">
          <div v-if="hashtagLoading" class="modal-loading">불러오는 중…</div>
          <div v-else class="tag-list">
            <label v-for="opt in hashtagOptions" :key="opt.id" class="tag-option">
              <input type="checkbox" :value="opt.id" v-model="modalChecked" />
              <span>{{ opt.name }}</span>
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

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import HeaderView from '../../HeaderView.vue'
import FooterView from '../../FooterView.vue'

/* ------------ 라우터/파라미터 ------------ */
const router = useRouter()
const route = useRoute()
const postNum = Number(route.params.postNum)

/* ------------ axios 인스턴스 ------------ */
const api = axios.create({ baseURL: '/api', withCredentials: true })
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken'); // 프로젝트 저장소 키에 맞춰 수정
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/* ------------ 로그인 회원 ------------ */
const memberNum = ref(null)
const toNumber = (v) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : null
}
onMounted(() => {
  api.get('/member-service/member/auth')
    .then(({ data }) => { memberNum.value = toNumber(data?.memberNum ?? data?.num ?? data?.number) })
    .catch(() => {})  // 권한 검증은 서버에서도 해주세요
})

/* ------------ 폼 ------------ */
const form = reactive({
  title: '',
  content: '',
  items: { clothes: '', top: '', bottom: '', shoes: '', accessory: '' },
})

/* ------------ 해시태그 ------------ */
const hashtagOptions = ref([])
const hashtagMap = computed(() => {
  const m = new Map(); hashtagOptions.value.forEach(o => m.set(o.id, o.name)); return m
})
const selectedHashtagIds = ref([])

const showHashtagModal = ref(false)
const hashtagLoading = ref(false)
const modalChecked = ref([])

const hashtagName = (id) => hashtagMap.value.get(id) ?? `#${id}`
const openHashtagModal = () => {
  showHashtagModal.value = true
  hashtagLoading.value = true
  modalChecked.value = [...selectedHashtagIds.value]
  api.get('/manager-service/hashtag/selecthashtag')
    .then(({ data }) => {
      hashtagOptions.value = Array.isArray(data)
        ? data
            .map(x => ({ id: Number(x.hashTagNum), name: String(x.hashTagName) }))
            .filter(o => !Number.isNaN(o.id) && !!o.name)
        : []
    })
    .finally(() => { hashtagLoading.value = false })
}
const closeHashtagModal = () => { showHashtagModal.value = false }
const confirmHashtags = () => {
  selectedHashtagIds.value = Array.from(new Set([...selectedHashtagIds.value, ...modalChecked.value]))
  closeHashtagModal()
}
const removeHashtag = (id) => {
  selectedHashtagIds.value = selectedHashtagIds.value.filter(x => x !== id)
}

/* ------------ 이미지: 기존/신규 분리 ------------ */
const postFileEl = ref(null)
const itemFileEl = ref(null)

const postImages = ref([])      // 신규 파일
const itemImages = ref([])

const postPreviews = ref([])    // 신규 프리뷰
const itemPreviews = ref([])

const existingPostImages = ref([]) // [{id?, url}]
const existingItemImages = ref([])

const appendFiles = (files, which) => {
  const targetImages = which === 'post' ? postImages : itemImages
  const targetPrevs  = which === 'post' ? postPreviews : itemPreviews
  files.forEach(f => {
    targetImages.value.push(f)
    const url = URL.createObjectURL(f)
    targetPrevs.value.push(url)
  })
}
const onFileChangePost = (e) => { appendFiles(Array.from(e.target?.files || []), 'post') }
const onDropPost = (e) => { appendFiles(Array.from(e.dataTransfer?.files || []), 'post') }
const removePostImage = (i) => {
  URL.revokeObjectURL(postPreviews.value[i])
  postImages.value.splice(i, 1)
  postPreviews.value.splice(i, 1)
}
const onFileChangeItem = (e) => { appendFiles(Array.from(e.target?.files || []), 'item') }
const onDropItem = (e) => { appendFiles(Array.from(e.dataTransfer?.files || []), 'item') }
const removeItemImage = (i) => {
  URL.revokeObjectURL(itemPreviews.value[i])
  itemImages.value.splice(i, 1)
  itemPreviews.value.splice(i, 1)
}
const removeExisting = (which, i) => {
  if (which === 'post') existingPostImages.value.splice(i, 1)
  else existingItemImages.value.splice(i, 1)
}

/* ------------ 초기 데이터 로드(프리필) ------------ */
const hydrateFrom = (p) => {
  if (!p) return
  form.title = p.title ?? ''
  form.content = p.content ?? ''

  // 해시태그(예: [{hashTagNum, hashTagName}] → [id])
  if (Array.isArray(p.hashTags ?? p.hashtags ?? p.hashTagRes)) {
    const arr = p.hashTags ?? p.hashtags ?? p.hashTagRes
    selectedHashtagIds.value = arr.map(x => Number(x.hashTagNum ?? x.id)).filter(n => Number.isFinite(n))
  }

  // 아이템 텍스트(배열/객체 모두 대응)
  const items = Array.isArray(p.items) ? p.items : []
  form.items.clothes   = p.items?.clothes   ?? items[0] ?? ''
  form.items.top       = p.items?.top       ?? items[1] ?? ''
  form.items.bottom    = p.items?.bottom    ?? items[2] ?? ''
  form.items.shoes     = p.items?.shoes     ?? items[3] ?? ''
  form.items.accessory = p.items?.accessory ?? items[4] ?? ''

  // 기존 이미지(서버가 내려주는 URL 배열 가정)
  const postUrls = p.postImageUrls ?? p.postImages ?? []
  const itemUrls = p.itemImageUrls ?? p.itemImages ?? []
  existingPostImages.value = postUrls.map(u => ({ url: String(u) }))
  existingItemImages.value = itemUrls.map(u => ({ url: String(u) }))
}

onMounted(() => {
  // 1) 상세 페이지에서 state로 전달된 데이터가 있으면 우선 사용
  const statePost = history.state?.post
  if (statePost) hydrateFrom(statePost)

  // 2) 안전하게 서버에서 다시 가져오기(엔드포인트는 프로젝트에 맞게 조정)
  api.get(`/manager-service/posts/fashion/${postNum}`)
    .then(({ data }) => hydrateFrom(data))
    .catch(() => {})
})

/* ------------ 저장(수정) ------------ */
const onUpdate = () => {
  if (!form.title.trim()) { alert('제목을 입력하세요.'); return }

  const itemTexts = [
    form.items.clothes, form.items.top, form.items.bottom, form.items.shoes, form.items.accessory
  ].map(v => (v || '').trim()).filter(Boolean)

// 1. modifyPost JSON 객체 생성 (백엔드 요구사항에 맞게 필드 조정)
const modifyPostData = {
    title: form.title.trim(),
    memberNum: memberNum.value,
    hashtag: selectedHashtagIds.value, // 해시태그 ID 배열
    // items 필드는 백엔드가 텍스트 배열을 받는지, ID 배열을 받는지 확인 필요.
    // 여기서는 기존 코드처럼 텍스트 배열을 보냅니다.
    // 만약 ID 배열이 필요하다면, itemTexts를 ID로 변환하는 로직이 추가되어야 합니다.
    items: itemTexts,
    // content 필드가 비어있지 않은 경우에만 포함
    ...(form.content?.trim() && { content: form.content.trim() })
  }
  // 기존 이미지 URL 관련 필드 (keepPostImageUrls, keepItemImageUrls) 제거

  // 2. FormData 생성 및 데이터 추가
    const fd = new FormData()

  // 2-1. modifyPost JSON 데이터를 Blob으로 변환하여 추가
    fd.append('modifyPost', new Blob([JSON.stringify(modifyPostData)], { type: 'application/json' }))

  // 2-2. 새로 추가된 postImages 파일들을 추가
    postImages.value.forEach(f => fd.append('postImages', f))

  // 2-3. 새로 추가된 itemImages 파일들을 추가
    itemImages.value.forEach(f => fd.append('itemImages', f))

  // 3. API 호출 (URL 및 메소드는 기존과 동일하게 PUT 사용)
    api.put(`/manager-service/posts/fashion/${postNum}`, fd, {
    // Content-Type 헤더는 FormData 사용 시 axios가 자동으로 설정하므로 명시하지 않습니다.
        validateStatus: s => (s >= 200 && s < 300) || s === 204
    })
    .then(() => {
        alert('수정이 완료되었습니다.')
    // 성공 시 게시글 목록 또는 상세 페이지로 이동 (기존 코드 유지)
        router.push({ name: 'fashionboardview' }) // 또는 router.push(`/fashionpost/${postNum}`) 등
    })
    .catch((e) => {
        console.error('게시글 수정 실패:', e?.response?.status, e?.response?.data)
        alert('수정에 실패했습니다. 잠시 후 다시 시도해주세요.')
    })
}

const goBack = () => router.back()
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

.section-title{
  font-weight:700;
  text-align:center;
  font-size:16px;
  margin-bottom:10px;
}

.item-grid{
  display:grid;
  grid-template-columns: 1fr 1fr; /* 2열 */
  gap: 12px 16px;                 /* 행,열 간격 */
}

.field{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.field-label{
  font-weight:600;
  color:#6b7280;       /* 회색 톤 소제목 */
  text-align:center;   /* 오른쪽 예시처럼 중앙 정렬 */
}

.center-label{
  text-align:center;
  color:#6b7280;
  font-weight:600;
  padding-top:4px;
}

.col-span-2{
  grid-column: 1 / -1; /* 2열 모두 차지 */
}
</style>