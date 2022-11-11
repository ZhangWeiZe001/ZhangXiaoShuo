<template>
  <div id="lunLeft">
    <p style="color: red; font-size: 25px;">近期热门</p> 
    <!-- 之后补上 -->
    <ul>
      <li v-for="(value,index) in 5" key="index">
       <a href="">.......</a>
       <br>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
 name:'Lunleft'
}
</script>

<style scoped>
#lunLeft{
  float:left;
  width: 30%;
  margin-right: 2%;
  height: 300px;
  border: 1px black solid;
  text-align: center;
}

</style>
