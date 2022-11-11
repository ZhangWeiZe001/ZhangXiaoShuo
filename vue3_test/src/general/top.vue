<template>
  <div id="top">
   <router-link to="/" id="name">张氏小说网</router-link>
   <p id="right" v-if="on">
    <a href="javascript:;" @click="register">登录</a>
   </p> 
   <p id="right" v-else>
      <span>你好:<router-link href="javascript:;" id="user" to="/myCenter">{{user}}</router-link></span> 
      <router-link to="/bookBox" style="margin-right: 15px;">书架</router-link>
      <a href="javascript:;" @click="registerdwon">退出</a>
   </p>
  </div>
</template>

<script>
  //引入需要使用的配置
  import {reactive,toRefs,ref,inject} from 'vue';
  import {useStore} from 'vuex'
  import { useRouter } from 'vue-router';
  
export default {
 name:'Top',
 setup(){
  const $store = useStore();
  const $router = useRouter();
  //拿到 重新解析一次app模板的方法
  let reload =inject('reload');
  let data = reactive({
    on:true,
    user:'',
    register(){
      $router.push('/DengZhu')
    },
    //退出登录
    registerdwon(){
      //调用vuex 清除state的数据
      $store.commit('REGISTERDWON');
      //清除浏览器本地保存的数据
      localStorage.removeItem('userPending');
      localStorage.removeItem('userName');
      //执行一次该方法 模板会重新解析
      reload();
    },
  })
  
  let Pending = localStorage.getItem('userPending');
  
  if(Pending){
    data.on=false;
    data.user = localStorage.getItem('userName')
    $store.commit('REGISTER',data.user);
  }

  return {
    ...toRefs(data), 
  }
 },
}
</script>

<style scoped>
#top{
  line-height: 50px;
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 0 80px;
}

#name{
  color: white;
}

#right{
  float:right
}
#right>a{
  color: white;
  font-size: 16px;
}
#right>span{
  margin-right: 15px;
  color: rgb(255, 255, 255);
  font-size: 16px;
}
#user{
  color: blue;
  margin-left: 10px;
}
</style>