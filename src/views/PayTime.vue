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
    <div class="pay-time flex-center mt20">
      <div>剩余支付时间</div>
      <div class="mt10 time">00:{{minute}}:{{second}}</div>
    </div>

    <div class="order-line"></div>
    <div class="order">
      <div class="order-content">
        <div class="flex col-center">
          <van-image
            class="icon"
            width="40px"
            height="40px"
            round
            fit="cover"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <div class="text ml10">{{getStore.name}}</div>
        </div>
        <div class="line mt30">
        </div>

        <div class="order-num mt10">
          <span>订单号码</span>
          <span>202205260926342967625897644</span>
        </div>
        <div class="order-num mt10">
          <span>订单金额</span>
          <span>￥{{total}}</span>
        </div>
      </div>
    </div>

    <div class="pay mt10">
      <span>支付方式</span>
      <div class="line mt20"></div>
      <div class="mt10 flex row-between">
        <div class="flex-center">
          <svg class="icon w30 h30" aria-hidden="true">
            <use xlink:href="#icon-zhifupingtai-weixin"></use>
          </svg>
          <span class="ml10">微信支付</span>
        </div>
        <div class="flex-center">
          <van-icon name="checked" class="right-icon-active"/>
        </div>
      </div>
      <div class="mt10 flex row-between">
        <div class="flex-center">
          <svg class="icon w30 h30" aria-hidden="true">
            <use xlink:href="#icon-zhifupingtai-zhifubao"></use>
          </svg>
          <span class="ml10">支付宝</span>
        </div>
        <div class="flex-center">
          <van-icon name="checked" class="right-icon"/>
        </div>
      </div>
      <div class="mt10 flex row-between">
        <div class="flex-center">
          <svg class="icon w30 h30" aria-hidden="true">
            <use xlink:href="#icon-zhifupingtai-yinlian"></use>
          </svg>
          <span class="ml10">银联支付</span>
        </div>
        <div class="flex-center">
          <van-icon name="checked" class="right-icon"/>
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="flex-center mt10">
        <div class="dec">本单可获得<span>{{total}}积分<span
          class="iconfont icon-xingxing"></span></span>+<span>{{total}}成长值<span class="iconfont icon-shu"></span></span>
        </div>
        <div></div>
      </div>
      <div class="submit mt5" @click="toOrder">确认支付￥{{total}}</div>
    </div>
  </div>
</template>

<script lang="ts">
    import {storeToRefs} from "pinia";
    import {useLayoutStore} from "@/store/modules/layout";
    import {computed, onMounted, reactive, ref} from "vue";
    import {useTimeoutPoll} from '@vueuse/core'
    import {useRouter} from "vue-router";

    export default {
        name: "PayTime",
        setup() {
            //分钟
            let minute = ref(59)
            //秒钟
            let second = ref(59)
            const fetchData = () => {
                second.value--
                if (second.value as any == 0) {
                    (minute.value as any)--
                    second.value = 60 as any
                }
                if (minute.value==0&&second.value==0){
                    pause()
                }
            }
            let {pause, resume } = useTimeoutPoll(fetchData, 1000)
            resume()

            const vantRest = {
                titleVar: {
                    navBarIconColor: '#000000',
                    navBarTextColor: '#000000'
                }
            }

            const router = useRouter()

            const toOrder = () =>{
                router.push('/takeFoods')
            }

            const state = reactive({
                cart: []
            })
            const {getStore} = storeToRefs(useLayoutStore())

            onMounted(() => {
                state.cart = JSON.parse(localStorage.getItem('cart') as any)
            })

            //商品总价
            const total = computed(() => {
                return state.cart.reduce((acc, cur) => acc + (cur as any).number * (cur as any).price, 0)
            })

            const onClickLeft = () => history.back();

            return {
                minute,
                second,
                getStore,
                total,
                ...vantRest,
                onClickLeft,
                toOrder
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

    .pay-time {
      height: 80px;
      width: 100%;
      flex-direction: column;

      div:nth-child(1) {
        color: #808080;
      }

      .time {
        letter-spacing: 2px;
        font-size: 26px;
      }
    }

    .order {
      position: relative;
      margin: 0px auto;
      width: 90%;
      box-shadow: 0px 0px 8px rgba(101, 101, 101, 0.1);
      border-radius: 0px 0px 10px 10px;
      background-color: white;

      &-line {
        position: relative;
        background-color: $color-theme;
        width: 92%;
        margin: 0px auto;
        height: 10px;
        border-radius: 4px;
        margin-bottom: -3px;
      }

      &-content {
        height: 100%;
        padding: 10px 15px;

        .text {
          font-size: $font-middle;
          font-weight: 500;
        }
      }

      .line {
        height: 1px;
        background-color: #F2F2F2;
        zoom: 0.5;
      }

      .order-num {
        font-size: $font-middle;
        display: flex;
        justify-content: space-between;
      }
    }

    .pay {
      width: 90%;
      margin: 0px auto;
      box-shadow: 0px 0px 8px rgba(101, 101, 101, 0.1);
      border-radius: 10px;
      padding: 15px 15px;

      .line {
        height: 1px;
        background-color: #F2F2F2;
        zoom: 0.5;
      }

      .right-icon {
        font-size: $font-large;
        color: $color-grey;

        &-active {
          font-size: $font-large;
          color: $color-theme;
        }
      }

    }

    .foot {
      position: fixed;
      bottom: 0px;
      box-shadow: $box-shadow;
      height: 76px;
      width: 100%;

      .flex-center {
        .dec {
          letter-spacing: 0.5px;

          span:nth-child(1) {
            color: $color-theme;

            span {
              color: $color-theme;
              font-size: 10px;
            }
          }

          span:nth-child(2) {
            color: #92d050;

            span {
              color: #92d050;
              font-size: 10px;
            }
          }
        }

      }

      .submit {
        height: 35px;
        width: 90%;
        margin-left: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background-image: linear-gradient(to bottom, #FEBD4A 0%, #fdd486 100%);
        padding: 15px 15px;
        color: white;

        span {
          font-size: $font-middle;
          color: white;
        }
      }
    }
  }
</style>
