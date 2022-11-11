//引入的 是一个 名称为 createApp 的工程函数
import { createApp } from 'vue'
//引入Vuex
import store from './store/index'
//引入路由
import router from './router/router.js'
//引入字体图标库
import '@/assets/iconfont/css/all.css'

import App from './App.vue'

createApp(App)
.use(store) //安装 vuex
.use(router)//安装 路由器
.mount('#app')
