<template >
<div v-if="on">
  <div id="userMain">
    <!-- 搜索框 可以靠用户输入快速过滤出 对应的数据 -->
    <div id="sou">
      <b>搜索 : </b><input type="text" v-model="sou" @keyup="keyup">
      <button @click="sou=''">清空</button>
      <h1 id="nullTIP" v-if="!books[0][0]" >没有搜索到任何内容</h1>
    </div>
    
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
      当前页: <input type="text" v-model.number="index">
      /{{books.length}}
      <button @click="go(2)">下一页</button>
    </div>
  </div>
</div>
</template>

<script>
//引入需要使用的配置
import axios from 'axios';
import {reactive,toRefs,ref,inject,watch} from 'vue';
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
        data.allBook=data.books = a;
        data.on = true;
    }
 )
 //获取重置组件的方法
 let reload = inject('reload');
 let data = reactive({
    //保存接收的所有数据(这里只会在加载中使用 当搜索栏为空时 会再次使用该数据)
    allBook:[],
    //当前使用的数据
    books:[],
    
    //页数
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
    },
    //搜索的内容
    sou:'',
    //控制初始加载时间
    on:false,
 })
 //监视属性 用于监视 搜索框内的内容
 watch(()=>data.sou,(newValue,oldValue)=>{
  if(data.sou==''){
    //当搜索内容空时 将数据重置
    return data.books = data.allBook
  }
    //开始遍历 allBook 找到其中对应的数据添加到 data.books中
    let a = [];
    let b = 15;

    //这里的c容纳 零时数据 之后会交给 books
    let c =[];
    c.push([])
    //d作为一维数组的下标使用
    let d =0;
    //这里需要 -1 因为下标是从0开始的
    for(var i=0;i<=data.allBook.length-1;i++){
        a.push([]);
        for(var j=0;j<=b-1;j++){
          if(data.allBook[i][j] != undefined){
            if(data.allBook[i][j].user.indexOf(data.sou) != -1){
              if(c[d].length>=15){
                d++;
                c.push([]);
              }
              c[d].push(data.allBook[i][j])
            }
          } 
        }
    }
    data.books = c;
  })
 //用于监视页数索引
  watch(()=>data.index,()=>{
  //当 切换 非number 时 重新转换为 number
    if(typeof data.index!='number'){
       alert('请输入数字');
        data.index = 1;
    }
    //当超过 books的上线后 重新置为1 
    if(data.index > data.books.length){
      alert('超过了最大索引\n现重置为1')
      data.index = 1
    }
 })
 
  return{
    ...toRefs(data)
 }
},
}
</script>

<style scoped>
/* 搜索框样式 */
#sou>input{
  width: 150px;
  margin-bottom:15px;
  margin-right:5px
}

#nullTIP{
  text-align: center;
  margin-bottom: 50px;
}
/* 用户表样式 */
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