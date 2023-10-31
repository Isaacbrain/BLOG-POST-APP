import { createRouter, createWebHistory } from 'vue-router'
import SignupPage from '../views/SignupPage.vue'
import PostPage from '../views/PostPage.vue'
import UserPage from '../views/UserPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: SignupPage
    },
    {
      path: '/post',
      name: 'post',
      component: PostPage
    },
    {
      path: '/userposts',
      name: 'userposts',
      component: UserPage
    }
  ]
})

export default router
