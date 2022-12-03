<template>
    <div @click="shezhi" style="cursor:pointer">
        <i class="fas fa-cog fa-fw" style="font-size:20px"></i>
        <p>设置</p>
    </div>    
    <div id="SheBox" v-show="SheBox">
        <h2>设置</h2>
        <div id="color">
            <p style="font-size:18px;float: left;margin-right: 15px;">背景颜色:</p> 
            <span title="默认" style="background-color: rgb(237,231,218);"   @click="bianse('rgb(237,231,218)')"></span>
            <span title="牛皮纸" style="background-color: rgb(246,237,212);" @click="bianse('rgb(246,237,212)')"></span>
            <span title="淡绿色" style="background-color: rgb(232,244,232);" @click="bianse('rgb(232,244,232)')"></span>
            <span title="淡蓝色" style="background-color: rgb(230,243,244);" @click="bianse('rgb(230,243,244)')"></span>
            <span title="淡粉色" style="background-color: rgb(244,232,230);" @click="bianse('rgb(244,232,230)')"></span>
        </div>
    </div>
</template>

<script>
import {reactive,toRefs,ref,inject,onBeforeUnmount} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

export default {
name:'SheBox',
emits:['mainRGB'],
setup(props,context){
    let data= reactive({
       SheBox:false,
       //设置开关
       shezhi(){
        //取反
        data.SheBox = !data.SheBox
       },
       //变色
       bianse(rgb){
        
        context.emit('mainRGB',rgb)
        }
    })

    return{
        ...toRefs(data),
    }
}
}
</script>

<style scoped>
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

#color{
 margin-top: 15px;
}

#color span{
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