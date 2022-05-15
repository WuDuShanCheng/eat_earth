<template>
  <!-- 和 vue-router3 一样，展示路由的组件的地方 -->
  <router-view />
  <NavBar v-if="show" />
</template>

<script lang="ts">
  import NavBar from './components/NavBar.vue';
  import { reactive, toRefs } from 'vue'
  export default {
    name: 'App',
  components: {
      NavBar
  },
    setup() {
      const state = reactive({
        menu: ['/home', '/menu'],
        show: true
})

      return {
        ...toRefs(state)
      }
    }
  }
</script>

<style lang="scss">

</style>
