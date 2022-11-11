<template>
  <div id="main">
      <FenLei></FenLei>
      <LunBoTu></LunBoTu>  
      <br>
      <Tuijian></Tuijian>
  </div>
</template>

<script>
import FenLei from '@/general/fenlei.vue'
import LunBoTu from './main-vue/lunbotu/lunbotu.vue'
import Tuijian from './main-vue/tuijian/tuijianMain.vue';

export default {
 name:'Main',
 components:{ FenLei, LunBoTu, Tuijian }
}
</script>
 
<style scoped>
#main{
    padding: 0 80px;
    margin-top: 5px;
}

</style>