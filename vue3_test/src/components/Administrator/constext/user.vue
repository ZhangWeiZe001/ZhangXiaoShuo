<template>
  <div id="userMain">

    <table>
        <thead>
            <td>用户账号</td>
            <td>用户密码</td>
            <td>用户名</td>
            <td id="LV">用户等级</td>
            <td  id="amend">设置</td>
        </thead>
        <tr v-for="book in books[index-1]" key="">
          <!-- 设置不能被修改 因为它要被作为标识 -->
          <td>{{book.user}}</td>

          <td v-if="!book.amend">{{book.password}}</td>
          <td v-else>
            <input type="text" v-model="book.password">
          </td>

          <td v-if="!book.amend">{{book.name}}</td>
          <td v-else>
            <input type="text" v-model="book.name">
          </td>

          <td v-if="!book.amend">{{book.LV}}</td>
          <td v-else>
            <input type="text" v-model="book.LV">
          </td>

          <td>
            <button v-if="!book.amend" @click="amendON(book.user)">修改</button>
            <button v-else @click="amendOFF(book.user)">确认</button>
          </td>
        </tr>
    </table>
    <div id="page">
      <button @click="go(1)">上一页</button>
      当前页: <input type="text" v-model="index">
      <button @click="go(2)">下一页</button>
    </div>
  </div>
</template>

<script>
//引入需要使用的配置
import axios from 'axios';
import {reactive,toRefs,ref,inject} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
name:'user',
setup(){
 axios({
  url:'http://127.0.0.1:5055/getUser',
  method:'get',
 }).then(
    value =>{
        let a = [];
        let b = 15;
        for(var i=0;i<=value.data.length/b;i++){
            a.push([]);
            for(var j=0;j<=b-1;j++){
              if(value.data[i*b+j] != undefined){
                a[i][j] = value.data[i*b+j];
                //这里添加 了amend属性 默认为 false
                a[i][j].amend = false;
              }
            }
        }
        data.books = a;
    }
 )
 //获取重置组件的方法
 let reload = inject('reload');
 let data = reactive({
    books:[],
    index:1,
    //前后翻页
    go(p){
      switch(p){
        //下一页 需要=2
        case 2: 
        if(this.index == this.books.length){return}
        this.index++;
        break;
        //上一页 需要p=1
        case 1:
        if(this.index == 1) {return} 
        this.index--;
        break;
      }
    },
    //开启设置
    amendON(user){
      //遍历当前 当前页数内对应的 books
      this.books[data.index-1].forEach(function(value,index){
        if(value.user==user){
          data.books[data.index-1][index].amend = true;
        }
      })
    },
    //关闭设置 并将新的数据保存至数据库中
    amendOFF(user){
      this.books[this.index-1].forEach(function(value,index){
        //当 用户名对应时进行以下的操作
        if(value.user==user){
          //将数据储存至数据库
          axios({
            method:'post',
            url:'http://127.0.0.1:5055/amendUser',
            data:value
          }).then(
            value =>{
              //结束所有操作 将按钮重新置为 设置(表示设置完毕)
              data.books[0][index].amend = false;
            }
          )
        }
      })
    }
 })

 return{
    ...toRefs(data)
 }
},
}
</script>

<style scoped>
#userMain{
    padding: 15px;
}

table{
    width: 100%;
    border-spacing: 5px;
    border-collapse: collapse;
}

/* 使用伪类设置颜色 */
table>:nth-child(even){
    background-color: rgb(210, 246, 246);
}
table>:nth-child(odd){
    background-color: rgb(248, 224, 165);
}
/*  */
tr{ 
    width: 100%;
    border: 1px solid black;
}
td{
    border: 1px solid black;
    padding: 3px;
    font-size: 16px;
    text-align: center;
}
#LV{
width: 10%;
}
#amend{
  width: 5%;
}
input{
  border: 1px solid black;
  width: 60%;
}


#page{
  text-align: center;
}
#page>input{
  border: 1px solid black;
  width: 30px;
  margin-top: 15px;
  margin-right: 15px;
}
</style>