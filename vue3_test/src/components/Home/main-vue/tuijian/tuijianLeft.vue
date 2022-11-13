<template>
    <div id="tuiLeft">
      <h3>今日推荐</h3>
      <hr>
      <ul>
        <li id="MeiRiTui" v-for="(book,index) in dayBook" key="b">
          <!-- 先写a标签 后期改成路由跳转标签 -->
          <a style="color: gainsboro; cursor:pointer;" @click="gotoClass(book.Class)">[{{book.Class}}]</a>
          <a class="finger" @click = goToBook(book.Id,book.Name)>{{book.Name}}</a>
          <a style="float:right;font-size: 12px;color: gold; cursor:pointer;" @click="goToAuthor(book.Author)">{{book.Author}}</a>
          <br>
        </li>
      </ul>
    </div>
</template>

<script>
import {reactive,toRefs,inject} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

import useGoToBook from '@/hooks/useGoToBook.js'

export default {
 name:'TuiJianLeft',
 props:['dayBook'],
 setup(props,context){
   const $store = useStore();
   const $router = useRouter();
   const reload = inject('reload');
   let data = reactive({
    dayBook : props.dayBook,
    //跳转至书籍
    goToBook(id,name){
     $store.commit('CUN',{bookId:id,bookName:name});
     localStorage.setItem('bookId',id);
     //跳转路由
     useGoToBook.goToBook();
    },
    //跳转至作者
    goToAuthor(author){
      //向数据库写入信息
      localStorage.setItem('author',author)
      $router.push('/author')
    },
    //跳转至分类
    gotoClass(Class){
      //将类型储存到本地方便读取
      localStorage.setItem('class',Class);
      $router.push('/bookSubarea')
      //下面的 方法用于 bookSubarea 中刷新页面(不会影响该组件原本的功能)
      reload();
  }
   })
   return{
    ...toRefs(data)
   }
 }
}
</script>

<style scoped>
 #tuiLeft{
    width: 15%;
    height:500px;
    float: left;
 }
 /* 给li下的 a(router-Link)标签设置为left */
 li>a{
    float: left;
 }
/* 每日推荐 下的每一个li*/
 #MeiRiTui{
  border-bottom: 1px rgba(0, 0, 0, 0.118) solid;
  padding-bottom: 5px;
  margin-top: 5px;
 }
 #bookName{
  width:100px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
 }
 .finger{
  cursor:pointer;
}
</style>