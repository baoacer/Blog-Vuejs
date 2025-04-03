<template>
  <div class="right-sidebar">
    <div class="sidebar-card chat-box">
      <h3>Trò chuyện</h3>
      <div class="chat-messages" ref="chatBox">
        <div v-for="(message, index) in messages" :key="index" class="chat-message">
          <span class="avatar">
            <img src="../assets/gemini-color.svg" alt="Avatar" />
          </span>
          <p>{{ message.content }}</p>
        </div>
      </div>
      <div class="chat-input">
        <input v-model="newMessage" type="text" placeholder="Nhập tin nhắn..." @keydown.enter="sendMessage" />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/api';

export default {
  name: 'SidebarChat',
  data() {
    return {
      messages: [],
      newMessage: '',
      avatar: '../assets/gemini-color.svg',
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim()) {
        const userMessage = this.newMessage;
        this.messages.push({
          content: userMessage,
          // avatar: '../assets/user-avatar.png', // Avatar người dùng
          avatar: this.avatar,
        });
        this.newMessage = '';

        try {
          const response = await API.post('/chat', { prompt: userMessage });
          if (response) {
            this.messages.push({
              content: response.data,
              // avatar: '../assets/chatbot-avatar.png', // Avatar bot
              avatar: this.avatar,
            });
          } else {
            this.messages.push({
              content: 'Lỗi: Không nhận được phản hồi từ bot.',
              // avatar: '../assets/chatbot-avatar.png',
              avatar: this.avatar,
            });
          }
        } catch (error) {
          console.error('Lỗi gửi tin nhắn:', error);
          this.messages.push({
            content: 'Lỗi: Không thể kết nối đến server.',
            // avatar: '../assets/chatbot-avatar.png',
            avatar: this.avatar,
          });
        }
      }
    },
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const chatBox = this.$refs.chatBox;
        if (chatBox) {
          chatBox.scrollTop = chatBox.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
.right-sidebar {
  width: 330px;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 60px;
  right: 0;
  height: calc(100vh - 60px);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  max-height: 630px;
  background: transparent;
  border-radius: 5px;
}

.chat-message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  font-size: 20px;
  margin-right: 8px;
}

.chat-input {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 5px;
  background: transparent;
}

.chat-input input {
  flex: 1;
  border: none;
  padding: 8px;
  font-size: 14px;
  background: transparent;
  color: white;
}

.chat-input button {
  padding: 8px 12px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
