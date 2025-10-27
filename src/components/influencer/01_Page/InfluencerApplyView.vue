<template>
  <!--
    mode="influencer"
    - ApplyLayout이 배너 문구 / 탭 강조 상태 등을 이 값으로 판단해서 렌더링함
    :FormComponent="InfluencerForm"
    - 카드 내부에 어떤 폼을 넣을지 주입
  -->
  <ApplyLayout
    mode="influencer"
    :FormComponent="ApplyFormInfluencer"
  />
</template>

<script setup>
import ApplyLayout from '../03_Apply/ApplyLayout.vue'
import ApplyFormInfluencer from '../03_Apply/ApplyFormInfluencer.vue'
</script>
