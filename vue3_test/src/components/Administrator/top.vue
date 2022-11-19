<template>
  <div id="top">
   <router-link to="/" id="name">张氏小说网</router-link>
  </div>
</template>

<script>

export default {
 name:'Top',
 setup(){

 },
}
</script>

<style scoped>
#top{
  line-height: 50px;
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 0 80px;
}

#name{
  color: white;
}

#right{
  float:right
}
#right>a{
  color: white;
  font-size: 16px;
}
#right>span{
  margin-right: 15px;
  color: rgb(255, 255, 255);
  font-size: 16px;
}
#user{
  color: blue;
  margin-left: 10px;
}
</style>