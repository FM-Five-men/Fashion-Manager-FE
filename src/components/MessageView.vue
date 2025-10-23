<template>
  <div class="message-container">
    <!-- 헤더 -->
    <div class="header">
      <div class="header-left">
        <div class="icon"></div>
        <span class="title">쪽지함</span>
      </div>
      <div class="header-right">
        <div class="unread">2개의 읽지 않은 쪽지</div>
        <button class="write-btn">쪽지 쓰기</button>
      </div>
    </div>

    <!-- 검색창 -->
    <div class="search-box">
      <div class="search-icon"></div>
      <input type="text" v-model="searchQuery" placeholder="쪽지 검색..." />
    </div>

    <!-- 받은/보낸 탭 -->
    <div class="tab-container">
      <div
        class="tab"
        :class="{ active: activeTab === 'received' }"
        @click="activeTab = 'received'"
      >
        받은 쪽지함
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'sent' }"
        @click="activeTab = 'sent'"
      >
        보낸 쪽지함
      </div>
    </div>

    <!-- 쪽지 리스트 -->
    <div class="message-list">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        class="message-item"
        :class="{ unread: !msg.isRead }"
      >
        <div class="profile-circle">{{ msg.senderInitial }}</div>
        <div class="message-content">
          <div class="message-header">
            <div class="sender">{{ msg.sender }}</div>
            <div class="right-info">
                <div class="date">{{ msg.date }}</div>
                <div class="readunread">
                    <img
                    v-if="msg.isRead"
                    src="/images/icons/readmessage.svg"
                    alt="읽음"
                    />
                    <img
                    v-else
                    src="/images/icons/unreadmessage.svg"
                    alt="안읽음"
                    />
                </div>
            </div>
          </div>
          <div class="subject">{{ msg.subject }}</div>
          <div class="preview">{{ msg.preview }}</div>
        </div>
        <button class="delete-btn"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const token = sessionStorage.getItem('token');

onMounted(async () => {
  axios.get('/api/member-service/member/auth',{
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res)
    if(res.data != "올바른 토큰"){
        router.push('/')
    }
  })
})

const activeTab = ref("received");
const searchQuery = ref("");


// 더미 데이터
const messages = ref([
  {
    id: 1,
    sender: "김철수",
    senderInitial: "김",
    date: "2025-10-19 09:30",
    subject: "회의 일정 변경 안내",
    preview: "안녕하세요. 다음 주 월요일 회의 일정이 변경되었습니다...",
    isRead: false,
    type: "received",
  },
  {
    id: 2,
    sender: "박영희",
    senderInitial: "박",
    date: "2025-10-19 08:15",
    subject: "프로젝트 진행 상황 공유",
    preview: "지난주 논의했던 프로젝트 관련 진행 상황을 공유드립니다...",
    isRead: false,
    type: "received",
  },
  {
    id: 3,
    sender: "이민준",
    senderInitial: "이",
    date: "2025-10-18 11:45",
    subject: "점심 약속",
    preview: "오늘 점심 같이 드실래요? 새로운 식당 가보려고 해요...",
    isRead: true,
    type: "received",
  },
  {
    id: 4,
    sender: "정수진",
    senderInitial: "정",
    date: "2025-10-18 16:20",
    subject: "문서 검토 요청",
    preview: "첨부한 문서 검토 부탁드립니다. 내일까지 피드백 주시면 감사하겠습니다.",
    isRead: true,
    type: "sent",
  },
]);

// 필터링 (탭 + 검색어)
const filteredMessages = computed(() =>
  messages.value.filter(
    (msg) =>
      msg.type === activeTab.value &&
      msg.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
.message-container {
  width: 1088px;
  background: #f9fafb;
  padding: 32px;
  border-radius: 16px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon {
  background: url('/images/icons/message.svg') no-repeat center center;
  width: 26px;
  height: 21px;
}
.title {
  font-size: 16px;
  color: #0a0a0a;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.unread {
  background: #d4183d;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
}
.write-btn {
  background: #030213;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

/* Search */
.search-box {
  display: flex;
  align-items: center;
  background: #f3f3f5;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 20px;
}
.search-icon {
  background: url('/images/icons/search.svg') no-repeat center center;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}
.search-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  color: #717182;
}

/* Tabs */
.tab-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  background: #ececf0;
  padding: 4px;
  border-radius: 14px;
  margin-bottom: 24px;
}
.tab {
  background: white;
  border-radius: 14px;
  padding: 6px 20px;
  cursor: pointer;
  transition: 0.2s;
}
.tab.active {
  background: #030213;
  color: white;
}

/* Message List */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.message-item {
  display: flex;
  align-items: flex-start;
  background: white;
  border: 1px solid #e3e5e8;
  border-radius: 14px;
  padding: 16px;
  gap: 16px;
  position: relative;
}
.message-item.unread {
  background: #eff6ff;
  border-color: #bedbff;
}
.profile-circle {
  background: #ececf0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.message-content {
  flex: 1;
  display: flex;
  flex-direction: column; /* 세로 배치 */
  gap: 4px; /* 요소 간 간격 */
  text-align: left;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 오른쪽 영역 (날짜 + 읽음/안읽음 아이콘) */
.right-info {
  display: flex;
  align-items: center;
  gap: 6px; /* 날짜와 아이콘 사이 간격 */
}

.readunread img {
  width: 18px;
  height: 18px;
}

.sender {
  font-weight: 600;
  color: #222;
}

.date {
  font-size: 12px;
  color: #999;
}

.subject {
  font-weight: 600;
  font-size: 15px;
  color: #000;
}

.preview {
  font-size: 13px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* ... 으로 생략 */
}
.delete-btn {
  background: url('/images/icons/trashcan.svg') no-repeat center center;
  background-size: 20px 20px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
}
.delete-btn:hover {
  color: #d4183d;
}
</style>