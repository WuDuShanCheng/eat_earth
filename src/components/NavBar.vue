<template>
  <van-tabbar v-show="show" v-model="active" class="shadow" >
    <van-tabbar-item name="/home" icon="wap-home-o" @click="link('/home')">首页</van-tabbar-item>
    <van-tabbar-item name="/menu" icon="shopping-cart-o" @click="link('/menu')">点菜</van-tabbar-item>
    <van-tabbar-item name="/order" icon="orders-o" @click="link('/order')">订单</van-tabbar-item>
    <van-tabbar-item name="/mine" icon="user-o" @click="link('/mine')">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
  import {onMounted, reactive, ref, toRefs} from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'NavBar',
  props: {
    msg: String
  },
  setup() {
    const router = useRouter()
    const active = ref('/home')
    const state = reactive({
      show:true
    })
    const link = (path) => {
      router.push({ path })
    }

    onMounted(() => {
      active.value = router.currentRoute.value.path
    })

    router.afterEach(() => {
      active.value = router.currentRoute.value.path
      state.show = ['/home','/menu','/order','/mine'].includes(active.value)
    })

    return {
      active,
      link,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
  .shadow{
    box-shadow: $box-shadow-theme;
  }
</style>
