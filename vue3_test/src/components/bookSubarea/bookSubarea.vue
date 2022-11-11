<template>
  <Top></Top>
  <div id="main">
   <FenLei></FenLei>
   <content></content>
  </div>
  
</template>

<script>
import Top from '@/general/top.vue'
import FenLei from '@/general/fenlei.vue';
import Content from './main/content.vue';
export default {
name:'Subarea',
components:{Top,FenLei,Content}
}
</script>

<style scoped>
#main{
    margin: 0 5%;
}
</style>