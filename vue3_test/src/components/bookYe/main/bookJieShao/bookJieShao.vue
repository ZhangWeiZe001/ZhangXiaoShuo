<template>
  <div id="jie-main" v-if="on">
    <div id="jie-main-left">
      <img :src="require('@/assets/bookFeng/'+book.imgName)" alt="图片加载中">
    </div>
    <div id="jie-main-right">
      <div id="oneLine">
        <h1>{{book.Name}}</h1>
        <p style=" cursor:pointer;" @click="goToAuthor(book.Author)">{{book.Author}}</p>
     </div>
     
     <div id="twoLine">
         <span>分类</span> <span style="cursor:pointer; color:gold" @click="gotoClass(book.Class)">{{book.Class}}</span>      
     </div>

     <div id="threeLine">
        <!-- 小说一行关键介绍 -->
        <h3>{{book.MiNiJianJie}}</h3>
     </div>
     
     <div id="fourLine">
        <span style="color:red;font-size:20px;">{{book.mulu.length*0.31}}</span> 万字
     </div>

     <div id="fiveLine">
       <a @click="lookBook">开始阅读</a>

       <a v-if="ifbookBox" @click="joinbookBox(book.Id)">加入书架</a>
       <a v-else @click="Unsubscribe(book.Id)">取消订阅</a>

     </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import {reactive,toRefs,toRaw,inject} from 'vue'
import {useStore} from 'vuex'
import axios from 'axios';
  
export default {
  name:'BookJieShao',
  props:['book'],
  setup(props){
    axios({
      method:'post',
      url:'http://127.0.0.1:5055/ifbookBox',
      data:{user:localStorage.getItem('userName'),bookId:localStorage.getItem('bookId')}
    }).then(
      value =>{
        if(value.data){
          data.ifbookBox = value.data;
        }else{
          data.ifbookBox = value.data;
        }
        data.on=true
      }
    )
    //刷新当前组件
    let reload =inject('reload');
    //准备路由
    let $router = useRouter();
    //准备vuex
    let store = useStore()

    let data = reactive({
      label:['标签1'],
      book:props.book,
      ifbookBox:false,
      on:false,
      //加入书架
      joinbookBox(bookId){
        axios({
          method:'post',
          url:'http://127.0.0.1:5055/joinbookBox',
          data:{user:localStorage.getItem('userName'),bookId}
        }).then(
          value =>{
            //表示已经 加入书架
            data.ifbookBox = false;
          }
        )
      },
      //取消订阅
      Unsubscribe(bookId){
        axios({
          method:'post',
          url:'http://127.0.0.1:5055/Unsubscribe',
          data:{user:localStorage.getItem('userName'),bookId}
        }).then(
          value =>{
            //表示可以再次订阅该书
            data.ifbookBox = true;
          }
        )
      },
      //跳转至作者
      goToAuthor(author){
      //向数据库写入信息
      localStorage.setItem('author',author)
      $router.push('/author')
    
      },
      //跳转至分类
      gotoClass(Class){
      //将类型储存到本地方便读取
      localStorage.setItem('class',Class);
      $router.push('/bookSubarea')
      //下面的 方法用于 bookSubarea 中刷新页面(不会影响该组件原本的功能)
      reload();
    },
    })

    function lookBook(){
      store.commit('GETMULU',{muluName:data.book.mulu[0]});
      $router.push('/study')
    }

    return {...toRefs(data),lookBook}
  }
}
</script>

<style scoped>
 #jie-main{
   padding: 0 40px;
   width: 100%;
   border: 1px rgba(0, 0, 0, 0.225) solid;
 }
 /* 解决高度塌陷 */
 #jie-main::after{       /*关键 ::after 为元素 表示一个元素最末端*/
    content: '';	/*设置一个空字符 如不不设置 会失效*/            
    display:block;  /*将 after元素 转化为块元素(默认时行内元素)*/
    clear:both;     /*关键 使用clear属性 撑开上外边距 上外边距的值 */  
  }

  #jie-main-left{
    float: left;
  }
 #jie-main-left>img{
    margin: 10px 0;
    width: 150px;
    height: 250px;
    float: left;
    /* 设置阴影 */
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3)
 }
 /* 设置介绍栏右侧 */
 #jie-main-right{
    margin-left: 20px;
    float: left;
 }
 /* 设置第一行下的样式 */
 #oneLine>h1{
    float: left;
 }
 #oneLine>p{
    margin-left: 25px;
    float: left;
    padding-top:15px;
    color: lightgrey;
 }

 /* 设置第二行的样式*/
 #twoLine{
   margin-top: 50px;
 }
 /* 设置第第三行样式 */
 #threeLine{
    margin-top: 25px;
 }
 /* 设置第四行样式 */
 #fourLine{
    margin-top: 22px;
 }
 /* 设置第五行的样式 */
 #fiveLine{
    margin-top: 25px;
 }
 #fiveLine>a{
    color: rgb(114, 125, 251);
    text-align: center;
    width: 150px;
    line-height: 30px;
    border: 1px rgb(114, 125, 251) solid;
    float: left;
    margin-right: 15px ;
 }
 #fiveLine>a:hover{
    background-color: rgba(114, 125, 251,0.1);
 }
</style>