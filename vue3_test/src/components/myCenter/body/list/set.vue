<template>
<div id="My" v-if="on">
    <h1>个人中心</h1>
    <div id="top">
        <p>欢迎您的使用~</p> 
        <p>用户名:<span  ref="name">{{Name}}</span> <button ref="but1">修改</button></p>
        <p>用户账号:<span>{{User}}</span></p>
        <p>等级: LV{{LV}} </p>
        <button id="yes" @click="set">保存修改</button>
    </div>
</div>
</template>

<script>
//引入需要使用的配置
import axios from 'axios';
import {reactive,toRefs,ref,onMounted,onBeforeMount} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';


export default {
  name:'My',
  setup(){
    //span
    let name = ref(null);
    //按钮
    let but1 = ref(null);

    let data = reactive({
        Name:'',
        User:'A10001',
        LV:'0',
        on:false,
        //发送修改请求给服务器
        set(){
            axios({
              method:'post',
              url:'http://127.0.0.1:5055/setName',
              data:{user:this.User,name:this.Name}
            }).then(
                ()=>{alert('保存成功~')}
            )
        }
    })

    //模板解析后
    onMounted(()=>{
        new Promise((resolve,reject)=>{
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
                  data.on=true;
                  resolve('成功')
                }
            )
        }).then(
            value =>{
            but1.value.onclick = function(){
            if(but1.value.textContent == '修改'){
              name.value.innerHTML = `<input type="text" value="${data.Name}" style="border: 1px solid black;">`
              but1.value.textContent = '确认'
            }else if(but1.value.textContent == '确认'){
              data.Name = name.value.children[0].value
              name.value.textContent = `${data.Name}`
              but1.value.textContent = '修改'
            }
          }
        })  
    })
    return {
        //这一行放 标签中使用了 ref属性的值
        name,but1,
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
#top #set{
    font-size: 16px;
    color: blue;
    display: block;
    margin-top: 25px;
    margin-left: 10%;
}
#yes{
    margin-left:10%;
    margin-top:20px
}
</style>