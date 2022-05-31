import { createRouter, createWebHashHistory } from 'vue-router'


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
      // @ts-ignore
      component: ()=>import('@/views/Home.vue')
    },
    {
      path: '/menu',
      name: 'Menu',
      // @ts-ignore
      component: ()=>import('@/views/Menu.vue')
    },
    {
      path: '/pay',
      name: 'Pay',
      // @ts-ignore
      component: ()=>import('@/views/Pay.vue')
    },
    {
      path: '/payTime',
      name: 'PayTime',
      // @ts-ignore
      component: ()=>import('@/views/PayTime.vue')
    },
    {
      path: '/order',
      name: 'Order',
      // @ts-ignore
      component: ()=>import('@/views/Order.vue')
    },
    {
      path: '/mine',
      name: 'Mine',
      // @ts-ignore
      component: ()=>import('@/views/Mine.vue')
    }
  ]
})

export default router
