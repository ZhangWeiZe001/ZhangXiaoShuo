<template>
  <div id="main" v-if="on">
    <FenLei></FenLei>
    <BookJieShao :book="book"></BookJieShao>
    <BookJianJie :JianJie="book.JianJie"></BookJianJie>
    <MuLu :mulu="book.mulu"></MuLu>
  </div>
</template>

<script>
//引入组件
import FenLei from '@/general/fenlei.vue'
import BookJieShao from './bookJieShao/bookJieShao.vue'
import BookJianJie from './bookJieShao/bookJianJie.vue'
import MuLu from './bookJieShao/mulu.vue'
//引入使用的模块
import axios from 'axios';
import {reactive,toRefs,ref,onBeforeUnmount} from 'vue';
import {useStore} from 'vuex'


export default {
 name:'Main',
 components:{ FenLei,BookJieShao,BookJianJie,MuLu},
 setup(){
  const $store = useStore();

  let book;
  //on 监视book是否已经接收到了数据
  let on = ref(false)
  axios({
    url:'http://127.0.0.1:5055/loadBook/get',
    method:'post',
    data:{id:localStorage.getItem('bookId')},
  }).then(
    value =>{ 
      //赋值
      data.book = value.data;
      //将on 置为true 表示子组件可以加载了
      on.value = true
    }
  )
  let data = reactive({
    book
  })
  
  return{
    ...toRefs(data),
    on
  }

 }
}
</script>
 
<style scoped>
#main{
    padding: 0 80px;
    margin-top: 5px;
}

</style>