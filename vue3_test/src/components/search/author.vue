<template>
<div v-if="on">
  <Top></Top>
  <div id="main">
  <Fenlei></Fenlei>
  <h1 id="authorName">作者:{{books[0][0].Author}}</h1>
  <hr>
  <ul>
    <li class="bookBox" v-for="book of books[index-1]">
        <img :src="require('@/assets/bookFeng/'+book.imgName)" alt="图片加载中">
        <h1 @click="goBook(book)">{{book.Name}}</h1>
        <p>{{book.JianJie}}</p>
    </li>
  </ul>
  <div id="goto">
        当前页数: <input type="text" v-model="index"> /最大页数:{{books.length}}
        <button @click="go(1)">上一页</button>
        <button @click="go(2)">下一页</button>
      </div>
  </div>
</div>
</template>

<script>

import axios from 'axios';
import {reactive,toRefs,ref,inject} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
import Top from '../../general/top.vue';
import Fenlei from '../../general/fenlei.vue';

export default {
name:'Author',
components:{Top,Fenlei},
setup(){
   const $router = useRouter();
   const $store = useStore();
 axios({
    method:'post',
    url:'http://127.0.0.1:5055/getAuthor',
    data:{author:localStorage.getItem('author')}
 }).then(
    value =>{
       //进行第一步预处理 将一维数组升为二维数组
       let x=[];
      //一维转二维
      for(let i=0;i<=value.data.length/10;i++){
      x.push([]);
      for(let j=0;j<=9;j++){
         if(value.data[i*10+j] != undefined){
         x[i][j] = value.data[i*10+j]
         }
       }
      }
      data.books = x;
      data.on = true;
    }
 )
 let data = reactive({
  on:false,
  books:[],
  index:1,
   //前后翻页
   go(p){
      switch(p){
        case 2: 
        if(this.index == this.books.length){return}
        this.index++;
        break;
        case 1:
        if(this.index == 1) {return} 
        console.log(111);
        this.index--;
        break;
      }
    },
    //跳转到书籍事件
    goBook(book){
      localStorage.setItem('bookId',book.Id);
      $store.commit('CUN',{bookId:book.Id,bookName:book.Name});
      $router.push('/BookYe');
    },
 })
 return {
    ...toRefs(data),
 }
}
}
</script>

<style scoped>
#main{
  margin: 0 5%;
}

#authorName{
    text-align: center;
}

.bookBox{
 margin-top: 25px;
 margin-bottom: 25px;
 height: 180px;
 padding: 0 50px;
 border-bottom: 1px solid black;
}

.bookBox>h1{
  margin-left: 105px;
  cursor:pointer;
}

.bookBox>p{
  margin-top: 15px;
  margin-left: 105px;
}

li>img{
  width: 100px;
  height: 150px;
  display: block;
  float: left;
}

/* 翻页功能的css */
#goto{
  /* 使文本居中 */
 text-align: center;
}
#goto button{
  margin: 0 5px;
}
#goto input{
  border: 1px solid black;
  width: 50px;
}
</style>