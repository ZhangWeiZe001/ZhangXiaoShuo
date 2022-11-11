//引入VueRouter
import {createRouter,createWebHistory} from 'vue-router'
//引入路由器
import  routes from './router'
//创建路由实例对象
const router = new createRouter({
  history:createWebHistory(),
  routes,
})

export default router