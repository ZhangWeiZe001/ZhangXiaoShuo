<template>
    <div class="box">
          <h2>注册页面</h2>
          <div class="input-box">
              <p>账号</p>
              <input type="text" v-model="user">
          </div>
          <div class="input-box">
              <p>密码</p>
              <input type="password" v-model="onepassword">
          </div>
          <div class="input-box">
              <p>二次密码</p>
              <input type="password" v-model="twopassword">
          </div>
          
          <div class="btn-box">
            <a href="javascript:;" @click="cut">返回登录</a>
            <p v-if="error" style="color: red; font-size: 13px;">错误原因:{{error}}</p>
              <div>
                  <button @click="land">注册</button>
              </div>
          </div>
      </div>
  
  </template>
  
  <script>
  //引入需要使用的配置
  import axios from 'axios';
  import {reactive,toRefs,ref} from 'vue';
  import {useStore} from 'vuex'
  import { useRouter } from 'vue-router';
  
  export default {
   name:'Register',
   setup(props,constext){
      const $store = useStore();
      const $router = useRouter();
      let data =reactive({
          user:'',
          onepassword:'',
          twopassword:'',
          error:'',
      }) 
      
      //切换当用户点击时 切换为登录
      function cut (){
        constext.emit('switchover');
      }

      //注册方法 用于判断用户是否能注册成功*
      function land(){
        //先进行判断是否满足以下个条件
        //1)账号不允许有重复的 使用axios 先进行一个请求判断是否有重复的
        //2)密码要大于等于六位数 
        //3)判断两次密码是否相同
        if(data.onepassword.length<6 ||data.twopassword.length<6){
            data.error = '密码需要大于等于六位';
            return
        }
        if(data.onepassword != data.twopassword){
            data.error= '两次密码不相同';
            return
        }
        //链式回调
        new Promise((resolve,reject)=>{
            axios({
              method:'post',
              url:'http://127.0.0.1:5055/usertest',
              data:{user:data.user}
            }).then(
                value =>{
                    //如果为 true则继续原型链 
                    if(value.data){
                        resolve('成功')
                    }else{
                        data.error ='该账号已经被注册'
                    }
                },
            )
        }).then(
            //账号无重复 发送第二次axios 将账号和密码注册
            value =>{
                axios({
                    method:'post',
                    url:'http://127.0.0.1:5055/landUser',
                    data:{user:data.user,password:data.onepassword}
                }).then(
                    value =>{
                        if(value.data){
                          //将用户的账号存在本地 同时将登录状态置为激活
                          //调用vuex
                          $store.commit('REGISTER',data.user);
                          //存入浏览器本地
                          localStorage.setItem('userPending',true);
                          localStorage.setItem('userName',data.user);

                          alert('注册成功,现返回主页面');
                          //回到主页
                          $router.push('/')
                        }else{
                          alert('注册失败 请联系管理员')
                        }
                    }
                )
            }
        )
        
      }

      return{...toRefs(data),cut,land}
   }
  }
  </script>
  
  <style scoped>

  
  .box{
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 380px;
      width: 350px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      border-left: 1px solid rgba(255, 255, 255, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.2);
  }
  .box h2{
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 20px;
  }
  .box .input-box{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 10px;
  }
  .box .input-box p{
      margin-bottom: 5px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 13px;
  }
  .box .input-box input{
      box-sizing: border-box;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      height: 35px;
      width: 250px;
      background:rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 5px;
      transition: 0.2s;
      outline: none;
      padding: 0 10px;
      letter-spacing: 1px;
  }
  .box .input-box input:focus{
      border: 1px solid rgba(255, 255, 255, 0.8);
  }
  .box .btn-box {
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
  }
  .box .btn-box a{
      font-size: 13px;
      width: 250px;
      text-align: end;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.9);
      transition: 0.2s;
  }
  .box .btn-box a:hover{
      color: rgba(255, 255, 255, 1);
  
  }
  .box .btn-box div{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      margin-top: 20px;
  }
  .box .btn-box div button{
      width: 250px;
      height: 35px;
      border: 1px solid rgba(197, 81, 58, 0.8);
      background: rgba(197, 81, 58, 0.5);
      color: rgba(255, 255, 255, 0.9);
      border-radius: 5px;
      transition: 0.2s;
  }
  .box .btn-box div button:nth-of-type(2){
      margin-left: 10px;
  }
  .box .btn-box div button:hover{
      border: 1px solid rgba(248, 108, 76, 0.8);
      background: rgba(248, 108, 76, 0.5);
  }
  </style>
  
  
   
  
      
  