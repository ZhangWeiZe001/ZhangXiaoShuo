<template>
  <div id="body">
    <Leftmune></Leftmune>
    <!-- 前端路由的位置 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Leftmune from './leftmune.vue';
export default {
    name: "Body",
    components: { Leftmune }
}
</script>

<style scoped>
#body{
 margin: 0 10%;
}
</style>