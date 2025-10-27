<template>
  <HeaderView/>
  <div class="message-container">
    <!-- 헤더 -->
    <div class="header">
      <div class="header-left">
        <div class="icon"></div>
        <span class="title">쪽지함</span>
      </div>
      <div class="header-right">
        <div v-if="unreadCount != 0" class="unread">{{ unreadCount }}개의 읽지 않은 쪽지</div>
        <button class="write-btn" @click="writeMessage">쪽지 쓰기</button>
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
        :key="msg.num"
        class="message-item"
        :class="{ unread: !msg.messageConfirmed }"
        @click="openReadModal(msg)"
      >
        <div class="profile-circle"></div>
        <div class="message-content">
          <div class="message-header">
            <div class="sender">{{ msg.senderId }}</div>
            <div class="right-info">
                <div class="date">{{ msg.date }}</div>
                <div class="readunread">
                    <img
                    v-if="msg.messageConfirmed"
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
          <div class="subject">{{ msg.title }}</div>
        </div>
        <button class="delete-btn" @click.stop="messageDelete(msg.num)"></button>
      </div>
    </div>

    <!-- ✅ 읽기용 모달 -->
    <div v-if="showReadModal" class="modal-overlay" @click.self="closeReadModal">
      <div class="message-modal">
        <div class="modal">
          <div class="message-header">
            <div class="message-header-left">
              <div class="icon"></div>
              <div class="message-title">쪽지 내용</div>
            </div>
          </div>

          <div class="message-form">
            <div class="form-group">
              <label class="modal-label">보낸 사람</label>
              <div>{{ selectedMessage.senderId }}</div>
            </div>

            <div class="form-group">
              <label class="modal-label">제목</label>
              <div>{{ selectedMessage.title }}</div>
            </div>

            <div class="form-group">
              <label class="modal-label">내용</label>
              <textarea readonly>{{ selectedMessage.content }}</textarea>
            </div>

            <div class="form-group">
              <label class="modal-label">날짜</label>
              <div>{{ selectedMessage.date }}</div>
            </div>
          </div>

          <div class="message-footer">
            <button class="cancel-btn" @click="closeReadModal">닫기</button>
          </div>
        </div>
      </div>
    </div>



    <!-- ✅ 모달 창 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="message-modal">
        <div class="modal">
          <!-- 상단 헤더 -->
          <div class="message-header">
            <div class="message-header-left">
              <div class="icon"></div>
              <div class="message-title">쪽지 쓰기</div>
            </div>
          </div>

          <!-- 입력 폼 -->
          <div class="message-form">
            <div class="form-group">
              <label class="modal-label">받는 사람</label>
              <input type="text" placeholder="받는 사람 이름을 입력하세요" v-model="messageReceiver"/>
            </div>

            <div class="form-group">
              <label class="modal-label">제목</label>
              <input type="text" placeholder="제목을 입력하세요" v-model="messageTitle"/>
            </div>

            <!-- ✅ 쪽지 카테고리 드롭다운 추가 -->
            <div class="form-group">
              <label class="modal-label">쪽지 카테고리</label>
              <select v-model="messageCategory" class="category-select">
                <option value="1">요청사항</option>
                <option value="2">조언</option>
                <option value="3">일반</option>
                <option value="4">답변</option>
                <option value="5">문의</option>
              </select>
            </div>

            <div class="form-group">
              <label class="modal-label">내용</label>
              <textarea placeholder="내용을 입력하세요" v-model="messageContent"></textarea>
            </div>
          </div>

          <!-- 하단 버튼 -->
          <div class="message-footer">
            <button class="cancel-btn" @click="closeModal">취소</button>
            <button class="send-btn" @click="sendMessage">보내기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView/>
</template>

<script setup>
import HeaderView from '../HeaderView.vue';
import FooterView from '../FooterView.vue';

import { ref, computed, onMounted, watch } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const token = sessionStorage.getItem('token');
let memberId = ref("");
let memberEmail = ref("");
let memberState = ref("");

const messageReceiver = ref("")
const messageTitle = ref("")
const messageCategory = ref(3)
const messageContent = ref("")

const showModal = ref(false);
const showReadModal = ref(false);   
const selectedMessage = ref({});

const messages = ref([]);

