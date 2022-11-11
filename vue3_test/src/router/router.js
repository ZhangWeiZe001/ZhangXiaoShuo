import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router'

const routes= [
  //首页
  {
    name:'Home',
    path:'/',
    component:()=>import('@/components/Home/home.vue')
  },
  //书籍介绍页路由
  {
    name:'BookYe',
    path:'/BookYe',
    component:()=>import('@/components/bookYe/bookYe.vue'),
  },
  //书籍阅读页面
  {
    name:'Study',
    path:'/study',
    component:()=> import('@/components/Study/study.vue')
  },
  //书籍登录页面
  {
    name:'DengZhu',
    path:'/DengZhu',
    component:() => import('@/components/DengZhu/DengZhu.vue')
  },
  //个人中心页面
  {
    name:'myCenter',
    path:'/myCenter',
    component:()=> import('@/components/myCenter/main.vue'),
    //二级路由
    children:[
      {
        name:'My',
        path:'My',
        component:()=> import('@/components/myCenter/body/list/my.vue')
      },
      {
        name:'Set',
        path:'Set',
        component:()=> import('@/components/myCenter/body/list/set.vue')
      },
      {
        name:'myBook',
        path:'myBook',
        component:()=>import('@/components/myCenter/body/list/myBook/myBook')
      }
    ]
  },
  //个人书架页面
  {
    name:'bookBox',
    path:'/bookBox',
    component:()=>import('@/components/bookBox/main.vue')
  },
  //书籍分区页面
  {
    name:'bookSubarea',
    path:'/bookSubarea',
    component:()=>import('@/components/bookSubarea/bookSubarea.vue')
  },
  //搜索书籍页面
  {
    name:'search',
    path:'/search',
    component:()=>import('@/components/search/search.vue')
  }
]

const router = new createRouter({
    mode:'hash',
    //createWebHashHistory 使用这个表示 hash方式
    // history:createWebHashHistory(),

    //createWebHistory 表示 History 模式
    history:createWebHistory(),
    routes,
})

export default router