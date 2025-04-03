import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginVue },
    { path: '/register', component: RegisterView },
    { path: '/home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/profile/:userId', component: ProfileView, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login') 
  } else {
    next() 
  }
})

export default router