onMounted(async () => {
  axios.get('/api/member-service/member/auth',{
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    console.log(res)
    if(res.data.memberId == null){
      router.push('/')
    }else{
      memberId.value = res.data.memberId
      memberEmail.value = res.data.memberEmail
      memberState.value = res.data.memberState
    }
  })

  watch(memberId, (current, old) => {
    /* 보낸사람 기준 메시지 */
    const data = new FormData();
    data.append("senderId", memberId.value);
    console.log("보낸사람: ",memberId.value);

    axios.post("/api/manager-service/message/selectsendermessage", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      (res) => {
        console.log(res)
        res.data.forEach(item => {
          console.log(item);
          item.type = "sent";        
          messages.value.push(item); 
        });
      }
    )
    
    /* 받는사람 기준 메시지 */
    const data2 = new FormData();
    data2.append("receiverId", memberId.value);
    console.log("받는사람: ",memberId.value);

    axios.post("/api/manager-service/message/selectreceivermessage", data2, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
      (res) => {
        console.log(res)
        res.data.forEach(item => {
          console.log(item);    
          item.type = "received";    
          messages.value.push(item); 
        });
      }
    )
  })
  
})

const activeTab = ref("received");
const searchQuery = ref("");


// 필터링 (탭 + 검색어)
const filteredMessages = computed(() =>
  messages.value.filter(
    (msg) =>
      (msg.type === activeTab.value &&
      msg.title.toLowerCase().includes(searchQuery.value.toLowerCase())) || 
      (msg.type === activeTab.value &&
      msg.senderId.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
);

const unreadCount = computed(() => {
  return messages.value.filter(msg => !msg.messageConfirmed).length;
});

const openReadModal = (msg) => {
  selectedMessage.value = msg;
  showReadModal.value = true;

  // 읽음 처리 API 호출 예시
  if (!msg.messageConfirmed) {
    const data = new FormData();
    data.append("messageNum", msg.num);
    axios.post("/api/manager-service/message/updatemessageconfirm", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    msg.messageConfirmed = true;
  }
};

// ✅ 읽기 모달 닫기
const closeReadModal = () => {
  showReadModal.value = false;
  selectedMessage.value = {};
};

const messageDelete = async (num) => {
  console.log("삭제할 메시지 key:", num);
  
  const data = new FormData();
  data.append("messageNum", num);
  
  axios.post('/api/manager-service/message/deletemessage',data,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(
    (res) => {
      console.log(res)
      messages.value = messages.value.filter(msg => msg.num !== num);
    }
  )
};

const writeMessage = () => {
  showModal.value = true;
}

const closeModal = () => {
  showModal.value = false;
};

const sendMessage = async () => {
  const data = new FormData();
  data.append("messageReceiver",messageReceiver.value);
  data.append("messageSender", memberId.value);
  data.append("messageTitle", messageTitle.value);
  data.append("messageCategory", messageCategory.value);
  data.append("messageContent", messageContent.value);

  await axios.post('/api/manager-service/message/insertmessage',data,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(
    (res) => {
      console.log(res);
      showModal.value = false
    }
  )
  
}
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.modal {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  text-align: center;
  animation: fadeIn 0.25s ease-in-out;
  width: 440px;
  height: 450px;
}

.modal h3 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #000;
}

.modal p {
  color: #555;
  font-size: 14px;
  margin-bottom: 20px;
}

.close-btn {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.close-btn:hover {
  background-color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}





.message-modal {
  width: 512px;
  height: 500px;
  background: white;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  position: relative;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Header */
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.message-title {
  font-size: 18px;
  font-weight: 700;
  color: #0a0a0a;
}

.close-btn {
  width: 16px;
  height: 16px;
  opacity: 0.7;
  border-radius: 2px;
  border: 1.5px solid #0a0a0a;
  cursor: pointer;
}

/* Form */
.message-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #0a0a0a;
}

input,
textarea {
  background: #f3f3f5;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #717182;
  outline: none;
  resize: none;
}

textarea {
  height: 64px;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 8px;
}

.select-btn {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.count {
  font-size: 14px;
  color: #6a7282;
}

/* Footer */
.message-footer {
  display: flex;
  justify-content: end;
  gap: 8px;
  padding: 20px;
}

.cancel-btn {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
}

.send-btn {
  background: #030213;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 24px;
  cursor: pointer;
}

.modal-label {
  text-align: left;
}

.category-select {
  background: #f3f3f5;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #717182;
  outline: none;
  appearance: none;
  cursor: pointer;
}
</style>