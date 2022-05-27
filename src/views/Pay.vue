<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/25 23:54
-->
<template>
  <div class="root">
    <van-config-provider :theme-vars="titleVar">
      <van-nav-bar
        left-text="提交订单"
        left-arrow
        @click-left="onClickLeft"
      />
    </van-config-provider>
    <div class="root-content">
      <div class="loc">
        <div class="head">
          <div class="left">
            <div class="title">
              {{getStore.name}}
            </div>
            <div class="des mt5">
              {{getStore.street}}
            </div>
          </div>
          <div class="right">
            <div class="right-content flex-center">
              <svg class="icon w20 h20" aria-hidden="true">
                <use xlink:href="#icon-ditu"></use>
              </svg>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="tel">
            <div class="left">
              预留电话
            </div>
            <div class="center">
              178******21
            </div>
            <div class="right">
              自动填写
            </div>
          </div>
          <div class="time">
            <div class="left">
              自提时间
            </div>
            <div class="center">
              05-25
            </div>
            <div class="right">
              立即取餐
              <van-icon name="arrow" class="ml4"/>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-list mt15">
        <div class="wrapper">
          <div class="item" v-for="(item, index) in cart" :key="index">
            <div class="left">
              <van-image :src="item.image" width="70" height="70" radius="5">

              </van-image>
            </div>
            <div class="center">
              <div>
                <div class="name">{{ item.name }}</div>
                <div class="props" v-show="item.props_text!==undefined">[{{ item.props_text }}]</div>
              </div>
              <div><span>x</span><span class="ml3">{{ item.number }}</span></div>
            </div>
            <div class="right">
              <div class="btn-group">
                <div class="number">
                  ￥<span>{{ item.number * item.price}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-list-bottom">
        <!--优惠券-->
        <div class="item">
          <div class="left flex-center">
            <svg class="icon w17 h17" aria-hidden="true">
              <use xlink:href="#icon-youhui"></use>
            </svg>
          </div>
          <div class="center">
            可用优惠券
          </div>
          <div class="right-theme">
            暂无可用优惠券
            <van-icon name="arrow" class="ml4"/>
          </div>
        </div>
        <div class="filter-line"></div>
        <!--备注-->
        <div class="item">
          <div class="left flex-center">
            <svg class="icon w17 h17" aria-hidden="true">
              <use xlink:href="#icon-beizhu"></use>
            </svg>
          </div>
          <div class="center">
            备注
          </div>
          <div class="right-black">
            口味，偏好等要求
            <van-icon name="arrow" class="ml4"/>
          </div>
        </div>
        <!--小计-->
        <div class="total">
          共{{amount}}件商品，<span>已优惠￥0</span>，小计:<span class="ml5">￥<span>{{total}}</span></span>
        </div>
      </div>

    </div>
    <div class="root-end">
      <div class="content">
        <div class="total">合计<span>￥<span>{{total}}</span></span></div>
        <div class="dec">可获得<span>{{total}}积分<span class="iconfont icon-xingxing"></span></span>+<span>{{total}}成长值<span class="iconfont icon-shu"></span></span></div>
      </div>
      <div class="submit" @click="toPay"><span>提交订单</span></div>
    </div>
  </div>
</template>

<script>
  import {onMounted, reactive, toRefs,computed} from 'vue'
  import {storeToRefs} from "pinia";
  import {useLayoutStore} from "@/store/modules/layout";
  import {useRouter} from "vue-router";

  export default {
    name: "Pay",
    setup() {
      const {getStore} = storeToRefs(useLayoutStore())

      const state = reactive({
        cart: []
      })

      const onClickLeft = () => history.back();
      const vantRest = {
        titleVar: {
          navBarIconColor: '#000000',
          navBarTextColor: '#000000'
        }
      }
      //商品数量
      const amount = computed(()=>{
        return state.cart.reduce((acc, cur) => acc + cur.number, 0)
      })

      //商品总价
      const total = computed(()=>{
        return state.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0)
      })

      const router = useRouter()
      const toPay = () =>{
        router.push('/payTime')
      }

      onMounted(() => {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      })


      return {
        ...toRefs(state),
        onClickLeft,
        ...vantRest,
        amount,
        total,
        getStore,
        toPay
      };
    },
  }
</script>

