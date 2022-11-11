<template>
  <div id="main">
    <register v-if="cut" @switchover="switchover"></register>
    <Land v-if="!cut" @switchover="switchover"></Land>
  </div>
 
</template>

<script>
import {reactive,toRefs} from 'vue'
//引入组件
import Register from './register.vue'
import Land from './land.vue'
export default {
  components:{
    Register,
    Land,
  },
  setup(){
    let data = reactive({
      cut: true
    })

    //用于切换登录与注册页面 点击时将cut置为相反的 bool值
    function switchover(){
      data.cut = ! data.cut;
    }


    return{...toRefs(data),switchover}
  }
}
</script>

<style scoped>

#main{
    /* 页面的透明图 0-1 */
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* 页面的背景图片，可以修改 */
    background:url(@/assets/img/deng.webp) ;
    background-size: cover;
}
</style>