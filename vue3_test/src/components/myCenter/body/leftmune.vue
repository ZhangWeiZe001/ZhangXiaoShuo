<template>
    <ul>
       <router-link to ="/myCenter/My">
        <li class="list listTrue">
          <i class="fas fa-home fa-fw"></i>
          首页
        </li>
       </router-link>
     

       <li class="list">
         <router-link to ="/myCenter/myBook">
           <i class="fas fa-book fa-fw"></i>
           我的书籍
         </router-link>
        </li>

       <li class="list">
        <i class="fas fa-calculator"></i>
        账务中心
       </li>

       <li class="list">
        <i class="fas fa-archive"></i>
        我的红包
       </li>
       <router-link to="/myCenter/Set">
        <li class="list">
         <i class="fas fa-info fa-fw"></i>
         个人中心
        </li>
       </router-link>
       
    </ul>
</template>

<script>
export default {
name:'mune'
}
</script>

<style scoped>
 .list{
    font-size: 15px;
    width: 170px;
    height: 30px;
    padding: 0 25px;
    padding-top: 5px
 }
 
 .list:hover{
    background-color: rgba(1, 1, 1, 0.05);
    border: 1px solid rgba(1, 1, 1, 0.2);
 }
 ul{
    margin-top: 20px;
    float: left;
 }
</style>