<style scoped lang="scss">
  .root {
    display: flex;
    flex-direction: column;
    height: 100vh;

    &-content {
      padding: 10px 12px;
      background-color: $pay-bg;
      flex: 1;

      .loc {
        width: 100%;
        padding: 25px 15px 5px 15px;
        border-radius: 10px;
        background-image: linear-gradient(30deg, #ffffff 30%, $menu-content-bg 100%);;
        .head {
          display: flex;
          flex-direction: row;

          .left {
            flex: 1;

            .title {
              letter-spacing: 1px;
              font-size: $font-large;
            }

            .des {
              font-size: $font-mini;
              color: $pay-loc-des;
              letter-spacing: 0.5px;
            }
          }

          .right {
            display: flex;
            align-items: center;
            padding: 0px 20px 0px 35px;

            &-content {
              height: 35px;
              width: 35px;
              border-radius: 20px;
              background-color: white;
            }
          }
        }

        .content {
          margin-top: 20px;

          .tel {
            height: 50px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: $font-middle;

            .left {
              letter-spacing: 0.5px;
              color: $pay-loc-content-left;
              margin-right: 20px;
            }

            .center {
              letter-spacing: 1px;
              flex: 1;
              color: black;
            }

            .right {
              color: $color-theme;
              border: $color-theme 2px solid;
              font-size: $font-mini;
              font-weight: bold;
              letter-spacing: 0.5px;
              padding: 4px 6px;
              border-radius: 20px;
              zoom: 0.8;
            }
          }

          .time {
            height: 50px;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: $font-middle;

            .left {
              letter-spacing: 0.5px;
              color: $pay-loc-content-left;
              margin-right: 20px;
            }

            .center {
              letter-spacing: 1px;
              flex: 1;
              color: black;
            }

            .right {
              color: $pay-loc-content-left;
              letter-spacing: 0.5px;
            }
          }
        }
      }

      .cart-list {
        width: 100%;
        padding: 25px 15px 5px 15px;
        border-radius: 10px 10px 0px 0px;
        background-color: white;

        .wrapper {
          display: flex;
          flex-direction: column;

          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            position: relative;

            .left {

            }

            .center {
              flex: 1;
              height: 70px;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;

              span:nth-child(1) {
                zoom: 0.7;
              }

              span:nth-child(2) {
                font-size: $font-middle;
              }

              .name {
                font-size: $font-mini;
                font-weight: bold;
                color: black;
              }

              .props {
                margin-top: 8px;
                color: $menu-content-tip;
                font-size: $font-mini;
                zoom: 0.8;
                letter-spacing: 1px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

            }

            .right {
              height: 70px;
              display: flex;
              align-items: flex-end;
              justify-content: space-between;

              .btn-group {
                display: flex;
                justify-content: center;
                align-items: center;

                .pro-button {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 10px;
                  background-image: linear-gradient(to bottom, #FEBD4A 0%, #fdd486 100%);
                  padding: 5px 8px;

                  span {
                    font-size: $font-mini;
                    color: white;
                    zoom: 0.75;
                    letter-spacing: 0.5px;
                  }
                }

                .number {
                  font-size: $font-mini;

                  span {
                    font-size: $font-large;
                    font-weight: bold;
                  }
                }
              }

            }
          }
        }
      }

      .cart-list-bottom {
        padding: 0px 15px;
        background-color: white;
        border-radius: 0px 0px 10px 10px;
        margin-bottom: 50px;
        .item {
          height: 50px;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: $font-mini;

          .left {
            letter-spacing: 0.5px;
            color: $pay-loc-content-left;
            margin-right: 12px;
          }

          .center {
            letter-spacing: 1px;
            flex: 1;
            color: black;
          }

          .right-theme {
            color: $color-theme;
            letter-spacing: 0.5px;
          }

          .right-black {
            color: black;
            letter-spacing: 0.5px;
          }
        }

        .total{
          height: 50px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          letter-spacing: 0.5px;
          span:nth-child(1){
            color: #ff6969;
          }
          span:nth-child(2){
            color: black;
            font-size: $font-mini;
            span{
              color: black;
              font-size: $font-large;
              font-weight: bold;
            }
          }
        }
      }

    }

    &-end{
      position: fixed;
      bottom: 0px;
      height: 50px;
      width: 100%;
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .content{
        height: 35px;
        display: flex;
        margin-right: 15px;
        flex-direction: column;
        .total{
          display: flex;
          justify-content: flex-end;
          span{
            margin-left: 5px;
            span{
              font-size: $font-large;
              margin-left: 0px;
            }
          }
        }
        .dec{
          letter-spacing: 0.5px;
          span:nth-child(1){
            color: $color-theme;
            span{
              color: $color-theme;
              font-size: 10px;
            }
          }
          span:nth-child(2){
            color: #92d050;
            span{
              color: #92d050;
              font-size: 10px;
            }
          }
        }
      }
      .submit{
        height: 35px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 30px;
        background-image: linear-gradient(to bottom, #FEBD4A 0%, #fdd486 100%);
        padding: 15px 15px;

        span {
          font-size: $font-middle;
          color: white;
        }
      }
    }
  }

</style>
