<template>
  <div class="home vh-100 w-100">
    <!--打底背景-->
    <div class="linear-bg"></div>
    <!--标题-->
    <div class="flex col-center row-left ml20 h44 f16 title-color">快餐店</div>
    <!--商品彩报-->
    <div class="flex">
      <div class="com-box">
        <div class="hanbao"></div>

      </div>
    </div>

    <div class="flex-center">
      <div class="type-box w145 h160">

      </div>

      <div class="type-box w145 h160 ml21">

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

  .home{
    .linear-bg{
      /* 矩形 3 */
      position: absolute;
      width: 100%;
      height: 538px;
      top: -1px;
      left: 0;
      z-index: -1;
      background: linear-gradient(rgba(254,186,148,255) 0%,rgba(254,191,156,231) 11.494%,rgba(254,195,162,218) 18.391%,rgba(254,200,170,198) 28.506%,rgba(254,208,182,173) 41.21%,rgba(254,218,199,131) 55.172%,rgba(254,230,217,88) 69.885%,rgba(254,236,227,64) 78.161%,rgba(254,243,237,41) 85.977%,rgba(254,250,248,14) 94.713%,rgba(255,255,255,0) 100%);
    }

    .title-color{
      color: #6D3E25;
      font-weight: 300
    }

    .com-box{
      flex: 1;
      height: 260px;
      margin-left: 30px;
      background-image: url("src/assets/images/hanbaos.png");
      background-size: 100% 100%; background-repeat: no-repeat;
      background-position: 0% 0%;
    }
  }
  .notice {
    position: absolute;
    margin-left: auto;
    margin-right: 30px;
  }

  .type-box{
    background: linear-gradient(rgba(254, 189, 74, 0.3) 0%,rgba(255,255,255,0) 100%);
    box-shadow: 0px 4px 4px rgba(255, 239, 230, 0.18);
    border-radius: 16px;
  }
</style>
