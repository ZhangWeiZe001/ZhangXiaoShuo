<template>
  <Top></Top>
  <div id="main">
    <span class="fen on">用户管理</span>
    <span class="fen">书籍管理</span>
    <div id="content">
      <User></User>
    </div>
  </div>
</template>

<script>

import Top from './top.vue'
import User from './constext/user.vue'
export default {
name:'Administrator',
components:{Top,User},
}
</script>

<style scoped>
#main{
  margin:0 10%;
  margin-top:30px;
}
.fen{
  margin-right: 1px;
  padding: 0 3px;
  background: white;
  border-top: 1px black solid;
  border-left: 1px black solid;
  border-right: 1px black solid;
  font-size: 18px;  
  position: relative;
  top: 1px;
}
.on{
  background-color: #bfc;
}
#content{
  border: 1px black solid;
}
</style>