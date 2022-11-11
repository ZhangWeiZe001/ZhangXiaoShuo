<template>
  <div id="main" ref="mainRGB">
    <Font @mainRGB="mainRGB"></Font>
  </div>
</template>

<script>
import Font from './font.vue'

export default {
 name:'Main',
 components:{Font},
 //不用setup了 直接用methods写方法
 methods:{
  mainRGB(rgb){
    //修改mian的颜色
    this.$refs.mainRGB.style.backgroundColor=rgb;
  }
 }
}
</script>
 
<style scoped>
#main{
    padding: 0 80px;
    padding-top: 5px;
    background-color: rgb(237,231,218);
}

</style>