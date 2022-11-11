<template>
   <div v-if="on">
   <Top></Top>
   <Main></Main>
   </div>
   
</template>

<script>
import Top from '@/general/top.vue';
import Main from './main/main.vue'
//引入需要使用的中间件
import axios from 'axios';
import {reactive,toRefs,ref,provide} from 'vue';
import {useStore} from 'vuex'
import { useRoute } from 'vue-router';

export default {
 name:'Study',
 components:{Main,Top},
 setup() {
   const $store = useStore();
   
   //当刷新时 vuex中的内容会被重置 所以需要浏览器在本地保存 目录的内容
   //如果vuex 中的目录为空时 则回去浏览器本地储存中拿 刷新前保存的目录内容
   if($store.state.muluName != ''){
      localStorage.setItem('muluName',$store.state.muluName);
   }else{
      $store.commit('GETMULU',{muluName:localStorage.getItem('muluName')})
   }


   axios({
      method:'post',
      url:'http://127.0.0.1:5055/loadBook',
      data:{
         mulu:$store.state.muluName,
         id:localStorage.getItem('bookId')
      }
   }).then(
    value =>{ 
      data.book = value.data;
      on.value = true;
   }
   ).catch(reason =>{console.log(reason);})

   let data = {
      book:{},
   }
   
   let on = ref(false)
   //将data作为可传递为后代组件的数据
   provide('book',data) 
   
   return{
      on
   }
 }
}
</script>

<style>
 
</style>