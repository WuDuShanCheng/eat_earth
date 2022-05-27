<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/14 19:53
-->
<template>
  <div class="menu-root">
    <van-nav-bar title="浩子来点餐"/>
    <div class="nav">
      <van-config-provider :theme-vars="headVar">
        <div class="header">
          <div class="left" v-if="getOrderType == 'takein'">
            <div class="store-name ellipsis-1">
              <van-icon name="star-o" class="f16 mr5 f-theme"/>
              <span>{{ getStore.name }}</span>
              <van-icon name="arrow" class="f6 ml5"/>
            </div>
            <div class="store-location mt5">
              <div class="color-border">距离您</div>
              <div class="ml5">{{ getStore.distance_text }}</div>
            </div>
          </div>

          <div class="right">
            <van-button hairline :color="(getOrderType == 'takein'?'#BBBBBB':'#F2F2F2')" size="mini"
                        :class="[getOrderType == 'takein'?'active':'no-active']"><span>自取</span></van-button>
            <van-button hairline :color="(getOrderType == 'takeout'?'#BBBBBB':'#F2F2F2')" size="mini"
                        :class="[getOrderType == 'takeout'?'active':'no-active']"><span>外卖</span></van-button>
          </div>
        </div>
        <van-notice-bar mode="link" class="h20 mt10"><span style="zoom: 0.85">"霸气mini卡"超级购券活动，赶紧去购买</span>
        </van-notice-bar>
      </van-config-provider>
    </div>
    <van-sticky>
      <van-config-provider :theme-vars="contentVar">
        <van-tabs v-model:active="menuType" color="#FEBD4A">
          <van-tab title="🍧经典菜单">
            <div class="class_menu mt10 pt10">
              <!--侧边栏-->
              <div class="menu-slide">
                <van-sidebar v-model="navIndex">
                  <div v-for="(item, index) in goods" :key="index">
                    <van-sidebar-item class="item-radius" :title="item.name" @click="scrollTo(index)"/>
                  </div>
                </van-sidebar>
              </div>
              <div id="goodScroll" style="flex: 1;overflow:hidden;height: 90vh ">
                <div class="menu-goods">
                  <!--轮播图-->
                  <van-swipe class="ads" :autoplay="3000">
                    <van-swipe-item v-for="(item,index) in ads" :key="index">
                      <van-image :src="item.image" fit="cover">
                      </van-image>
                    </van-swipe-item>
                  </van-swipe>
                  <!--商品-->
                  <div class="list" id="good-list">
                    <!-- category begin -->
                    <div class="category" v-for="(item, index) in goods" :key="index" :id="`cate-${item.id}`">
                      <div class="title">
                        <span>{{ item.name }}</span>

                        <van-image
                          class="ml3"
                          v-if="item.icon!==''"
                          width="13px"
                          height="13px"
                          fit="contain"
                          :src="item.icon"
                        />
                      </div>
                      <div class="items">
                        <!-- 商品 begin -->
                        <div class="good mb10" v-for="(good, key) in item.goods_list" :key="key">
                          <van-image fit="cover" :src="good.images" height="100px" width="100px" radius="5px">
                          </van-image>
                          <div class="right">
                            <span class="name">{{ good.name }}</span>
                            <span class="tips ellipsis-2">{{ good.content }}</span>
                            <div class="price_and_action">
                              <span class="price"><span>￥</span><span>{{ good.price }}</span></span>
                              <div class="btn-group" v-if="good.use_property">
                                <div class="pro-button" @click="showGoodDetailModal(item, good)">
                                  <span>选规格</span>
                                </div>
                              </div>
                              <div class="btn-group" v-else>
                                <div class="class-button-minus" v-show="goodCartNum(good.id)"
                                     @click="handleReduceFromCart(item,good)">
                                  <van-icon name="minus" class="class-button-minus-icon"/>
                                </div>
                                <div class="number" v-show="goodCartNum(good.id)">
                                  {{ goodCartNum(good.id) }}
                                </div>
                                <div class="class-button-add" @click="handleAddFromCart(item,good)">
                                  <van-icon name="plus" class="class-button-add-icon"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- 商品 end -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="🧀人气菜单"></van-tab>
        </van-tabs>
      </van-config-provider>
    </van-sticky>
    <!--选规格-->
    <van-popup v-model:show="popupShow" teleport="#popup-detail" position="bottom" round
               :style="{ height: '85%',overflowY:'scroll' }">
      <van-swipe class="popup-head" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div v-for="(item,index) in good.imageArr" :key="index" class="flex">
            <van-image :src="item" width="100%" height="170px" fit="scale-down"></van-image>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="popup-content">
        <div class="basic">
          <div class="name">{{ good.name }}</div>
          <div class="tip">{{ good.content }}</div>
        </div>

        <div class="properties" v-if="good.use_property">
          <div class="property" v-for="(item, index) in good.property" :key="index">
            <div class="title">
              <div class="name">{{ item.name }}</div>
              <div class="desc ml5" v-if="item.desc">({{ item.desc }})</div>
            </div>
            <div class="values">
              <div class="value" v-for="(value, key) in item.values" :key="key"
                   :class="{'default': value.is_default}" @click="changePropertyDefault(index, key)">
                {{ value.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--加入购物车-->
      <div class="popup-card">
        <div class="btn-group">
          <div class="class-button-minus" @click="handlePropertyReduce">
            <van-icon name="minus" class="class-button-minus-icon"/>
          </div>
          <div class="number">
            {{ good.number }}
          </div>
          <div class="class-button-add" @click="handlePropertyAdd">
            <van-icon name="plus" class="class-button-add-icon"/>
          </div>
        </div>
        <div class="add-to-cart-btn" @click="handleAddToCartInModal">
          <div>￥<span class="money">{{good.price * good.number }}</span></div>
          <div>加入购物车</div>
        </div>
      </div>
    </van-popup>
    <!-- 商品详情模态框 end -->
    <!-- 购物车详情popup -->
    <div class="cart-box" v-if="cart.length > 0 && popupShow==false">
      <div class="mark">
        <div class="head-content" @click="openCartPopup">
          <svg class="icon w60 h60 mb20" aria-hidden="true">
            <use xlink:href="#icon-naichaxiaochi"></use>
          </svg>
          <div class="tag">{{ getCartGoodsNumber() }}</div>
        </div>
        <div class="price">￥<span>{{ getCartGoodsPrice() }}</span></div>
      </div>
      <button class="pay-btn" @click="toPay" :disabled="disabledPay()">
        {{ disabledPay() ? `差${spread}元起送` : '去结算' }}
      </button>
    </div>

    <van-popup v-model:show="cartPopupVisible" teleport="#popup-card" position="bottom" round
               :style="{ maxHeight: '85%',overflowY:'hidden'}">
      <div class="cart-popup">
        <div class="top">
          本单预计可获得<span>{{ getCartGoodsPrice() }}</span>积分 + <span>{{ getCartGoodsPrice() }}</span> 成长值
        </div>
        <div class="head">
          <div class="left">自取订单</div>
          <div class="right">
            <svg class="icon w18 h18" aria-hidden="true">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
            <span class="ml3" @click="handleCartClear">清空</span>
          </div>
        </div>
        <div class="cart-list">
          <div class="wrapper">
            <div class="item" v-for="(item, index) in cart" :key="index">
              <div class="left">
                <van-image :src="item.image" width="70" height="70" radius="5">

                </van-image>
              </div>
              <div class="center">
                <div>
                  <div class="name">{{ item.name }}</div>
                  <div class="props">{{ item.props_text }}</div>
                </div>
                <div><span>￥</span><span>{{ item.price }}</span></div>
              </div>
              <div class="right">
                <div class="btn-group">
                  <div class="class-button-minus" @click="handleCartItemReduce(index)">
                    <van-icon name="minus" class="class-button-minus-icon"/>
                  </div>
                  <div class="number">
                    {{ item.number }}
                  </div>
                  <div class="class-button-add" @click="handleCartItemAdd(index)">
                    <van-icon name="plus" class="class-button-add-icon"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </van-popup>

  </div>
</template>

<script lang="ts">
    import {useLayoutStore} from '@/store/modules/layout'
    import {computed, getCurrentInstance, nextTick, onMounted, reactive, toRefs} from 'vue'
    import { storeToRefs } from 'pinia';
    import Bscroll from 'better-scroll'
    import {Dialog,Notify} from "vant";
    import { useRouter } from 'vue-router'

    export default {
        name: "Menu",
        // components: {GoodPopup},
        setup: function () {
            const {proxy} = getCurrentInstance() as any
            const {getOrderType, getStore ,isLogin} = storeToRefs(useLayoutStore())
            const {updateName} = useLayoutStore()
            const state = reactive({
                //菜单类型 经典菜单 or 人气推荐
                menuType: 0,
                //导航页索引
                navIndex: 0,
                //商品信息
                goods: {},
                //购物车
                cart: [] as any,
                //选择商品规格
                popupShow: false,
                //物车列表
                cartPopupVisible: false,
                //当前饮品
                good: {},
                //当前饮品所在分类
                category: {},
                //广告栏
                ads: [
                    {
                        image: 'https://images.qmai.cn/s23107/2020/05/08/c25de6ef72d2890630.png?imageView2/2/w/600/h/600'
                    },
                    {
                        image: 'https://img-shop.qmimg.cn/s23107/2020/04/10/add546c1b1561f880d.jpg?imageView2/2/w/600/h/600'
                    },
                    {
                        image: 'https://images.qmai.cn/s23107/2020/04/30/b3af19e0de8ed42f61.jpg?imageView2/2/w/600/h/600'
                    },
                    {
                        image: 'https://img-shop.qmimg.cn/s23107/2020/04/17/8aeb78516d63864420.jpg?imageView2/2/w/600/h/600'
                    }
                ]
            })
            const vantRest = {
                headVar: {
                    buttonMiniHeight: '19px',
                    noticeBarIconSize: '10px'
                },
                contentVar: {
                    backgroundColor: '#f6f6f6',
                    sidebarSelectedBorderColor: '#FEBD4A'
                }
            }
            //计算单个饮品添加到购物车的数量
            const goodCartNum = computed(() => {
                return (id: any) => state.cart.reduce((acc: any, cur: any) => {
                    if (cur.id === id) {
                        return acc += cur.number
                    }
                    return acc
                }, 0)
            })
            //删除商品
            const handleReduceFromCart = (item: any, good: any) => {
                const index = state.cart.findIndex((item: any) => item.id === good.id)
                state.cart[index].number -= 1
                if (state.cart[index].number <= 0) {
                    state.cart.splice(index, 1)
                }
            }
            //添加商品
            const handleAddFromCart = (cate: any, good: any, num: number = 1) => {
                const index = state.cart.findIndex((item: any) => {
                    if (good.use_property) {
                        return (item.id === good.id) && (item.props_text === good.props_text)
                    } else {
                        return item.id === good.id
                    }
                })
                if (index > -1) {
                    state.cart[index].number += num as number
                } else {
                    state.cart.push({
                        id: good.id,
                        cate_id: cate.id,
                        name: good.name,
                        price: good.price,
                        number: num,
                        image: good.images,
                        use_property: good.use_property,
                        props_text: good.props_text,
                        props: good.props
                    })
                }
            }
            //计算商品高度
            const calculateMItemHeight = () => {
                //初始高度
                let height = (document.querySelector(`.ads`) as any).offsetHeight

                let frist: boolean = true
                for (const item of state.goods as any) {
                    let view = document.querySelector(`#cate-${item.id}`) as any
                    //第一个控件
                    if (frist == true) {
                        frist = false
                        item['top'] = 0
                        height += view.offsetHeight
                        item['bottom'] = height
                    } else {
                        item['top'] = height
                        height += view.offsetHeight
                        item['bottom'] = height
                    }
                }

            }
            //滑动控件
            let bscroll: any = null
            //点击侧边菜单
            const scrollTo = (index: number) => {
                const goods = state.goods as [];
                const {id} = goods[index];
                (bscroll as any).scrollToElement(document.querySelector(`#cate-${id}`))
            }

            //展示商品详细弹框
            const showGoodDetailModal = (item: any, good: any) => {
                state.good = JSON.parse(JSON.stringify({
                    ...good,
                    number: 1
                })) as any
                state.category = JSON.parse(JSON.stringify(item))
                state.popupShow = true
            }

            //购物车减
            const handlePropertyReduce = () => {
                if ((state.good as any).number === 1) return
                (state.good as any).number -= 1
            }

            //购物车加
            const handlePropertyAdd = () => {
                (state.good as any).number += 1
            }

            //加入购物车
            const handleAddToCartInModal = () => {
                const product = Object.assign({}, state.good, {
                    props_text: getGoodSelectedProps(state.good),
                    props: getGoodSelectedProps(state.good, 'id')
                })
                handleAddToCart(state.category, product, (state.good as any).number)
                closeGoodDetailModal()
            }

            //关闭饮品详情模态框
            const closeGoodDetailModal = () => {
                state.popupShow = false
                setTimeout(() => initGoodDetailData() as any, 1000)
            }

            const initGoodDetailData = () => {
                console.log('timeout')
                state.category = {}
                state.good = {}
            }

            //添加到购物车
            const handleAddToCart = (cate: any, good: any, num: any) => {
                const index = state.cart.findIndex((item: any) => {
                    if (good.use_property) {
                        return (item.id === good.id) && (item.props_text === good.props_text)
                    } else {
                        return item.id === good.id
                    }
                })
                if (index > -1) {
                    state.cart[index].number += num
                } else {
                    state.cart.push({
                        id: good.id,
                        cate_id: cate.id,
                        name: good.name,
                        price: good.price,
                        number: num,
                        image: good.images,
                        use_property: good.use_property,
                        props_text: good.props_text,
                        props: good.props
                    })
                }
            }

            //计算当前饮品所选属性
            const getGoodSelectedProps = (good: any, type = 'text') => {
                if (good.use_property) {
                    let props: any[] = []
                    good.property.forEach(({values}: any) => {
                        values.forEach((value: any) => {
                            if (value.is_default) {
                                props.push(type === 'text' ? value.value : value.id)
                            }
                        })
                    })
                    return type === 'text' ? props.join('，') : props
                }
                return ''
            }

            //改变默认属性值
            const changePropertyDefault = (index: any, key: any) => {
                (state.good as any).property[index].values.forEach((value: any) => value.is_default = 0);
                ((state.good as any).property[index].values[key] as any).is_default = 1;
                (state.good as any).number = 1
            }

            //计算购物车总数
            const getCartGoodsNumber = () => {
                return state.cart.reduce((acc: any, cur: any) => acc + cur.number, 0)
            }

            //计算购物车总价
            const getCartGoodsPrice = () => {
                return state.cart.reduce((acc: any, cur: any) => acc + cur.number * cur.price, 0)
            }

            //是否达到起送价`
            const disabledPay = () => {
                return getOrderType.value == 'takeout' && (getCartGoodsPrice() < (getStore as any).min_price) ? true : false
            }

            //打开/关闭购物车列表popup
            const openCartPopup = () => {
                state.cartPopupVisible = !state.cartPopupVisible
            }


            const handleCartClear =()=> {	//清空购物车
                Dialog.confirm({
                    message: '确认删除吗',
                    confirmButtonColor:'#FEBD4A'
                })
                    .then(() => {
                        // on confirm
                        state.cartPopupVisible = false
                        state.cart = []
                    })
                    .catch(() => {
                        // on cancel
                    });
            }


            const handleCartItemReduce =(index:any)=> {
                if(state.cart[index].number === 1) {
                    state.cart.splice(index, 1)
                } else {
                    state.cart[index].number -= 1
                }
                if(!state.cart.length) {
                    state.cartPopupVisible = false
                }
            }

            const handleCartItemAdd =(index:any)=> {
                state.cart[index].number += 1
            }

            const router = useRouter()
            const toPay =()=> {
                if(!isLogin) {
                    Notify({ type: 'primary', message: '需要登录' });
                    return
                }
                router.push('/pay')
                localStorage.setItem('cart',JSON.stringify(state.cart))
            }

            onMounted(async () => {
                //初始化方法 获取商城信息
                await updateName()
                state.goods = await proxy.$api('goods')
                await nextTick(async () => {
                    bscroll = new Bscroll(document.querySelector('#goodScroll') as any, {
                        scrollY: true,
                        click: true,
                        probeType: 3,
                        mouseWheel: true
                    })

                    //滑动回调
                    bscroll.on('scroll', (node: any) => {
                        let scrollNumber = -node.y
                        let tabs = (state.goods as any).filter((item: { top: number }) => item.top <= scrollNumber)
                        state.navIndex = tabs.length - 1
                    })

                    //计算每个菜单的高度
                    calculateMItemHeight()
                })

            })

            return {
                ...toRefs(state),
                ...vantRest,
                handleReduceFromCart,
                goodCartNum,
                handleAddFromCart,
                showGoodDetailModal,
                handlePropertyReduce,
                handlePropertyAdd,
                handleAddToCartInModal,
                handleAddToCart,
                getGoodSelectedProps,
                changePropertyDefault,
                getCartGoodsNumber,
                getCartGoodsPrice,
                initGoodDetailData,
                handleCartClear,
                handleCartItemReduce,
                handleCartItemAdd,
                openCartPopup,
                disabledPay,
                toPay,
                scrollTo,
                getOrderType,
                getStore,
                updateName
            }
        }
    }
</script>

<style scoped lang="scss">
  .cart-box {
    position: fixed;
    bottom: 60px;
    left: 15px;
    right: 15px;
    height: 48px;
    border-radius: 24px;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2000;

    .mark {
      padding-left: 10px;
      margin-right: 15px;
      position: relative;
      display: flex;

      .head-content {
        position: relative;

        .tag {
          background-color: $menu-card-tip;
          color: $text-color-white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $font-size-sm;
          position: absolute;
          right: 0px;
          top: 10px;
          border-radius: 100%;
          padding: 2px;
          width: 20px;
          height: 20px;
          opacity: 0.9;
        }
      }

      .price {
        flex: 1;
        margin-top: 10px;
        margin-left: 15px;
        color: black;
        align-self: center;
        line-height: 30px;

        span {
          margin-left: 2px;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }

    .pay-btn {
      height: 100%;
      color: #FFFFFF;
      padding: 0px 18px;
      border-radius: 0 50px 50px 0;
      display: flex;
      align-items: center;
      font-size: $font-middle;
      border-width: 0px;
      background-image: linear-gradient(to bottom, #FEBD4A 0%, #fdd486 100%);
    }
  }

  :root {
    //菜单页
    --van-button-mini-height: 19px !important;
    --van-notice-bar-icon-size: 10px !important;
    --van-tabbar-z-index: 100 !important;
    --van-background-color: #f6f6f6 !important;
    --van-sidebar-selected-border-color: #{$color-theme} !important;
  }

  .popup-head .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
  }

  .popup-content {
    padding: 15px 20px;
    margin-bottom: calc(var(--van-tabbar-height) + 90px);

    .basic {
      padding-bottom: 10px;

      .name {
        font-size: $font-middle;
        font-weight: bold;
        letter-spacing: 0.5px;
        color: black;
        margin-bottom: 15px;
      }

      .tip {
        font-size: $font-mini;
        color: $menu-popup-tip;
        letter-spacing: 0.3px;
      }
    }

    .properties {
      padding-top: 10px;

      .property {
        .title {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 10px;

          .name {
            display: flex;
            align-items: center;
            font-size: $font-mini;
            color: black;
            font-weight: bold;

            &:nth-child(1):after {
              content: '必选';
              color: white;
              padding: 3px;
              position: relative;
              margin-left: 4px;
              background-color: $color-theme;
              border-top-left-radius: 50px;
              border-top-right-radius: 50px;
              border-bottom-right-radius: 50px;
              zoom: 0.7;
              width: 25px;
            }
          }

          .desc {
            flex: 1;
            font-size: $font-mini;
            color: $color-theme;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            zoom: 0.9;
          }
        }

        .values {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          .value {
            border-radius: 4px;
            background-color: $menu-content-bg;
            color: $text-color-assist;
            padding: 8px 15px;
            font-size: $font-mini;
            margin-right: 8px;
            margin-bottom: 8px;

            &.default {
              background-color: $color-theme;
              color: $text-color-white;
            }
          }
        }
      }
    }
  }

  .popup-card {
    width: 100%;
    height: 90px;
    position: fixed;
    bottom: var(--van-tabbar-height);
    box-shadow: $box-shadow;
    background-color: white;

    .btn-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      margin-right: 10px;
      margin-top: 10px;

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

      .class-button {
        &-minus {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3px;
          border-radius: 30px;
          border: $color-border 1px solid;

          &-icon {
            font-size: $font-mini;
            color: $color-border;
          }
        }

        &-add {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3px;
          color: white;
          border-radius: 30px;
          background-image: linear-gradient(to bottom, #FEBD4A 0%, #fddb9a 100%);

          &-icon {
            font-size: $font-mini;
            color: white;
          }
        }
      }

      .number {
        padding: 0px 10px;
      }
    }

    .add-to-cart-btn {
      .money {
        font-size: 18px;
        margin-right: 5px;
        font-weight: bold
      }

      height: 40px;
      width: 80%;
      margin-left: 10%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $color-theme;
      color: $text-color-white;
      font-size: $font-mini;
      border-radius: 50px
    }
  }

  .cart-popup {
    position: relative;

    .top {
      position: relative;
      width: 100%;
      background-color: #fef7ea;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: $color-theme;
        font-size: $font-large;
        font-weight: 600;
        margin: 0px 3px;
      }
    }

    .head {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: white;

      .left {
        border: $color-theme 1px solid;
        font-size: $font-mini;
        color: $color-theme;
        background-color: #fef7ea;
        padding: 3px;
        zoom: 0.8;
      }

      .right {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $color-border;
      }
    }

    .cart-list {

      .wrapper {
        max-height: 350px;
        display: flex;
        flex-direction: column;
        padding: 0 15px;
        margin-bottom: calc(var(--van-tabbar-height) + 80px);
        overflow-y: scroll;

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
            span:nth-child(1){
              zoom: 0.7;
            }
            span:nth-child(2){
              font-size: $font-middle;
              font-weight: bold;
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
              zoom: 0.7;
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

              .class-button {
                &-minus {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 4px;
                  border-radius: 30px;
                  border: $color-border 1px solid;

                  &-icon {
                    font-size: $font-middle;
                    color: $color-border;
                  }
                }

                &-add {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 4px;
                  color: white;
                  border-radius: 30px;
                  background-image: linear-gradient(to bottom, #FEBD4A 0%, #fddb9a 100%);

                  &-icon {
                    font-size: $font-middle;
                    color: white;
                  }
                }
              }

              .number {
                padding: 0px 8px;
              }
            }

          }
        }
      }
    }
  }

  .nav {
    padding: 10px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        flex-direction: column;

        .store-name {
          font-weight: inherit;
          font-size: 14px;
        }

        .store-location {
          div {
            display: inline-block;
            font-size: 8px;
            zoom: 0.9;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        background-color: $menu-right-bg;
        width: 90px;
        border-radius: 4px;
        padding: 3.5px;

        .no-active {
          flex: 1;
          color: $menu-right-active-txt !important;
        }

        .active {
          flex: 1
        }

        span {
          zoom: 0.8;
        }
      }
    }
  }

  .class_menu {
    width: 100%;
    display: flex;
    background-color: $menu-content-bg;

    .menu-slide {
      overflow-y: scroll;
      height: 90vh;
      .item-radius {
        border-top-right-radius: 15px;
      }
    }

    .menu-goods {
      flex: 1;
      margin-left: 5px;
      margin-right: 5px;
      /*overflow-y: scroll;*/

      .ads {
        width: 100%;
        height: 150px;
        border-radius: 10px;
      }

      .list {
        width: 100%;
        font-size: $font-middle;
        padding-bottom: 70px;
        background-color: $white;
        padding-left: 10px;
        padding-right: 10px;

        .category {
          width: 100%;

          .title {
            padding: 15px 0;
            display: flex;
            align-items: center;
            color: $text-color-base;
          }

          .items {
            display: flex;
            flex-direction: column;

            .good {
              display: flex;
              align-items: center;

              .right {
                flex: 1;
                height: 100px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 10px;

                .name {
                  font-weight: bold;
                  font-size: $font-middle;
                }

                .tips {
                  margin-top: 5px;
                  color: $menu-content-tip;
                  font-size: $font-mini;
                  letter-spacing: 0.3px;
                  zoom: 0.95;
                }

                .price_and_action {
                  width: 100%;
                  display: flex;
                  margin-top: auto;
                  margin-bottom: 5px;
                  justify-content: space-between;
                  align-items: center;
                  justify-self: flex-end;

                  .price {
                    font-weight: 600;
                    font-size: $font-large;

                    span {
                      &:nth-child(1) {
                        font-size: $font-mini;
                        zoom: 0.6;
                      }

                      &:nth-child(2) {
                        margin-left: 3px;
                        letter-spacing: 0.5px
                      }
                    }
                  }

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

                    .class-button {
                      &-minus {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 3px;
                        border-radius: 30px;
                        border: $color-border 1px solid;

                        &-icon {
                          font-size: $font-mini;
                          color: $color-border;
                        }
                      }

                      &-add {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 3px;
                        color: white;
                        border-radius: 30px;
                        background-image: linear-gradient(to bottom, #FEBD4A 0%, #fddb9a 100%);

                        &-icon {
                          font-size: $font-mini;
                          color: white;
                        }
                      }
                    }

                    .number {
                      padding: 0px 5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
