<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import API from '../api/api'

const email = ref("")
const password = ref("")
const router = useRouter()

async function login() {
  try {
    const loginResponse = await API.post("/access/sign-in", { email: email.value, password: password.value });
    const userID = loginResponse.data.metadata.user.id
    const userResposne = await API.get(`/user?id=${userID}`)
    localStorage.setItem("user", JSON.stringify(userResposne.data.metadata))
    // console.log(`id`, userResposne.data.metadata._id)
    // console.log("User Data:", JSON.stringify(userResposne.data, null, 2));
    // console.log("User Ref:", userRef.value.id);
    // console.log("User Profile:", userRef.value.email);
    // console.log("User :", userRef.value.role);
    localStorage.setItem("token", loginResponse.data.metadata.accessToken);
    localStorage.setItem("userId", userID);
    console.log("token", localStorage.getItem("token"));
    console.log("userId", localStorage.getItem("userId"));
    if (loginResponse.data.status == 200) { 
      router.push("/home");
    }
    console.log("Response Data:", JSON.stringify(loginResponse.data, null, 2));
  } catch (error) {
    console.error(`Login Error:::${error}`);
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="text-white text-center">Đăng Nhập</h2>
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input v-model="email" type="text" id="email" name="email" placeholder="Nhập Email" required>

        <label for="password">Mật Khẩu</label>
        <input v-model="password" type="password" id="password" name="password" placeholder="Nhập mật khẩu" required>

        <button type="submit" class="btn">Đăng Nhập</button>
        <p ></p>
        <p class="text-white text-center">Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link></p>
      </form>
    </div>
  </div>
</template>



<style scoped>
/* Thiết lập hình nền */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw; /* Đảm bảo chiếm toàn bộ chiều rộng màn hình */
  background: url('../assets/images/sunset-forest-minimal-4k-wallpaper-thumb.jpg') no-repeat center center/cover;
  position: fixed; /* Giữ cố định giao diện */
  top: 0;
  left: 0;
}

.login-box {
  width: 400px; /* Đảm bảo form login có kích thước hợp lý */
  padding: 30px;
  background: transparent;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
  
}

/* Căn chỉnh nội dung trong form */
input {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.3);
  color: rgb(0, 0, 0);
}

input::placeholder {
  color: rgba(82, 59, 59, 0.586);
}

button {
  width: 100%;
  padding: 12px;
  background: #85fdfd;
  border: none;
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background: #25d0d3;
}

a {
  color: #00ffea;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
