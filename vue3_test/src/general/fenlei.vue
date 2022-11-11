<template>
  <div id="fenlei">
    <hr>
    <span href="" @click="goto('历史')">历史</span>
    <span href="" @click="goto('军事')">军事</span>
    <span href="" @click="goto('科幻')">科幻</span>
    <span href="" @click="goto('武侠')">武侠</span>
    <span href="" @click="goto('仙侠')">仙侠</span>
    <span href="" @click="goto('奇幻')">奇幻</span>
    <span href="" @click="goto('灵异')">灵异</span>
    <span href="" @click="goto('穿越')">穿越</span>
    <div id="sou">
      <i class="fas fa-play" @click="search()"></i>
      <input type="text" v-model="tag">
    </div>

    <hr>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive,toRefs,ref,inject} from 'vue';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';
export default {
 name:'FenLei',
 setup(){
  const $router = useRouter()
  const $store = useStore()
  //刷新当前页面
  let reload =inject('reload');
  let data = reactive({
    goto(Class){
      //将类型储存到本地方便读取
      localStorage.setItem('class',Class);
      $router.push('/bookSubarea')
      //下面的 方法用于 bookSubarea 中刷新页面(不会影响该组件原本的功能)
      reload();
    },
    //搜索功能栏
    tag:'',
    search(){
      if(this.tag.length<2){
        return alert('请输入两个及以上的字符')
      }
      $store.commit('SEARCH',this.tag);
      $router.push('/search');
      reload();
    }
  })
  return {
    ...toRefs(data)
  }
 }
}
</script>

<style scoped>
 a,span{
    margin: 0 10px;
    font-size: 16px;
    cursor: pointer;
 }
 #sou{
  float :right;
  text-align: center;
 }
 input{
  border: 1px rgba(0, 0, 0, 0.442) solid;
  margin-right: 15px;
  float :right;
 }
 i{
  float: right;
  font-size: 20px;
  margin-right: 15px;
  /* 光标变成手 */
  cursor: pointer;
 }
</style>