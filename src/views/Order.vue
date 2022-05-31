<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/30 8:19
-->
<template>
  <div class="root">
    <van-config-provider :theme-vars="titleVar">
      <van-nav-bar title="点餐"/>
      <van-tabs v-model:active="active">
        <van-tab title="今日订单">

        </van-tab>
        <van-tab title="历史订单">
          <div class="history">
            <div class="order-item" v-for="(item, index) in orders" :key="index">
              <!--标题-->
              <div class="w-100 flex col-center row-between">
                <div class="left">
                  <div class="title flex-center">
                    <div class="title-left mr4 flex-center">自</div>{{ item.store.name }}
                  </div>
                  <div class="number mt3"> {{ formatDateTime(item.created_at) }}</div>
                </div>
                <div class="right">
                  {{ item.status_text }}<van-icon name="arrow" />
                </div>
              </div>
              <!--取件码-->
              <div class="contact flex col-center mt10">
                <div class="left ml10 flex-center">
                  <svg class="icon w32 h32" aria-hidden="true">
                    <use xlink:href="#icon-naicha"></use>
                  </svg>
                </div>
                <div class="center ml10">
                  <div class="center-num">取餐码 <span>{{ item.order_no.slice(item.order_no.length-5,item.order_no.length) }}</span></div>
                  <div class="center-contact mt5">有任何问题，请联系我们~</div>
                </div>
                <div class="right mr10">
                  <van-icon name="phone" />
                  <div class="right-contact mt5">联系门店</div>
                </div>
              </div>
              <!--商品-->
              <div class="order-item-list">
                <div class="left">
                  <van-image width="50px" height="50px" v-for="(imgItem,imgIndex) in item.goods" fit="cover" :src="imgItem.image" :key="imgIndex"></van-image>
                </div>
                <div class="right">
                  <div class="amount"><span>￥</span><span>{{ item.amount }}</span></div>
                  <div class="number">共{{ item.goods_num }}件</div>
                </div>
              </div>
              <!--再来一单-->
              <div class="order-item-again">
                <span>再来一单</span>
              </div>
            </div>

          </div>
        </van-tab>
      </van-tabs>
    </van-config-provider>
  </div>
</template>

<script>
  import {computed, getCurrentInstance, onMounted, reactive, ref, toRefs} from 'vue'

  export default {
    name: "Order",
    setup() {
      const state =reactive({
        orders: [],
        page: 1,
        pageSize: 5,
      })
      const vantRest = {
        titleVar: {
          borderColor: '#ffffff',
        }
      }

      const {proxy} = getCurrentInstance()
      const getOrders = async (isRefresh = false) => {
        let orders = await proxy.$api('orders')
        if (isRefresh) {
          state.orders = []
          state.page = 1
        }
        orders = orders.slice(state.pageSize * (state.page - 1), state.pageSize * state.page)
        if (orders.length) {
          state.orders = state.orders.concat(orders)
          state.page += 1
        }
      }

      const orderGoodsName = computed(() => {
        return (goods) => {
          let arr = []
          goods.forEach(good => arr.push(good.name + '*' + good.number))
          return arr.join('，')
        }
      })

      onMounted(async () => {
        await getOrders(false)
        console.log(state.orders)
      })

      const active = ref(0);
      return {
        ...toRefs(state),
        ...vantRest,
        orderGoodsName,
        active
      }
    }
  }
</script>

<style scoped lang="scss">
  .root {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .history {
      min-height: 100vh;
      background-color: $order-history-bg;
      padding: 10px 0px 60px 0px;
      .order-item{
        margin: 0px 10px 10px 10px;
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        box-shadow: $box-shadow;
        .left{
          .title{
            letter-spacing: 0.3px;
            font-size: $font-middle;
            &-left{
              font-size: $font-mini;
              zoom: 0.8;
              height: 20px;
              width: 20px;
              border-radius: 5px;
              color: white;
              background-color: $color-theme;
            }
          }
          .number{
            color: $order-content-tip;
            font-size: $font-mini;
            zoom: 0.8;
          }
        }
        .right{
          font-size: $font-mini;
        }
        .contact{
          width: 100%;
          border-radius: 5px;
          background-color: $order-contact-bg;
          padding: 10px 0px;
          .left{
            background-color: white;
            height: 38px;
            width: 38px;
            border-radius: 100%;
          }
          .center{
            flex: 1;
            &-num{
              font-size: $font-mini;
              letter-spacing: 1px;
              span{
                font-size: $font-large;
              }
            }
            &-contact{
              font-size: $font-mini;
              color: $color-theme;
              letter-spacing: 1.5px;
              zoom: 0.9;
            }
          }
          .right{
            display: flex;
            flex-direction: column;
            align-items: center;
            .van-icon{
              font-size: $font-large;
            }
            &-contact{
              font-size: $font-mini;
              color: $order-item-right;
              letter-spacing: 1.5px;
              zoom: 0.9;
            }
          }
        }
        &-list{
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          .left{
            .van-image{
              margin: 5px;
              border-radius: 5px;
            }
          }
          .right{
            margin-top: 10px;
            .amount{
              font-weight: bold;
              span:nth-child(1){
                font-size: $font-mini;
                zoom: 0.8;
              }
              span:nth-child(2){
                font-size: $font-large;
              }
            }
            .number{
              margin-top: 5px;
              display: flex;
              justify-content: flex-end;
              font-size: $font-mini;
              zoom: 0.9;
              color: $order-item-right;
            }
          }
        }
        &-again{
          display: flex;
          justify-content: flex-end;
          margin-top: 5px;
          span{
            font-size: $font-mini;
            color: $color-theme;
            border-radius: 20px;
            font-weight: bold;
            border: 2px $color-theme solid;
            padding: 3px 8px;
          }
        }
      }
    }
  }
</style>
