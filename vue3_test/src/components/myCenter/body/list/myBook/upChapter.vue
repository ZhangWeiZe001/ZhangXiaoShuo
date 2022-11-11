<template>
  <div id="upChapter" v-if="on">
    <h1>上传章节</h1>
    选择小说:<select v-model="bookName">
        <option v-for="book in myBooks" key="book" @click="getBookId(book.Id)">{{book.Name}}</option>
    </select>
    <br>
    章节名:<input type="text" v-model="Chapter">
    <br>
    <br>
    <p>章节内容</p>
    <textarea id="longJian" v-model="bookText"></textarea>
    <br>
    <br>
    <button @click="upChapter()">上传该章节</button>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive,toRefs,ref,inject} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
 name:'upChapter',
 setup(){
  let reload = inject('reload')
  //获取初始数据
   axios({
    method:'post',
    url:'http://127.0.0.1:5055/getMyBook',
    data:{user:localStorage.getItem('userName')}
  }).then(
    value =>{
        //拿到id 再次发送 axios请求 拿到id对应的书籍
        upChapter.myBooks =  value.data;
        upChapter.on=true
        axios({
          method:'post',
          url:'http://127.0.0.1:5055/getbooks',
          data:{myBooks:upChapter.myBooks}
        }).then(
          value =>{
            if(value.data[0].Name == 'null' || value.data ==undefined){
              upChapter.bookName = value.data[0].Name;
              return upChapter.myBooks = value.data;
            }
            else{
            upChapter.myBooks = value.data;
            upChapter.bookName = upChapter.myBooks[0].Name;
            upChapter.BookId = upChapter.myBooks[0].Id;
            }
          }
        )
    }
   )

   let upChapter = reactive({
    //准备数据
    myBooks:[],
    //下拉列表框的初始值
    bookName:'',
    on:false,
    //章节名
    Chapter:'',
    //内容
    bookText:'',
    //当前修改的id
    BookId:'',
    //当用户点击 下拉框时获取id
    getBookId(id){
      this.BookId = id
    },
    //上传章节
    upChapter(){
      //先对判断是否能进行操作
      if(this.bookText == '' ||this.Chapter ==''){
        return alert('内容或章节名不能为空')
      }else if(this.Chapter.search(/^\d/) != -1){
        return alert('章节名开头不能使用 数字')
      }else if(this.bookName =='null'){return alert('不能给不存在的书添加新章节')}
      axios({
        method:'post',
        url:'http://127.0.0.1:5055/upChapter',
        data:{
          Id:this.BookId,
          Chapter:this.Chapter,
          bookText:this.bookText
        }
      }).then(
        value =>{
          alert(value.data);
          //刷新该页面
          reload();
        }
      )
    }
   })

    return{
        ...toRefs(upChapter)
    }
 }
 
}
</script>

<style scoped>

h1{
  text-align: center;
}

h3{
 margin-top: 15px;
}

input[type=text],textarea{
margin-top: 15px;
border: 1px black solid;
font-size: 16px;
}

#longJian{
 margin-left:15px;
 padding: 5px;
 width: 80%;
 height: 200px;
 overflow: auto;
}
</style>