<template>
<div style="clear:both; padding-top: 30px;" v-if="on">
  <TuiJianLeft :dayBook="bookContent.dayBook"></TuiJianLeft>
  <div id="tuijianMain">
     <h3>站长推荐</h3>
     <hr>
     <ul>
        <li id="TuiJian" v-for="(book,index) in bookContent.goodBook" :key="book.Id">
            <img :src=bookFeng[index] alt="图片加载失败">
            <h3 class="finger" style="color: blue;" @click="goToBook(book.Id,book.Name)">{{book.Name}}</h3> 
            <p>简介:</p>
            <span>{{book.MiNiJianJie}}</span>
        </li>
     </ul>
  </div>
  <TuiJianRight :newBook="bookContent.newBook"></TuiJianRight>
</div>
</template>

<script>
import TuiJianLeft from './tuijianLeft.vue'
import TuiJianRight from './tuijianRight.vue'
import useGoToBook from '@/hooks/useGoToBook.js'

import axios from 'axios';
import {reactive,toRefs,ref,onBeforeUnmount} from 'vue';
import {useStore} from 'vuex'

export default {
name:'TuiJianMain',
components:{TuiJianLeft,TuiJianRight},
 setup(){
  const $store = useStore(); 
  axios({
    method:'get',
    url:'http://127.0.0.1:5055/getRecommend',
  }).then(
    value =>{
      axios({
        method:'post',
        data:value.data,
        url:'http://127.0.0.1:5055/Recommend/getBook'
      }).then(
        value =>{
          data.bookContent = value.data;
          data.on = true;
        }
      )
    }
  )
  let data = reactive({
   bookFeng:[
   require("@/assets/bookFeng/1.webp"),
   require("@/assets/bookFeng/2.webp"),
   require("@/assets/bookFeng/3.webp"),
   require("@/assets/bookFeng/4.webp"),
   require("@/assets/bookFeng/5.webp"),
   ],
   bookContent:{},
   on:false,
   goToBook(id,name){
     $store.commit('CUN',{bookId:id,bookName:name});
     localStorage.setItem('bookId',id);
     //跳转路由
     useGoToBook.goToBook();
    }
  })  

  return {...toRefs(data)} 
 }
}
</script>

<style scoped>
 #tuijianMain{
   margin:0 5%;
   float: left;
   width: 60%;
   height: 500px;
 }

 /* 站长推荐每行的高度 */
 #TuiJian{
  height: 90px;
  border-bottom: 1px rgba(0, 0, 0, 0.151) solid;
 }
 #TuiJian>img{
   margin-top: 2.5px;
    height: 85px;
    width:60px;
    /* margin-left: 30px; */
    margin-right: 20px;
    float: left;
 }

 .finger{
  cursor:pointer;
}
</style>