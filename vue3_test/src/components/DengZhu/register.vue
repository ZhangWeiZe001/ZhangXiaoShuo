<template>
  <div class="box">
        <h2>登录</h2>
        <div class="input-box">
            <p>账号</p>
            <input type="text" v-model="user">
        </div>
        <div class="input-box">
            <p>密码</p>
            <input type="password" v-model="password">
        </div>
        <p id="errTip" v-if="err">{{err}}</p>
        <div class="btn-box">
            <a href="#">忘记密码</a>
            <a style="margin-top:10px" @click="goAmind()">管理员登录</a>
            <div>
                <button alert="确定登录" @click="register">登录</button>
                <button @click="cut">注册</button>
            </div>
        </div>
    </div>

</template>

<script>
//引入需要使用的配置
import axios from 'axios';
import {reactive,toRefs,ref,onBeforeUnmount} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
 name:'Register',
 setup(porps,constext){
    const $store = useStore();
    const $router = useRouter();
    //设置 后置 路由守卫
    $router.afterEach((to,from,next)=>{
        
    })

    let data =reactive({
        user:'',
        password:'',
        err:'',
        //切换当用户点击时 切换为注册
        cut (){
        constext.emit('switchover');
        },
        //管理员登录方法
        goAmind(){
           let password =  prompt('请输入今日的密钥');
           //密钥暂时使用 123456 后面会用 高级密码代替
           if(password =='123456'){
            localStorage.setItem('AdminPassword','true');
            $router.push('/Admin');
           }else{
            alert('密钥输入错误!')
           }
        },
        //用户登录方法
         //登录方法
        register(){
          //要求
          //1)账号和密码不能空
          if(!data.password||!data.user){
            return data.err='密码和账号不能为空'
          }
          //发送axios请求
          axios({
            method:'post',
            url:'http://127.0.0.1:5055/register',
            data:{user:data.user,password:data.password}
          }).then(
            value =>{
               //当状态为 true时登录成功 进行保存登录信息和跳转
               
               if(value.data.padding){
                $store.commit('REGISTER',data.user);
                //存入浏览器本地(可以放入vuex中执行)
                localStorage.setItem('userPending',true);
                localStorage.setItem('userName',data.user);
                alert('登录成功,现返回主页面');
                //回到主页
                $router.push('/')
               }else{  //登录失败时调用
                 data.err = value.data.err;
               }
            }
          )
        },
    }) 

    

    return{
        ...toRefs(data),
    }
 },
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
    width: 115px;
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

#errTip{
  margin-right: 40%;
  color: red;
}
</style>


 

    
