<template>
  <div id="MuLu">
      <h1>目录</h1> 
      <ul>
        <hr>
        <li v-for="(mulu,index) in section" key="index">
           <a  @click="tiao(mulu)">{{index+1}}.{{mulu}}</a> 
        </li>
      </ul> 
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue';
import { useRouter } from 'vue-router';
import {store} from 'vuex'
import {useStore} from 'vuex'

export default {
name:'MuLu',
props:['mulu'],
setup(props){
  //准备路由
  const $router = useRouter();
  //准备vuex
  const store = useStore()
  let data = reactive({
    //接收父组件发送来的目录数据
    section:props.mulu,
  })
  //编程式路由
  function tiao(mulu) {
    store.commit('GETMULU',{muluName:mulu});
    $router.push('/study') 
  }
  

  return { 
    ...toRefs(data),
    tiao,
  }
}

}
</script>

<style scoped>
  #MuLu li{
    float: left;
    text-align: center;
    line-height: 50px;
    width: 20%;
    border:1px rgba(0, 0, 0, 0.095) solid;
    white-space: nowrap;  /*设置不换行*/
    overflow: hidden;     /*剪裁掉溢出的 数据*/
    text-overflow: ellipsis; /*溢出之前的位置添加省略号*/
  }
  #MuLu li>a:hover{
    color: orange;
  }
</style>