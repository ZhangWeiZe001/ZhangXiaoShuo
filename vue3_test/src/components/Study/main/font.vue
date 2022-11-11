<template>
  <div id="shezhi">
    <ul>
        <li>
            <!-- 该div没有作用 仅裹元素使用 (不能给li上这个方法)-->
            <div @click="shezhi" style="cursor:pointer">
             <i class="fas fa-cog fa-fw" style="font-size:20px"></i>
             <p>设置</p>
            </div>    
            <div id="SheBox" v-show="box.SheBox">
                <h2>设置</h2>
                <div>
                   <p style="font-size:18px;float: left;margin-right: 15px;">背景颜色:</p> 
                   <span title="默认" style="background-color: rgb(237,231,218);"   @click="bianse('rgb(237,231,218)')"></span>
                   <span title="牛皮纸" style="background-color: rgb(246,237,212);" @click="bianse('rgb(246,237,212)')"></span>
                   <span title="淡绿色" style="background-color: rgb(232,244,232);" @click="bianse('rgb(232,244,232)')"></span>
                   <span title="淡蓝色" style="background-color: rgb(230,243,244);" @click="bianse('rgb(230,243,244)')"></span>
                   <span title="淡粉色" style="background-color: rgb(244,232,230);" @click="bianse('rgb(244,232,230)')"></span>
                </div>
            </div>
        </li>
        <li>
          <!-- 后期换路由 -->
          <a href="">
            <i class="fas fa-home fa-fw" style="font-size:20px"></i>
            <p>首页</p>
          </a>  
        </li>
    </ul>
  </div>

  <div id="font">
    <h2>{{book.thereMu[1]}}</h2>
     <p style="word-wrap:break-word;word-break:break-all;" v-for="(neirong,index) in book.neirong">{{neirong}}</p>
     
  </div>
   
  <div id="Zhang">
    <a href="JavaScript:;" @click="front">上一章</a>
    <a href="javascript:;" @click="gotomulu">目录</a>
    <a href="JavaScript:;" @click="later">下一章</a>
  </div>
  
  <div id="jieshao">
    <p>其他推荐</p>
    <div> 
        <!-- 后期可以改成a标签 -->
        xxx xxx xx xxxxx xxxxx xxxx
    </div>
  </div>
  <div id="box"> </div>
</template>

<script>
import {reactive,toRefs,ref,inject,onBeforeUnmount} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
export default {
 name:'Font',
 //声明接收自定义事件
 emits:['mainRGB'],
 setup(props,context){
    //导入路由
    const $router = useRouter();
    //导入vuex
    const $store = useStore();
    
    let data = reactive({
      box:{
        SheBox:false,
      },
    })
    
    //关于设置的方法都写在这个对象中
    let Sheboxfunction={
       //设置开关
       shezhi(){
        //取反
        data.box.SheBox = !data.box.SheBox
       },
       //变色
       bianse(rgb){
        context.emit('mainRGB',rgb)
        }
    }

    //接收 祖先组件传递过来的小说内容
    let book = inject('book').book;

    //对拿到的数据进行加工
      //去除小说顶部的章节名
    book.neirong = book.neirong.replace(book.thereMu[1],'');
      //拆小说字符串 效果: 将整个字符串 以 换行(\n) 切开成为数组
    book.neirong = book.neirong.split('\n')
    data.book = book;
    
    //拿到网页刷新方法(准确说是刷新一次app模板)
    let reload =inject('reload');
    //前后跳转前后页面的方法
    let goto = {
      front(){
        if(!book.thereMu[0]) {return alert('这已经是第一章了')}
        $store.commit('GETMULU',{muluName:book.thereMu[0]})
        reload();
      },
      later(){
        if(!book.thereMu[2]) {return alert('这已经是最后一章了')}
        $store.commit('GETMULU',{muluName:book.thereMu[2]})
        reload();
      },
      gotomulu(){
        //跳转到 目录
        $router.push('/BookYe')
      }
    }

    return{
        ...toRefs(data),
        //交出关于设置的方法(使用解构赋值)
        ...Sheboxfunction,
        ...goto,
    }
 },
}
</script>

<style scoped>

#font{
    margin: 0 25%;
    background-color: rgb(247,242,232);
    border: 1px rgb(216,216,216) solid;
}

#font p{
   text-align: left;
   line-height : 1.846em;
   margin: 30px 20px;
   font-size: 16px;
   overflow:hidden,
}

#font h2{
   text-align: center;
}
#box{
  height: 400px;
  width: 200px;
}
/* 控制上下章与回到书籍页 */
#Zhang{
  margin: 0 25%;
  margin-top: 45px;
  background-color: rgb(247,242,232);
  border: 1px rgb(216,216,216) solid;
}

#Zhang>a{
    display: inline-block;
    padding:0 13%;
    line-height: 70px;
}

/* 解决脱离高度塌陷 */
#Zhang::after{       /*关键 ::after 为元素 表示一个元素最末端*/
content: '';	/*设置一个空字符 如不不设置 会失效*/            
display:block;  /*将 after元素 转化为块元素(默认时行内元素)*/
clear:both;     /*关键 使用clear属性 撑开上外边距 上外边距的值 永远= box2的高*/
}

/* 介绍 */
#jieshao{
    margin: 0 25%;
    margin-top: 35px;
}

#shezhi{
  position: fixed;
  left: 20%;
}

#shezhi li{
 text-align: center;
 width: 50px;
 padding:5px 0;
 height: 50px;
 background-color: rgb(247,242,232);
 border: 1px rgb(216,216,216) solid;
}

/* 设置盒子的样式 */
#SheBox{
 position: absolute;
 left: 48px;
 top:-0px;
 text-align: left;
 float: left;
 width: 500px;
 height: 300px;
 padding-top: 30px;
 padding-left: 30px;
 background-color: rgb(247,242,232);
 border: 1px rgb(216,216,216) solid;
 box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3)
}

#SheBox>div{
 margin-top: 15px;
}

#SheBox>div span{
 /* 颜色在内联中 */
 display: block;
 float: left;
 margin-right: 15px;
 border: 1px rgb(216,216,216) solid;
 border-radius:50%;
 width: 30px;
 height:30px;
 /* 变手 */
 cursor:pointer;
}
</style>