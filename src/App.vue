<template>
  <!-- 和 vue-router3 一样，展示路由的组件的地方 -->
  <router-view/>
  <div id="popup-detail" class="fixed"></div>
  <div id="popup-card" class="fixed"></div>
  <NavBar v-if="show"/>
</template>

<script lang='ts'>
    // @ts-ignore
    import NavBar from '@/components/NavBar.vue';
    import {reactive, toRefs} from 'vue'

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
