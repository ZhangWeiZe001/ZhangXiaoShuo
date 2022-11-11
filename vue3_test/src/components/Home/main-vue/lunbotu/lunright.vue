<template>
  <div id="lunright">
     <h2>优秀作家</h2><br>
     <li v-for="(value,index) in 5" key="index">
       <a href="">.......</a>
       <br>
      </li>
  </div>
</template>

<script>
export default {
 name:'LunRight',
}
</script>

<style scoped>
#lunright{
  float: left;
  text-align: center;
  margin-left: 2%;
  width: 15%;
  height: 300px;
  border: 1px black solid;  
}

a{
 padding-top: 5px;
 /* display: block; */
 color: blue;
 font-size: 18px;
}

</style>