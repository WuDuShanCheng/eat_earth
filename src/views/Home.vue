<template>
  <div class="home vh-100 w-100">
    <div class="bg"></div>
    <div class="content">
      <div class="info">
        <div class="head-icon">
          <!-- 通过 class-prefix 指定类名为 my-icon -->
          <svg class="icon w50 h50" aria-hidden="true">
            <use xlink:href="#icon-icon-test"></use>
          </svg>
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

    .bg {
      height: 300px;
      width: 100%;
      background-color: #FEBD4A;
    }


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
        .head-icon{
          display: flex;
          align-items: center;
        }
      }
/*      .entrance {
        position: relative;
        margin-top: -80px;
        margin-bottom: 30px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: $box-shadow;
        padding: 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .item {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;

          &:nth-child(1):after {
            content: '';
            position: absolute;
            width: 1px;
            background-color: #ddd;
            right: 0;
            height: 100%;
            transform: scaleX(0.5) scaleY(0.8);
          }

          .icon {
            width: 84px;
            height: 84px;
            margin: 20px;
          }

          .title {
            font-size: 30px;
            color: $text-color-base;
            font-weight: 600;
          }
        }
      }



        .qrcode_section {
          color: $color-primary;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: $font-size-sm;

          image {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
          }
        }
      }


      .navigators {
        margin-bottom: 20px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: $box-shadow;
        padding: 20px;
        display: flex;
        align-items: stretch;

        .left {
          flex: 1;
          margin-right: 20px;
          display: flex;
          padding: 0 20px;
          flex-direction: column;
          font-size: $font-size-sm;
          color: $text-color-base;
          background-color: #F2F2E6;

          .grid {
            height: 50%;
            display: flex;
          }
        }

        .right {
          flex: 1;
          height: 270px;
          display: flex;
          flex-direction: column;

          .tea-activity,
          .member-gifts {
            width: 100%;
            display: flex;
            padding: 20px;
            font-size: $font-size-sm;
            color: $text-color-base;
            align-items: center;
            position: relative;
            box-sizing: border-box;
          }

          .tea-activity {
            align-self: flex-start;
            background-color: #FDF3F2;
            margin-bottom: 20px;
          }

          .member-gifts {
            align-self: flex-end;
            background-color: #FCF6D4;
          }

          .right-img {
            flex: 1;
            position: relative;
            margin-left: 20px;
            margin-right: -20px;
            margin-bottom: -20px;
            display: flex;
            align-items: flex-end;

            image {
              width: 100%;
            }
          }
        }

        .mark-img {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }

        .yzclh-img {
          height: 122.96px;
          width: 214.86px;
        }
      }

      .member-news {
        margin-bottom: 130px;

        .header {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;

          .title {
            font-size: $font-size-lg;
            font-weight: bold;
          }

          .iconfont {
            font-size: 52px;
            color: $text-color-assist;
          }
        }

        .list {
          display: flex;
          flex-direction: column;

          .item {
            position: relative;
            height: 240px;

            .title {
              color: #ffffff;
              font-weight: bold;
              position: absolute;
              left: 20px;
              bottom: 20px;
            }

            image {
              border-radius: 10px;
              height: 100%;
              width: 100%;
            }
          }
        }
      }*/
    }


  }


</style>
