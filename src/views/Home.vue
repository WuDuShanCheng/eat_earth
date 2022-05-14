<template>
  <div class="home w-100 pb50">
    <van-image src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" class="h300 w-100"></van-image>
    <div class="content">
      <!--个人信息-->
      <div class="info">
        <div class="head-icon">
          <!-- 通过 class-prefix 指定类名为 my-icon -->
          <svg class="icon w45 h45" aria-hidden="true">
            <use xlink:href="#icon-icon-test"></use>
          </svg>
        </div>
        <div class="head-content">
          <!-- 通过 class-prefix 指定类名为 my-icon -->
          <svg class="icon w59 h25" aria-hidden="true">
            <use xlink:href="#icon-chuangxiangzuanshivip"></use>
          </svg>
          <div class="head-content-text">距<span>V6</span>还差<span>3223</span>点经验值
          </div>
        </div>
        <div class="head-end">
          我的积分 28
        </div>
      </div>

      <!--自取 外卖-->
      <div class="type-content">
        <div class="item">
          <svg class="icon w35 h35" aria-hidden="true">
            <use xlink:href="#icon-jiancansushi"></use>
          </svg>
          <div class="title mt5">自取</div>
        </div>
        <div class="item">
          <svg class="icon w35 h35" aria-hidden="true">
            <use xlink:href="#icon-tongchengwaimai"></use>
          </svg>
          <div class="title mt5">外卖</div>
        </div>
      </div>


      <!-- 积分商城 邀请好友 宠物-->
      <div class="action-content">
        <div class="item mr10">
          <div class="title">积分商城</div>
          <div class="des mb25 mt2">兑限量周边</div>
          <svg class="icon w25 h25 item-icon" aria-hidden="true">
            <use xlink:href="#icon-huiyuanjifen"></use>
          </svg>
        </div>
        <div class="item mr10">
          <div class="title">储值有礼</div>
          <div class="des mb25 mt2 ellipsis-1">储值100赠送10元</div>
          <svg class="icon w25 h25 item-icon" aria-hidden="true">
            <use xlink:href="#icon-yinhangka"></use>
          </svg>
        </div>
        <div class="item">
          <div class="title">粉丝星球</div>
          <div class="des mb25 mt2">快乐的交流星</div>
          <svg class="icon w25 h25 item-icon" aria-hidden="true">
            <use xlink:href="#icon-xingqiu"></use>
          </svg>
        </div>
      </div>

      <!--美食推荐-->
      <div class="food-content">
        <!--标题-->
        <div class="flex row-between">
          <span>会员新鲜事</span>
          <div class="row-right">
            <span class="color-border">更多</span>
            <van-icon name="arrow" class="color-border"/>
          </div>
        </div>
        <!--内容-->
        <div class="item">
          <van-image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg" radius="5px" height="120px" class="w-100"></van-image>
          <div class="title">"梅"你不行 | 霸气杨梅清爽回归</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    setup() {

    }
  }
</script>

<style scoped lang="scss">

  .home {


    .content {
      padding: 0 15px;


      .info {
        position: relative;
        margin-top: -40px;
        margin-bottom: 15px;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: $box-shadow;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .head-icon {
          display: flex;
          align-items: center;
        }

        .head-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-left: 10px;
          color: $color-grey;

          &-text {
            display: flex;
            justify-content: flex-start;
            position: relative;
            zoom: 0.9;

            span {
              padding-left: 2px;
              padding-right: 2px;
              color: $color-theme;
            }
          }
        }
      }

      .type-content {
        position: relative;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: $box-shadow;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .item {
          flex: 1;
          display: flex;
          position: relative;
          flex-direction: column;
          align-items: center;

          &:nth-child(1):after {
            content: '';
            position: absolute;
            width: 1px;
            background-color: #ddd;
            right: 0;
            height: 100%;
            transform: scaleX(0.5) scaleY(0.8);
          }

          .title {
            font-size: 15px;
            font-weight: 500;
          }
        }
      }

      .action-content {
        position: relative;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          flex: 1;
          display: flex;
          position: relative;
          align-items: flex-start;
          flex-direction: column;
          padding: 10px;
          box-shadow: $box-shadow;
          border-radius: 5px;

          .des {
            zoom: 0.9;
            color: $color-border;
          }

          .item-icon {
            position: absolute;
            right: 5px;
            bottom: 5px;
          }
        }
      }

      .food-content {
        position: relative;
        margin-bottom: 15px;
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item {
          flex: 1;
          display: flex;
          position: relative;
          align-items: flex-start;
          flex-direction: column;
          margin-top: 5px;
          .title{
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: $white;
            font-weight: bold;
          }
        }
      }
    }


  }


</style>
