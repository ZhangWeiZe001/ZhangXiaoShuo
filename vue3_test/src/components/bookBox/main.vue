<template>
  <div v-if="on">
    <top></top>
    <div id="main">
       <div id="main-top">个人书架</div>
       <hr>
       <div id="bookNull" v-if="ifbookNull">现再书架内还没有书 快去找一本加入吧~~</div>
       <ul id="bookBox">
        <li @click="gotobook(book)" class="book" v-for="book in bookBox">
          <img :src="require('@/assets/bookFeng/'+book.imgName)" alt="图片加载中">
          <p>{{book.Name}}</p>
        </li>
       </ul>
    </div>
  </div>
  
  
</template>

<script>
import top from '@/general/top.vue'
import axios from 'axios';
import {reactive,toRefs,ref,toRaw} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
 name:'bookBox',
 components:{top},
 setup(){
  //路由和 vuex
  const $store = useStore();
  const $router = useRouter();
  //获取用户的id
  let user = localStorage.getItem('userName')
  //获取用户的 书架信息
  axios({
    method:'post',
    url:'http://127.0.0.1:5055/setUser',
    data:{user}
  }).then(
    value =>{
      //如果bookBox没有任何数据 则直接跳过下面的阶段
      if(!value.data.bookBox){
        return false
      }
      //处理 书架的信息
      let bookBox = value.data.bookBox.replace(/\\/ig,'');
      //转换为对象格式 并将数据发给下一步
      return JSON.parse(bookBox)
    }
  ).then(
    value =>{
      //如果value 为 false 则不发送第二次axios请求
      if(value){
        //通过书架信息查找所有的对应的书籍
       axios({
        method:'post',
        url:'http://127.0.0.1:5055/myBookBox',
        data:{bookBox:value}
       }).then(
        value =>{
          if(!value.data){
            data.bookBox = false
            data.ifbookNull = true
            data.on =true;
            return
          }
          data.bookBox = value.data;
          data.on =true;
        }
      )
     }else{
      data.on=true;
      data.ifbookNull=true
      } 
    }
  )

  let data =reactive( {
    bookBox:{},
    img:'1.webp',
    on:false,
    ifbookNull:false,
    gotobook(book){
      //修改vuex 中书籍信息
      $store.commit('CUN',{bookId:book.Id,bookName:book.Name})
      localStorage.setItem('bookId',book.Id);
      //使用路由跳转至 BookYe
      $router.push('/BookYe')
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
  margin: 0 auto;
  margin-top: 15px;
  width: 80%;
  height: 600px;
  /* background-color: red; */
  border: 1px rgba(0, 0, 0, 0.216) solid;
  overflow: auto;
}
#main-top{
  width:100%;
  line-height: 50px;
  text-align: center;
  font-size:30px
}

#bookNull{
  font-size: 50px;
  text-align: center;
}

.book{
  width:15%;
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-bottom: 20px;
  text-align: center;
  float:left;
}
.book>img{
  width:80% ;
  height: 200px;
}
</style>