<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/14 19:53
-->
<template>
  <div>
    <div class="nav">
      <div class="header">
        <div class="left" v-if="getOrderType == 'takein'">
          <div class="store-name">
            <text>{{ store.name }}</text>
            <div class="iconfont iconarrow-right"></div>
          </div>
          <div class="store-location">
            <text>距离您 {{ store.distance_text }}</text>
          </div>
        </div>

        <div class="right">
          <div class="dinein" :class="{active: getOrderType == 'takein'}" @tap="SET_ORDER_TYPE('takein')">
            <text>自取</text>
          </div>
          <div class="takeout" :class="{active: getOrderType == 'takeout'}" @tap="takout">
            <text>外卖</text>
          </div>
        </div>
      </div>
      <div class="coupon">
        <text class="title">"霸气mini卡"超级购券活动，赶紧去购买</text>
        <div class="iconfont iconarrow-right"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { useLayoutStore } from '@/store/modules/layout'
    import { onBeforeMount} from 'vue'

    export default {
        name: "Menu",
        setup() {
            // proxy相当于 vue2的this，从getCurrentInstance 实例中获取，proxy对象
            const {getOrderType} = useLayoutStore()
            //初始化方法
            onBeforeMount(() => {
            })
            return {
                getOrderType
            }
        }
    }
</script>

<style scoped>

</style>
