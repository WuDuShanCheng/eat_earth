<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/14 19:53
-->
<template>
  <div>
    <van-nav-bar title="浩子来点餐"/>
    <div class="nav">
      <div class="header">
        <div class="left" v-if="getOrderType == 'takein'">
          <div class="store-name ellipsis-1">
            <van-icon name="star-o" class="f16 mr5 f-theme"/>
            <text>{{ getStore.name }}</text>
            <van-icon name="arrow" class="f6 ml5"/>
          </div>
          <div class="store-location mt5">
            <div class="color-border">距离您</div>
            <div class="ml5">{{ getStore.distance_text }}</div>
          </div>
        </div>

        <div class="right">
          <van-button hairline :color="[getOrderType == 'takein'?'#BBBBBB':'#F2F2F2']" size="mini"
                      :class="[getOrderType == 'takein'?'active':'no-active']"><span>自取</span></van-button>
          <van-button hairline :color="[getOrderType == 'takeout'?'#BBBBBB':'#F2F2F2']" size="mini"
                      :class="[getOrderType == 'takeout'?'active':'no-active']"><span>外卖</span></van-button>
        </div>
      </div>
      <van-notice-bar mode="link" class="h20 mt10"><span style="zoom: 0.85">"霸气mini卡"超级购券活动，赶紧去购买</span>
      </van-notice-bar>
    </div>
    <van-sticky>
      <van-tabs v-model:active="menuType" color="#FEBD4A">
        <van-tab title="🍧经典菜单">
          <!--侧边栏-->
          <div class="class_menu mt10 pt10">
            <div class="menu-slide vh-100">
              <van-sidebar v-model="navIndex">
                <div v-for="(item, index) in goods" :key="index">
                  <van-sidebar-item class="item-radius" :title="item.name"/>
                </div>
              </van-sidebar>
            </div>
            <div class="menu-goods">
              <!--轮播图-->
              <van-swipe class="ads" :autoplay="3000">
                <van-swipe-item v-for="(item,index) in ads" :key="index">
                  <van-image :src="item.image" fit="cover">
                  </van-image>
                </van-swipe-item>
              </van-swipe>
              <!--商品-->
              <div class="list">
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
<!--                      <div class="right">-->
<!--                        <text class="name">{{ good.name }}</text>-->
<!--                        <text class="tips">{{ good.content }}</text>-->
<!--                        <div class="price_and_action">-->
<!--                          <text class="price">￥{{ good.price }}</text>-->
<!--                          <div class="btn-group" v-if="good.use_property">-->
<!--                            <button type="primary" class="btn property_btn" hover-class="none"-->
<!--                                    size="mini" @tap="showGoodDetailModal(item, good)">-->
<!--                              选规格-->
<!--                            </button>-->
<!--                          </div>-->
<!--                          <div class="btn-group" v-else>-->
<!--                            <button type="default" v-show="goodCartNum(good.id)" plain-->
<!--                                    class="btn reduce_btn" size="mini" hover-class="none"-->
<!--                                    @tap="handleReduceFromCart(item, good)">-->
<!--                              <div class="iconfont iconsami-select"></div>-->
<!--                            </button>-->
<!--                            <div class="number" v-show="goodCartNum(good.id)">-->
<!--                              {{ goodCartNum(good.id) }}-->
<!--                            </div>-->
<!--                            <button type="primary" class="btn add_btn" size="min"-->
<!--                                    hover-class="none" @tap="handleAddToCart(item, good, 1)">-->
<!--                              <div class="iconfont iconadd-select"></div>-->
<!--                            </button>-->
<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->
                    </div>
                    <!-- 商品 end -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="🧀人气菜单"></van-tab>
      </van-tabs>
    </van-sticky>

  </div>
</template>

<script lang="ts">
    import {useLayoutStore} from '@/store/modules/layout'
    import {reactive, toRefs, onBeforeMount, ref, getCurrentInstance} from 'vue'

    export default {
        name: "Menu",
        setup() {
            const {proxy} = getCurrentInstance() as any
            const {getOrderType, updateName, getStore} = useLayoutStore()

            const state = reactive({
                //菜单类型 经典菜单 or 人气推荐
                menuType: 0,
                //导航页索引
                navIndex: 0,
                //商品信息
                goods: {},
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
                ],
            })
            //初始化方法 获取商城信息
            onBeforeMount(async () => {
                await updateName()
                state.goods = await proxy.$api('goods') as any
                console.log(state.goods)
            })
            return {
                ...toRefs(state),
                getOrderType,
                getStore,
                updateName
            }
        }
    }
</script>

<style scoped lang="scss">
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
      height: 100vh;
      flex: 1;
      margin-left: 5px;
      margin-right: 5px;
      overflow-y: scroll;

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

          .items{
            display: flex;
            flex-direction: column;
            .good {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
</style>
