import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
      component: () => import(/* webpackChunkName: "data" */ '../views/Menu.vue')
    }
  ]
})

export default router
