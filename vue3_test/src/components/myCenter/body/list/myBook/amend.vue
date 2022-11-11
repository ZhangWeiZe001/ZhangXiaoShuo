<template>
  <div v-if="on">
    <h1>修改书籍</h1>
    选择小说:<select>
      <option v-for="book in myBooks" key="book" @click="amend(book)">{{book.Name}}</option>
    </select>
  
    <div>
      <div>书籍名:
        <span v-if="cutInupt[0]" v-text="Book.Name"></span> 
        <input v-else type="text" v-model="Book.Name"> 
        <button v-if="cutInupt[0]" @click="cut(0)">修改</button>
        <button v-else @click="cut(0)">确认</button>
      </div> 
      <div>作者:
        <span v-if="cutInupt[1]" v-text="Book.Author"></span>
        <input v-else type="text" v-model="Book.Author">
        <button v-if="cutInupt[1]" @click="cut(1)">修改</button>
        <button v-else @click="cut(1)">确认</button>
      </div>
      
      <div>
        分类:
        <select v-model="Book.Class">
            <option value="历史">历史</option>
            <option value="军事">军事</option>
            <option value="科幻">科幻</option>
            <option value="武侠">武侠</option>
            <option value="仙侠">仙侠</option>
            <option value="奇幻">奇幻</option>
            <option value="灵异">灵异</option>
        </select>
      </div>

      <div>
        短简介:
        <span v-if="cutInupt[2]" v-text="Book.MiNiJianJie"></span>
        <input v-else type="text" style="width: 300px;" v-model="Book.MiNiJianJie">
        <button v-if="cutInupt[2]" @click="cut(2)">修改</button>
        <button v-else @click="cut(2)">确认</button>
      </div>

      <div>
        长简介:
        <p id="JianJie" v-if="cutInupt[3]"  v-text="Book.JianJie"></p>
        <textarea v-else style="width: 95%;height: 100px;margin:5px; padding:5px" v-model="Book.JianJie"></textarea>
        <br>
        <button v-if="cutInupt[3]" @click="cut(3)">修改</button>
        <button v-else @click="cut(3)">确认</button>
      </div>
      <button @click="deleteBook()">注销该书</button>
      <button id="save" @click="updata()">保存所有修改并上传</button>
    </div>
  </div>
  <h1 v-else>你没有任何的书籍</h1>
</template>

<script>
import axios from 'axios';
import {reactive,toRefs,ref,onMounted,inject} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
name:'Amend',
setup(){
  let reload = inject('reload')
  //拿到当前用户的 我的书籍
  axios({
    method:'post',
    url:'http://127.0.0.1:5055/getMyBook',
    data:{user:localStorage.getItem('userName')}
  }).then(
    value =>{
        //注这里会有两种情况(此处仅是提醒)
        //1.拿到id 再次发送 axios请求 拿到id对应的书籍
        //2.拿到false 这表示用户的我的书籍为 空   
        //但无论哪种情况 都将数据交给下一个 后端路由进行 处理
        axios({
          method:'post',
          url:'http://127.0.0.1:5055/getbooks',
          data:{myBooks:value.data}
        }).then(
          value =>{
            if(value.data[0].Name == 'null'){
              Amend.bookName = value.data[0].Name;
              return Amend.myBooks = value.data;
            }
            else{
              Amend.bookName= value.data[0].Name
              Amend.myBooks = value.data;
              //先这么写 后面会删掉
              Amend.Book = value.data[0]
          }
          Amend.on = true;
        }
      )
    }
  )

  let Amend = reactive({
    myBooks:[],
    bookName:'',
    Book:undefined,
    on :false,
    cutInupt:[true,true,true,true,true,true],
    //用于切换用户选择修改的小说
    amend(book){
      this.Book = book;
    },
    //控制 元素是否开启 input 框
    cut(index){
      this.cutInupt[index] = !this.cutInupt[index]
    },
    //向服务器 发送修改数据的请求
    updata(){
     axios({
      method:'post',
      url:'http://127.0.0.1:5055/setBook',
      data:{book:Amend.Book}
     }).then(
      value =>{
        alert('修改完毕')
        reload()
      }
      
     )
    },
    //删除书籍
    deleteBook(){
      //对用户进行一次提醒
     if(!confirm('警告!\n删除后无法复原 是否还要删除')) return 
     
     axios({
      method:'post',
      url:'http://127.0.0.1:5055/deleteBook',
      data:{Id:this.Book.Id},
     }).then(
      value =>{
        alert('删除完毕')
        //刷新当前页面
        reload()
      }
     )
    } 
   })

  return {
    ...toRefs(Amend),
  }
},
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

button{
  margin-left:10px
}

div{
  margin-top: 15px;
}

#JianJie{
  border: 1px solid black;
  height: 80px;
  padding: 5px;
  margin:5px;
  overflow:auto;
}

#save{
  margin-top: 10px;
  background-color: yellow;
}

</style>