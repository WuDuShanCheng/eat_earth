<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/27 8:19
-->
<template>
  <div class="root">
    <van-config-provider :theme-vars="titleVar">
      <van-nav-bar
        left-text="支付"
        left-arrow
        @click-left="onClickLeft"
        :theme-vars="titleVar"
      />
    </van-config-provider>

    <!--剩余支付时间-->
    <div class="pay-time flex-center">
      <div>剩余支付时间</div>
      <div>00:58:23</div>
    </div>
  </div>
</template>

<script>
  import {storeToRefs} from "pinia";
  import {useLayoutStore} from "@/store/modules/layout";
  import {computed, onMounted, reactive} from "vue";

  export default {
    name: "PayTime",
    setup() {
      const vantRest = {
        titleVar: {
          navBarIconColor: '#000000',
          navBarTextColor: '#000000'
        }
      }

      const state = reactive({
        cart: []
      })
      const {getStore} = storeToRefs(useLayoutStore())

      onMounted(() => {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      })

      //商品总价
      const total = computed(()=>{
        return state.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0)
      })

      const onClickLeft = () => history.back();

      return {
        getStore,
        total,
        ...vantRest,
        onClickLeft
      }
    }
  }
</script>

<style scoped lang="scss">
  .root{
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .pay-time{
      height: 80px;
      width: 100%;
      flex-direction: column;
      div:nth-child(1){
        color: #808080;
      }
    }
  }
</style>
