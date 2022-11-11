<template>
  <div id="bookJianJie">
    <h1>作品信息</h1> 
    <div id="jianjie">
        <p>  
        &nbsp;&nbsp;&nbsp;&nbsp;{{Jian}}
        </p>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
name:'BookJianJie',
props:['JianJie'],
setup(props){
  //删除所有的\n\r
  let Jian = ref(props.JianJie.replace(/[\\n\\r]/ig,'')) 
  return{Jian}
}
}
</script>

<style scoped>
#bookJianJie{
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px black solid;
    border-top: 1px black solid;
}
#jianjie{
 margin-top: 15px;
 padding-left: 30px;
 font-size: 16px;
}

#jianjie>p{
    padding: 0 25px;
}
</style>