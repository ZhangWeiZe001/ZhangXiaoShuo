<template>
  <div id="main">
    <!-- 上传整本书籍 -->
    <upBook v-show="switchover==1"></upBook>
    <!-- 上传章节 -->
    <upChapter v-show="switchover==2"></upChapter>
    <!-- 修改书籍 -->
    <amend v-show="switchover==3"></amend>
    <div id="switchover">
     <button @click="switchover=1">上传书籍</button>
     <button @click="switchover=2">上传新章</button>
     <button @click="switchover=3">修改书籍</button>
    </div>
    
  </div>
</template>

<script>
//引入需要使用的配置
import {reactive,toRefs,ref} from 'vue';
//引入需要使用的组件
import upBook from './upBook.vue'
import upChapter from './upChapter.vue'
import Amend from './amend.vue';
export default {
 name:'myBook',
 components:{upBook,upChapter, Amend},
 setup(){
  let switchover=ref(1);

  return {
    switchover
  }
 },
}

</script>

<style scoped>
  #main{
    position:absolute;
    margin-top: 25px;
    height: 500px;
    width: 600px;
    left: 30%;
    /* padding-left: 50px; */
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2)
  }

  h1{
    text-align: center;
  }

  input[type=text],textarea{
    margin-top: 15px;
    border: 1px black solid;
    font-size: 16px;
  }

  select{
    margin-top: 15px;
  }
  #longJian{
    margin-left: 5px;
    width: 80%;
    height: 100px;
  }

  #switchover{
    margin-top: 15px;
  }
  #switchover>button{
    margin-right:5px
  }
</style>