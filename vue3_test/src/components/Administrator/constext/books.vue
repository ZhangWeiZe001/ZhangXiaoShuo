<template>
    <div id="userMain" v-if="on">
      <!-- 搜索框 可以靠用户输入 书名或书籍Id来 来获取对应的数据 -->
      <div id="sou">
        <b>搜索:
        <select v-model="souClass">
          <option value="Id">Id</option>
          <option value="Name">书名</option>
          <option value="Author">作者</option>
          <option value="bookClass">类型</option>
        </select> 
        </b>
        
        <span v-if="souClass!='bookClass'">
          <input type="text" v-model="sou" @keyup="keyup">
          <button @click="sou=''">清空</button>
        </span>

        <!-- 如果用户 选择了类型则切换为 另一个表示类型的下拉列表框-->
        <span v-else>
          请选择书籍类型:<select v-model="sou">
            <option value="历史">历史</option>
            <option value="军事">军事</option>
            <option value="科幻">科幻</option>
            <option value="武侠">武侠</option>
            <option value="仙侠">仙侠</option>
            <option value="奇幻">奇幻</option>
            <option value="灵异">灵异</option>
          </select>
        </span>
        <h1 id="nullTIP" v-if="!books[0][0]" >没有搜索到任何内容</h1>
      </div>
    
      <table>
          <thead>
              <td>ID</td>
              <td>书名</td>
              <td>作者</td>
              <td id="LV">类型</td>
              <td  id="amend">设置</td>
          </thead>
          <tr v-for="book in books[index-1]" key="">
             <td>{{book.Id}}</td>

             <td v-if="!book.amend">《{{book.Name}}》</td>
             <td v-else><input type="text" v-model="book.Name"></td>

             <td v-if="!book.amend">{{book.Author}}</td>
             <td v-else><input type="text" v-model="book.Author"></td>

             <td v-if="!book.amend">{{book.Class}}</td>

             <td v-else><select v-model="book.Class">
              <option value="历史">历史</option>
              <option value="军事">军事</option>
              <option value="科幻">科幻</option>
              <option value="武侠">武侠</option>
              <option value="仙侠">仙侠</option>
              <option value="奇幻">奇幻</option>
              <option value="灵异">灵异</option>
              </select>
             </td>

             <td v-if="!book.amend"><button @click="amendON(book.Id)">修改</button></td>
             <td v-else><button @click="amendOFF(book.Id)">确认</button></td>
          </tr>
      </table>
      <div id="page">
        <button @click="go(1)">上一页</button>
        当前页: <input type="text" v-model.number="index">
        <button @click="go(2)">下一页</button>
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
  name:'books',
  setup(){
    axios({
      method:'get',
      url:'http://127.0.0.1:5055/amendBooks'
    }).then(
      value =>{
        let a = [];
        let b = 15;
        for(var i=0;i<=value.data.length/b;i++){
            a.push([]);
            for(var j=0;j<=b-1;j++){
              if(value.data[i*b+j] != undefined){
                a[i][j] = value.data[i*b+j];
                a[i][j].amend = false;
              }
            }
        }
        data.allBook=data.books = a;
        data.on = true
      }
    )

    let data = reactive({
      allBook:[],
      books:[],
      index:1,
      amendON(id){
      //遍历当前 当前页数内对应的 books
      this.books[this.index-1].forEach(function(value,index){
        if(value.Id==id){
          data.books[data.index-1][index].amend = true;
        }
      })
      },
      amendOFF(id){
      //遍历当前 当前页数内对应的 books
      this.books[this.index-1].forEach(function(value,index){
        if(value.Id==id){
          axios({
            method:'post',
            url:'http://127.0.0.1:5055/amendBooks',
            data:value
          }).then(
            value =>{
              //将按钮重新置为 '修改'
              data.books[data.index-1][index].amend = false;
            }
          )
        }
      })
      },
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
      //搜索的内容
      sou:'',
      //使用什么搜索
      souClass:'Id',
      //控制初始加载时间
      on:false,
    })
  watch(()=>data.sou,(newValue,oldValue)=>{
    if(data.sou==''){
    //当搜索内容空时 将数据重置 同时退出循环
    return data.books = data.allBook
    }

    //这里使用一个变量保存 查找的类型
    let Class = data.souClass;
    //如果用户使用的书籍类型 搜索的话 Class = 'Class'(搜索保存的是 用户选择搜索的信息)
    if(data.souClass=='bookClass'){
      Class = 'Class';
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
            //这里的 Class 是作为对象的属性名使用
            if((data.allBook[i][j][Class]+'').indexOf(data.sou) != -1){
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
  #sou{
    margin-bottom:15px;
  }
  #sou input{
    width: 150px;
    margin-right:5px
  }
  #sou select{
    margin:0 10px
  }
  /* 提示没有搜索样式 */
  #nullTIP{
    text-align: center;
    margin-bottom: 50px;
  }

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