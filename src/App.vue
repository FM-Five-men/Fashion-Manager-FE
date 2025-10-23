<script setup>

</script>

<template>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#app { /* 예시: 앱 전체 너비 설정 */
  /* max-width: 1280px; */ /* 필요에 따라 주석 해제 또는 조정 */
  margin: 0 auto;
  /* padding: 2rem; */ /* 필요에 따라 주석 해제 또는 조정 */
  text-align: center;
}
</style>
