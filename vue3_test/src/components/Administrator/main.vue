<template>
  <Top></Top>
  <div id="main">
    <span class="fen" :class="css[0]" @click="cut(0)">用户管理</span>
    <span class="fen" :class="css[1]" @click="cut(1)">书籍管理</span>
    <div id="content">
      <User v-show="lei[0]"></User>
      <Books v-show="lei[1]"></Books>
    </div>
  </div>
</template>

<script>
import Top from './top.vue'
import User from './constext/user.vue'
import Books from './constext/books.vue'

import {reactive,toRefs,ref,inject} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';



export default {
name:'Administrator',
components:{Top,User,Books},

setup(){
 const $router = useRouter();

 let data = reactive({
  //用于控制显示的组件
  lei:[false,true],
  //动态的css 
  css:['on',''],

  cut(index){
    //将所有的元素置为 false
    for(let i=0;i<this.lei.length;i++){
      this.lei[i] = false;
    }
    //再给当前选择的置为 true
    this.lei[index] = true;

    //将所有的样式先设置为 空 再将index 对应的参数置为 on
    for(let i=0;i<this.css.length;i++){
      this.css[i] = '';
    }
    this.css[index] = 'on';
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
  margin:0 10%;
  margin-top:30px;
}
.fen{
  margin-right: 1px;
  padding: 0 3px;
  background: white;
  border-top: 1px black solid;
  border-left: 1px black solid;
  border-right: 1px black solid;
  font-size: 18px;  
  position: relative;
  top: 1px;
}
.on{
  background-color: #bfc;
}
#content{
  border: 1px black solid;
}
</style>