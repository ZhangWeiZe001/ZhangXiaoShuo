<template>
    <div id="userMain">
  
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
        data.books = a;
      }
    )

    let data = reactive({
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