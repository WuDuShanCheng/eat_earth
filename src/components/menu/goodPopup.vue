<!--
 * @Description:
 * @Autor: ZhiHao
 * @Date: 2022/5/20 8:13
-->
<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: "goodPopup",
    setup(props) {
      console.log(props) // { msg1:"这是传给子组件的信息1", msg2:"这是传给子组件的信息2" }
    }
  }
</script>

<style scoped lang="scss">
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
