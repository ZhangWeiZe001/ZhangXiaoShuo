<template>
    <div id="tuiLeft">
      <h3>今日推荐</h3>
      <hr>
      <ul>
        <li id="MeiRiTui" v-for="(book,index) in dayBook" key="b">
          <!-- 先写a标签 后期改成路由跳转标签 -->
          <a style="color: gainsboro;">[{{book.Class}}]</a>
          <a class="finger" @click = goToBook(book.Id,book.Name)>{{book.Name}}</a>
          <a style="float:right;font-size: 12px;color: gold;" >{{book.Author}}</a>
          <br>
        </li>
      </ul>
    </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {useStore} from 'vuex'
import useGoToBook from '@/hooks/useGoToBook.js'

export default {
 name:'TuiJianLeft',
 props:['dayBook'],
 setup(props,context){
   const $store = useStore();

   let data = reactive({
    dayBook : props.dayBook,
    goToBook(id,name){
     $store.commit('CUN',{bookId:id,bookName:name});
     localStorage.setItem('bookId',id);
     //跳转路由
     useGoToBook.goToBook();
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