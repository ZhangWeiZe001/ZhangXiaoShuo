<template>
  <div id="home">
    <Top></Top>
    <Main></Main>
  </div>
</template>

<script>
import Main from './main.vue'
import Top from '@/general/top.vue';

export default {
name:'Home',
components:{Main,Top}
}
</script>

<style>
 
</style>