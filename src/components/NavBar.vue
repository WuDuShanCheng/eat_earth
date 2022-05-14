<template>
  <van-tabbar v-model="active">
    <van-tabbar-item name="/home" icon="wap-home-o" @click="link('/home')">首页</van-tabbar-item>
    <van-tabbar-item name="/menu" icon="shopping-cart-o" @click="link('/menu')">点菜</van-tabbar-item>
    <van-tabbar-item name="/order" icon="orders-o" @click="link('/order')">订单</van-tabbar-item>
    <van-tabbar-item name="/user" icon="user-o" @click="link('/user')">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  setup() {
    const router = useRouter()
    const active = ref('/home')

    const link = (path) => {
      router.push({ path })
    }

    onMounted(() => {
      active.value = router.currentRoute.value.path
    })

    router.afterEach(() => {
      active.value = router.currentRoute.value.path
    })

    return {
      active,
      link
    }
  }
}
</script>

<style>
</style>
