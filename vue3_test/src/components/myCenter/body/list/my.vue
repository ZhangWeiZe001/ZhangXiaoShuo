<template>
  <div id="My">
    <h1>首页</h1>
    <div id="top">
       <p>欢迎您的使用~</p> 
       <p>用户名:{{Name}}</p>
       <p>用户账号:{{User}}</p>
       <p>等级: LV{{LV}}</p>
        <router-link id="goset" to="/myCenter/Set">设置</router-link>
    </div>
  </div>
</template>

<script>
//引入需要使用的配置
import axios from 'axios';
import {reactive,toRefs,ref,onMounted} from 'vue';


export default {
  name:'My',
  setup(){

    let data = reactive({
        Name:'',
        User:'',
        LV:'0',
      })

     //获取当前用户的信息
     axios({
          method:'post',
          url:'http://127.0.0.1:5055/setUser',
          data:{user:localStorage.getItem('userName')}
        }).then(
          value =>{
          //提取用户的账号和用户名 同时使模板启动
          data.Name = value.data.name;
          data.User = value.data.user;
          data.LV = value.data.LV;
        })
        
    return {
    ...toRefs(data),
    }
  }
}
</script>


<style scoped>
h1{
    margin: 10px 0px;
    text-align: center;
    text-shadow:1.2px 1.2px 0px #0396FF;
}

#My{
  
  margin-left: 15px;
  width: 70%;
  float: left;
}

#top{
  width: 100%;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2)
}


#top p{
   padding-left: 10%;
   padding-top: 17px; 
   font-size: 16px;
}
#top #goset{
    font-size: 16px;
    color: blue;
    display: block;
    margin-top: 25px;
    margin-left: 10%;
}
</style>