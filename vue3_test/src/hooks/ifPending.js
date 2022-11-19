import Vrouter from '@/router/router'

export default{ 
    ifPending(){
      const vrouter = Vrouter;
      //当用户没有登录(本地储存的登录状态不为 true时 就提醒一下同时返回主页面)
      if(!localStorage.getItem('userPending')){
        alert('您还没有登录,请登录')
        vrouter.push('/')
      }      
    }
}