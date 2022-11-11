<template>
  <div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
//引入动画效果样式
import 'animate.css';
//引入重置样式
import './assets/css/ChongZhi.css'
//老三样
import {nextTick,ref,provide} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
name:'app',
setup(){
 let isRouterAlive = ref(true);
 //
 //刷新路由
 function reload(){
  isRouterAlive.value = false;
  nextTick(()=>{
    isRouterAlive.value = true; 
  })
 }

 //将方法交给 provide池
 provide('reload',reload)

 return{isRouterAlive}
}
}
</script>

<style>
  
</style>
   
