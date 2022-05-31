<template>
  <div class="home w-100 pb50">
    <van-image src="https://static-shuyi-scrm-w7.shuyi.org.cn/images/1/2022/03/WQg8xJ8GO8TJ7T8S3XtPZxGqFN8dfF.jpg?x-oss-process=image/resize,m_lfit,w_750/quality,q_90" class="h300 w-100"></van-image>
    <div class="content">
      <!--个人信息-->
      <div class="info">
        <div class="head-one">
          <div class="head-content">
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <svg class="icon w59 h20" aria-hidden="true">
              <use xlink:href="#icon-chuangxiangzuanshivip"></use>
            </svg>
            <div class="head-content-text">距<span>V6</span>还差<span>22</span>点经验值
            </div>
          </div>
          <van-progress class="w120 mt10" pivot-text="" :percentage="50" stroke-width="6px"  color="#FEBD4A"/>
          <!-- 通过 class-prefix 指定类名为 my-icon -->
<!--          <svg class="use-icon w60 h60" aria-hidden="true">-->
<!--            <use xlink:href="#icon-icon-test"></use>-->
<!--          </svg>-->
          <img class="use-icon" src="../assets/fracvcmes.gif"/>
        </div>
        <div class="filter-line mt50"></div>
        <div class="head-two mt20">
            <div class="item">
              <span>0</span>
              <span>我的礼劵(张)</span>
            </div>
            <div class="item">
              <span>28</span>
              <span>我的积分</span>
            </div>
            <div class="item">
              <span>0</span>
              <span>钱包余额(元)</span>
            </div>
        </div>
      </div>

      <!--自取 外卖-->
      <div class="type-content">
        <div class="item">
          <svg class="icon w25 h25" aria-hidden="true">
            <use xlink:href="#icon-huiyuanjifen"></use>
          </svg>
          <div class="title mt7">积分商城</div>
        </div>
        <div class="item">
          <svg class="icon w25 h25" aria-hidden="true">
            <use xlink:href="#icon-yinhangka"></use>
          </svg>
          <div class="title mt7">礼品卡兑换</div>
        </div>
        <div class="item">
          <svg class="icon w25 h25" aria-hidden="true">
            <use xlink:href="#icon-youhuiquan"></use>
          </svg>
          <div class="title mt7">礼劵兑换</div>
        </div>
        <div class="item">
          <svg class="icon w25 h25" aria-hidden="true">
            <use xlink:href="#icon-shequ"></use>
          </svg>
          <div class="title mt7">联系客服</div>
        </div>
      </div>


      <!--美食推荐-->
      <div class="food-content">
        <!--内容-->
        <div class="item">
          <van-image src="https://static-shuyi-scrm-w7.shuyi.org.cn/images/1/2022/04/gO0DdCYh000uyOZ0s1QVP1o1DvfDqb.png?x-oss-process=image/resize,m_lfit,w_686/quality,q_90" radius="5px" class="w-100"></van-image>
        </div>

        <!--标题-->
        <div class="title flex row-between mt10">
          <span>互动中心</span>
        </div>

        <div class="flex-center w-100 mt5">
          <div class="item">
            <van-image src="https://static-shuyi-scrm-w7.shuyi.org.cn/images/1/2022/04/j5sgxXx15XqsA7ZTUxzSss5q3WXJDG.png" radius="5px" ></van-image>
          </div>
          <div class="w20"></div>
          <div class="item">
            <van-image src="https://static-shuyi-scrm-w7.shuyi.org.cn/images/1/2022/04/qTuXY1l3T11d5MRvVrvlgDggIA4iTd.jpg" radius="5px"></van-image>
          </div>
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
        justify-content: flex-start;
        flex-direction: column;
        .head-one{
          display: flex;
          flex-direction: column;
          .use-icon{
            position: absolute;
            right: 20px;
            top: -15px;
            width: 60px;
            height: 60px;
            background-color: white;
            border-radius: 40px;
            padding: 3px;
            box-shadow: $box-shadow;
          }
          .head-content {
            display: flex;
            flex: 1;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            color: $color-grey;
            .icon{
              margin-top: 2px;
            }

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
        .head-two{
          display: flex;
          .item{
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            span:nth-child(1){
              font-size: $font-large;
              font-weight: bold;
            }
            span:nth-child(2){
              margin-top: 5px;
              font-size: $font-mini !important;
              font-weight: 200 !important;
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

          .title {
            font-size: $font-mini;
            font-weight: 500;
            zoom: 0.9;
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

        .title{
          font-size: $font-large;
          font-weight: bold;
        }
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
