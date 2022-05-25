import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import Home from '../views/Home.vue'
// @ts-ignore
import Menu from '../views/Menu.vue'


// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      // @ts-ignore
      component: ()=>import('@/views/Menu.vue')
    }
  ]
})

export default router
