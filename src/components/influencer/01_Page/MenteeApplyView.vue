<template>
  <!--
    mode="mentee"
    - ApplyLayout이 배너 문구 / 탭 강조 상태 등을 이 값으로 판단
    :FormComponent="MenteeForm"
    - 카드 내부에 멘티용 폼 주입
  -->
  <ApplyLayout
    mode="mentee"
    :FormComponent="ApplyFormMentee"
  />
</template>

<script setup>
import ApplyLayout from '../03_Apply/ApplyLayout.vue'
import ApplyFormMentee from '../03_Apply/ApplyFormMentee.vue'
</script>
