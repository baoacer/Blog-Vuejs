<template>
  <aside class="sidebar">
    <ul>
      <li @click="goToHome">🏠 Trang chủ</li>
      <li>👨‍👩‍👧 Bạn bè</li>
      <li>📷 Ảnh</li>
      <li>📺 Video</li>
      <li @click="toggleSettings" id="settings">⚙️ Cài đặt
        <div v-if="showSettings" class="settings-submenu">
          <div class="logout-button" @click.stop="logout">🚪 Đăng xuất</div>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import API from '@/api/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter(); 
const showSettings = ref(false);
const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

const goToHome = () => {
  router.push('/home');
};

const logout = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  const res = await API.post('/access/sign-out')
  if (res.data.status == 200) { 
      router.push("/home");
  }
};
</script>

<style>
.sidebar {
  width: 220px;
  background: rgba(213, 209, 209, 0.2);
  padding: 15px;
  height: 90vh;
  position: fixed;
  left: 10px;
  top: 60px;
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease, transform 0.2s ease;
  position: relative;
}

.sidebar li:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.logout-button {
  background: rgba(255, 100, 100, 0.2);
  color: #333;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.logout-button:hover {
  background: rgba(255, 100, 100, 0.4);
}

.settings-submenu {
  margin-top: 5px;
  padding-left: 20px;
}
</style>