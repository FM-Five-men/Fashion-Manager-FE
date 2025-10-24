<template>
  <nav class="pg-root" aria-label="Pagination" v-if="totalPages > 0">
    <button
      class="pg-btn ghost"
      :disabled="currentPage === 1"
      @click="goTo(1)"
      aria-label="첫 페이지"
    >«</button>

    <button
      class="pg-btn ghost"
      :disabled="currentPage === 1"
      @click="goTo(currentPage - 1)"
      aria-label="이전 페이지"
    >‹</button>

    <button
      v-for="p in visiblePages"
      :key="p"
      class="pg-btn"
      :class="{ active: p === currentPage }"
      @click="goTo(p)"
    >
      {{ p }}
    </button>

    <button
      class="pg-btn ghost"
      :disabled="currentPage === totalPages"
      @click="goTo(currentPage + 1)"
      aria-label="다음 페이지"
    >›</button>

    <button
      class="pg-btn ghost"
      :disabled="currentPage === totalPages"
      @click="goTo(totalPages)"
      aria-label="마지막 페이지"
    >»</button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  totalItems: number;
  pageSize: number;
  modelValue: number; // v-model
  maxButtons?: number; // 한 화면에 보일 페이지 번호 개수(기본 10)
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const maxButtons = computed(() => props.maxButtons ?? 10);

const totalPages = computed(() =>
  Math.max(1, Math.ceil((props.totalItems || 0) / (props.pageSize || 1)))
);

const currentPage = computed({
  get: () => Math.min(Math.max(props.modelValue || 1, 1), totalPages.value),
  set: (v: number) => emit("update:modelValue", v),
});

const visiblePages = computed(() => {
  const tp = totalPages.value;
  const max = maxButtons.value;
  if (tp <= max) return Array.from({ length: tp }, (_, i) => i + 1);

  const half = Math.floor(max / 2);
  let start = Math.max(1, currentPage.value - half);
  let end = start + max - 1;
  if (end > tp) {
    end = tp;
    start = tp - max + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

function goTo(p: number) {
  const tp = totalPages.value;
  const clamped = Math.min(Math.max(p, 1), tp);
  if (clamped !== currentPage.value) currentPage.value = clamped;
}
</script>

<style scoped>
.pg-root {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.pg-btn {
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  color: #0a0a0a;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.05s ease, background 0.2s ease;
}

.pg-btn:hover:not(.active):not(:disabled) {
  background: #f2f2f2;
}

.pg-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.pg-btn.active {
  background: #000;
  color: #fff;
  border-color: #000;
  cursor: default;
}

.pg-btn.ghost {
  background: #fff;
}

.pg-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
