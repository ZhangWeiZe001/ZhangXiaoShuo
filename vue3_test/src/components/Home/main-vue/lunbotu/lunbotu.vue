<template>
<div id="lunbotu">
  <LunLeft></LunLeft>
  <div id="img" :style="{backgroundImage:'url('+url+')'}">
    <ul id="imglist">
      <li class="an" v-for="book in bookName" key="" @click="qiehuan(book)" ref="li">
       <a href="javascript:;">{{book}}</a> 
      </li>
    </ul>
  </div>
  <LunRight></LunRight>
</div>
</template>

<script>
import {reactive,toRefs,onMounted,onBeforeUnmount,ref} from 'vue'
import LunLeft from '../lunbotu/lunleft.vue' 
import LunRight from '../lunbotu/lunright.vue' 
export default {
  name:'LunBoTu',
  components:{LunLeft,LunRight},
  setup(){
    let data = reactive({
      bookName:['星河历险','赛博朋克','第四天灾','第二地球','传奇玩家在异界'],
      imgName:['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg'],
    })

    //添加一个动态url作为轮播的图片
    data.url = require(`@/assets/img/${data.imgName[0]}`) //@表示src  静态资源 去assets中找
    
    //为定时器准备的数据
    var time;
    var i=0;
    let li = ref(null);
    //挂载完毕时 开定时器
    onMounted(()=>{
     time = setInterval(()=>{
      if(i+1 > data.imgName.length) {i=0}
      data.url = require(`@/assets/img/${data.imgName[i]}`);
      //将所有的 背景置为暗色 
      for(let j=0;j<5;j++){
        li.value[j].className='an'; 
      }
      //为当前的置为亮色
      li.value[i].className='liang'; 
      i++
      },2000)

    })

    //注销时关定时器
    onBeforeUnmount(()=>{
      clearInterval(time);
    })

    //切换事件
    function qiehuan(value){
      //通过元素获取下标
      var index = data.bookName.map(item=>item).indexOf(value)
      i=index;
      //切换图片
      data.url = require(`@/assets/img/${data.imgName[i]}`)
      //将所有的 背景置为暗色 
      for(let j=0;j<5;j++){
        li.value[j].className='an'; 
      }
      //为当前的置为亮色
      li.value[i].className='liang'; 
    }
    return{
      ...toRefs(data),
      //交出函数
      qiehuan,
      //交出$refs
      li,
    }
  },
}
</script>

<style scoped>
 #img{
  /* background-image: url(./img/2.jpeg); */
  float: left;
  width: 50%;
  height: 300px;
  /* 铺满整个图片框 */
  background-position: center center;
 }

 #imglist{
  position: relative;
  top:277px;
  width: 100%;
  text-align: center;
  border: 1px black solid;
 }

 #imglist>li{
  float: left;
  font-size: 15px;
  /* background-color: rgba(128, 128, 128, 0.452); */
  width: 20%;
  border: 1px black solid;
 }
 #imglist>li:hover{
  background-color: orange;
 }
 #imglist>li>a{
  color: white;
 }
 .liang{
  background-color: orange;
  
 }
 .an{
  background-color: rgba(128, 128, 128, 0.452);

 }
</style>