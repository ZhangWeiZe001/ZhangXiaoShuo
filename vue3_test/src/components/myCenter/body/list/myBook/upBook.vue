<template>
  <div id="upBook">
        <h1>上传书籍</h1>
        小说名:<input type="text" v-model="Name" @blur="blur()"><br> 
        <p v-if="examineBook" id="examineBook">该书名已经被使用</p>
        作者名:<input type="text" v-model="Author"><br>
        书籍类型:<select v-model="Class">
            <option value="历史">历史</option>
            <option value="军事">军事</option>
            <option value="科幻">科幻</option>
            <option value="武侠">武侠</option>
            <option value="仙侠">仙侠</option>
            <option value="奇幻">奇幻</option>
            <option value="灵异">灵异</option>
        </select><br>
        书籍短简介:<input style="width:300px" type="text" v-model="MiNiJianJie"><br><br>
        书籍简介:<br>
        <textarea id="longJian" v-model="JianJie"></textarea><br>
        <input type="file"  @change.prevent.stop="show"/> 
        <button @click="uploading()">上传</button>
    </div>
</template>

<script>
import axios from 'axios';
import {reactive,toRefs,ref} from 'vue';

export default {
 name:'upBook',
 setup(){
    let upBook = reactive({
    //用于控制显示的 功能项
    Name:'',
    Author:'',
    MiNiJianJie:'',
    JianJie:'',
    Class:'历史',
    bookData:'',
    user:localStorage.getItem('userName'),
    //判断书名是否被使用
    examineBook:false,
    //读取 文件中的内容
    show(event){
      let file= event.target.files[0];
      // 创建读取器
      var reader = new FileReader();
      // 开始读取
      reader.readAsText(file);
      // 文件读取完成后，获取读取的结果
      reader.onload = function() {
        upBook.bookData = reader.result;
      }
    },
    //失去焦点
    blur(){
      axios({
        method:'post',
        url:'http://127.0.0.1:5055/examineBook',
        data:{Name:this.Name}
      }).then(
        value=>{
          //如果可以将 提醒重复隐藏 反之则显示
          if(value.data){
            this.examineBook = false;
          }else{
            this.examineBook = true;
          }
        }
      )
    },
    //储存书籍
    uploading(){
      if(this.examineBook){
       return alert('该书名已经被使用')
      }
      //将书籍储存
      axios({
        method:'post',
        url:'http://127.0.0.1:5055/uploading',
        data:{data:upBook}
      }).then(
        value =>{alert('上传完毕~')}
      )
    }
   })
   return {
    ...toRefs(upBook)
   }
 }
}
</script>
<style scoped>

h1{
text-align: center;
}

input[type=text],textarea{
margin-top: 15px;
border: 1px black solid;
font-size: 16px;
}

select{
margin-top: 15px;
}
#longJian{
margin-left: 5px;
width: 80%;
height: 100px;
}

#switchover{
margin-top: 15px;
}
#switchover>button{
margin-right:5px
}
/* 书籍是否能被使用 */
#examineBook{
  margin-top:5px;
  margin-left: 100px;
  color: red;
}
</style>