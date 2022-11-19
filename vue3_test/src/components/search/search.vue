<template>
  <top></top>
  <div id="main">
    <fenlei></fenlei>
    <h1 id="tip" v-if="!books[0]">没有找到对应的书籍</h1>
    <div v-else>
      <ul>
      <!-- 注:这里需要用 index-1 作为下标 -->
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
 name:'Search',
 components:{Top, Fenlei},
 setup(){
   const $router = useRouter();
   const $store = useStore();
   axios({
     method:'post',
     url:'http://127.0.0.1:5055/getSearch',
     data:{search:$store.state.search}
   }).then(
    value=>{
      if(value.data[0]==undefined){
        return
      }
      data.books = value.data
      //对简介进行预处理
      for(let i=0;i<data.books.length;i++){
      data.books[i].JianJie = data.books[i].JianJie.replace(/[\\n\\r]/ig,'')
      }

      let x=[];
      //一维转二维
      for(let i=0;i<=data.books.length/10;i++){
      x.push([]);
      for(let j=0;j<=9;j++){
         if(data.books[i*10+j] != undefined){
         x[i][j] = data.books[i*10+j]
         }
       }
      }
      data.books = x;
    })

   let data = reactive({
    on:false,
    books:[],
    index:1,
    //跳转到书籍事件
    goBook(book){
      localStorage.setItem('bookId',book.Id);
      $store.commit('CUN',{bookId:book.Id,bookName:book.Name});
      $router.push('/BookYe');
    },
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
    }
   })  

   return{
    ...toRefs(data)
   }
 }
}
</script>

<style scoped>
#main{
    margin: 0 5%;
}

#tip{
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