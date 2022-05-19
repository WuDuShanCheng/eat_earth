<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/14 19:53
-->
<template>
  <div>
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
            <!--侧边栏-->
            <div class="class_menu mt10 pt10">
              <div class="menu-slide vh-100">
                <van-sidebar v-model="navIndex">
                  <div v-for="(item, index) in goods" :key="index">
                    <van-sidebar-item class="item-radius" :title="item.name" @click="scrollTo(index)"/>
                  </div>
                </van-sidebar>
              </div>
              <div id="goodScroll" style="flex: 1;overflow:hidden;height: 100vh ">
                <div class="menu-goods" >
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
                                <div class="pro-button">
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

  </div>
</template>

<script lang="ts">
    import {useLayoutStore} from '@/store/modules/layout'
    import {computed, getCurrentInstance, nextTick, onMounted, reactive, toRefs} from 'vue'
    import Bscroll from 'better-scroll'

    export default {
        name: "Menu",
        setup: function () {
            const {proxy} = getCurrentInstance() as any
            const {getOrderType, updateName, getStore} = useLayoutStore()

            const state = reactive({
                //菜单类型 经典菜单 or 人气推荐
                menuType: 0,
                //导航页索引
                navIndex: 0,
                //商品信息
                goods: {},
                //购物车
                cart: [] as any,
                //右边下拉索引
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
           const calculateMItemHeight=()=> {
                //初始高度
               let height = (document.querySelector(`.ads`) as any).offsetHeight

               let frist :boolean = true
               for (const item of state.goods as any) {
                   let view = document.querySelector(`#cate-${item.id}`) as any
                   //第一个控件
                   if (frist==true){
                       frist=false
                       item['top']= 0
                       height += view.offsetHeight
                       item['bottom'] = height
                   }else{
                       item['top']= height
                       height += view.offsetHeight
                       item['bottom'] = height
                   }
               }

            }

            let bscroll:any = null
            //点击侧边菜单
            const scrollTo=(index:number)=>{
                const goods = state.goods as [];
                const {id} = goods[index];
                (bscroll as any).scrollToElement(document.querySelector(`#cate-${id}`))
            }

            onMounted(async () => {
                //初始化方法 获取商城信息
                await updateName()
                state.goods = await proxy.$api('goods')
                await nextTick(async () => {
                    bscroll = new Bscroll(document.querySelector('#goodScroll') as any , {
                        scrollY:true,
                        click:true,
                        probeType: 3,
                        mouseWheel:true
                    })

                    //滑动回调
                    bscroll.on('scroll', (node :any) => {
                        let scrollNumber = - node.y
                        let tabs = (state.goods as any).filter((item: { top: number }) => item.top <= scrollNumber)
                        state.navIndex = tabs.length -1
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
                scrollTo,
                getOrderType,
                getStore,
                updateName
            }
        }
    }
</script>

<style scoped lang="scss">
  :root {
    //菜单页
    --van-button-mini-height: 19px !important;
    --van-notice-bar-icon-size: 10px !important;
    --van-tabbar-z-index: 100 !important;
    --van-background-color: #f6f6f6 !important;
    --van-sidebar-selected-border-color: #{$color-theme} !important;
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
