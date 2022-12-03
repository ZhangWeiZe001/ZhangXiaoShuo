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
 //注:这里不能用 setup 因为 setup是在 beforeCreate 之前 连模板都没有解析 所以拿不到 ref元素 
 //所以使用 直接用methods写方法
 methods:{
  mainRGB(rgb){
    //修改mian的颜色
    this.$refs.mainRGB.style.backgroundColor=rgb;
    //将数据背景颜色数据拿到并且 并将新的 颜色上传到本地储存
    let SheBox = JSON.parse(localStorage.getItem('SheBox'))
    SheBox.background = rgb;
    SheBox = JSON.stringify(SheBox);
    localStorage.setItem('SheBox',SheBox)
  }
 },
 //挂载完毕生命周期
 mounted(){
  let background = JSON.parse(localStorage.getItem('SheBox')).background
  this.$refs.mainRGB.style.backgroundColor=background;
 },
 beforeCreate(){
  //先读取本地储存 如果有 SheBox 则不进行下面的操作 否则创建一个初始的 JSON
  if(localStorage.getItem('SheBox') != null)
  return ;
  //将SheBox 创建并打包成JSON格式
  let SheBox = {
    font:'16px',
    background:'rgb(237,231,218)'
  }
  SheBox = JSON.stringify(SheBox);
  localStorage.setItem('SheBox',SheBox);
 }

 }
 

</script>
 
<style scoped>
#main{
    padding: 0 80px;
    padding-top: 5px;
}

</style>