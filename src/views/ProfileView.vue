<script setup>
import User, { useUser } from '@/model/user'
import UserPosts from '@/views/UserPosts.vue'
import { onMounted } from 'vue'

const userRef = useUser()

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser)
      userRef.value = new User(parsedUser)
      console.log('User Data:', JSON.stringify(userRef.value, null, 2))
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }
})
</script>

<template>
  <div class="profile-container container">
    <!-- Cover Photo -->
    <div class="cover-photo position-relative">
      <img
        src="https://picsum.photos/1920/600"
        alt="Cover Photo"
        class="img-fluid w-100"
        style="height: 350px; object-fit: cover"
      />

      <!-- Centered Profile Picture -->
      <div
        class="profile-picture-container position-absolute start-50 translate-middle"
        style="bottom: -80px"
      >
        <img
          :src="userRef.avatar"
          alt="Profile Picture"
          class="profile-picture img-thumbnail rounded-circle border-4 border-white"
          style="width: 170px; height: 170px; object-fit: cover"
        />
      </div>
    </div>

    <!-- User Information -->
    <div class="profile-info text-center mt-5 pt-5">
      <h2 class="mb-1">{{ userRef.fullname }}</h2>
    </div>

    <!-- Navigation Tabs -->
    <div class="text-center mt-4">
      <hr class="mt-2" />
    </div>

    <UserPosts />
  </div>
</template>

<style scoped>
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

.profile-picture-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-tabs .nav-link {
  color: #65676b;
}

.nav-tabs .nav-link.router-link-active {
  color: #1877f2;
  border-bottom: 3px solid #1877f2;
}
</style>
