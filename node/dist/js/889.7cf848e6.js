(self["webpackChunkvue3_test"]=self["webpackChunkvue3_test"]||[]).push([[889],{5889:function(e,o,t){"use strict";t.r(o),t.d(o,{default:function(){return B}});var r=t(6252),n=t(3577);const i=e=>((0,r.dD)("data-v-e178d7de"),e=e(),(0,r.Cn)(),e),a={key:0},u={id:"main"},s=i((()=>(0,r._)("div",{id:"main-top"},"个人书架",-1))),c=i((()=>(0,r._)("hr",null,null,-1))),d={key:0,id:"bookNull"},l={id:"bookBox"},p=["onClick"],m=["src"];function k(e,o,i,k,b,g){const f=(0,r.up)("top");return e.on?((0,r.wg)(),(0,r.iD)("div",a,[(0,r.Wm)(f),(0,r._)("div",u,[s,c,e.ifbookNull?((0,r.wg)(),(0,r.iD)("div",d,"现再书架内还没有书 快去找一本加入吧~~")):(0,r.kq)("",!0),(0,r._)("ul",l,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.bookBox,(o=>((0,r.wg)(),(0,r.iD)("li",{onClick:t=>e.gotobook(o),class:"book"},[(0,r._)("img",{src:t(8505)("./"+o.imgName),alt:"图片加载中"},null,8,m),(0,r._)("p",null,(0,n.zw)(o.Name),1)],8,p)))),256))])])])):(0,r.kq)("",!0)}var b=t(8985),g=t(9669),f=t.n(g),w=t(2262),v=t(3907),h=t(2201),_={name:"bookBox",components:{top:b.Z},setup(){const e=(0,v.oR)(),o=(0,h.tv)();let t=localStorage.getItem("userName");f()({method:"post",url:"http://127.0.0.1:5055/setUser",data:{user:t}}).then((e=>{if(!e.data.bookBox)return!1;let o=e.data.bookBox.replace(/\\/gi,"");return JSON.parse(o)})).then((e=>{e?f()({method:"post",url:"http://127.0.0.1:5055/myBookBox",data:{bookBox:e}}).then((e=>{if(!e.data)return r.bookBox=!1,r.ifbookNull=!0,void(r.on=!0);r.bookBox=e.data,r.on=!0})):(r.on=!0,r.ifbookNull=!0)}));let r=(0,w.qj)({bookBox:{},img:"1.webp",on:!1,ifbookNull:!1,gotobook(t){e.commit("CUN",{bookId:t.Id,bookName:t.Name}),localStorage.setItem("bookId",t.Id),o.push("/BookYe")}});return{...(0,w.BK)(r)}}},x=t(3744);const N=(0,x.Z)(_,[["render",k],["__scopeId","data-v-e178d7de"]]);var B=N},8985:function(e,o,t){"use strict";t.d(o,{Z:function(){return w}});var r=t(6252),n=t(3577);const i={id:"top"},a=(0,r.Uk)("张氏小说网"),u={key:0,id:"right"},s={key:1,id:"right"},c=(0,r.Uk)("你好:"),d=(0,r.Uk)("书架");function l(e,o,t,l,p,m){const k=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(k,{to:"/",id:"name"},{default:(0,r.w5)((()=>[a])),_:1}),e.on?((0,r.wg)(),(0,r.iD)("p",u,[(0,r._)("a",{href:"javascript:;",onClick:o[0]||(o[0]=(...o)=>e.register&&e.register(...o))},"登录")])):((0,r.wg)(),(0,r.iD)("p",s,[(0,r._)("span",null,[c,(0,r.Wm)(k,{href:"javascript:;",id:"user",to:"/myCenter"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,n.zw)(e.user),1)])),_:1})]),(0,r.Wm)(k,{to:"/bookBox",style:{"margin-right":"15px"}},{default:(0,r.w5)((()=>[d])),_:1}),(0,r._)("a",{href:"javascript:;",onClick:o[1]||(o[1]=(...o)=>e.registerdwon&&e.registerdwon(...o))},"退出")]))])}var p=t(2262),m=t(3907),k=t(2201),b={name:"Top",setup(){const e=(0,m.oR)(),o=(0,k.tv)();let t=(0,r.f3)("reload"),n=(0,p.qj)({on:!0,user:"",register(){o.push("/DengZhu")},registerdwon(){e.commit("REGISTERDWON"),localStorage.removeItem("userPending"),localStorage.removeItem("userName"),t()}}),i=localStorage.getItem("userPending");return i&&(n.on=!1,n.user=localStorage.getItem("userName"),e.commit("REGISTER",n.user)),{...(0,p.BK)(n)}}},g=t(3744);const f=(0,g.Z)(b,[["render",l],["__scopeId","data-v-67b26a6d"]]);var w=f},8505:function(e,o,t){var r={"./1.webp":978,"./2.webp":7581,"./3.webp":3251,"./4.webp":592,"./5.webp":1855};function n(e){var o=i(e);return t(o)}function i(e){if(!t.o(r,e)){var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=i,e.exports=n,n.id=8505},978:function(e,o,t){"use strict";e.exports=t.p+"img/1.5cdb435b.webp"},7581:function(e,o,t){"use strict";e.exports=t.p+"img/2.ea8faa4e.webp"},3251:function(e,o,t){"use strict";e.exports=t.p+"img/3.1dba689c.webp"},592:function(e,o,t){"use strict";e.exports=t.p+"img/4.d89db778.webp"},1855:function(e,o,t){"use strict";e.exports=t.p+"img/5.e0fc8241.webp"}}]);
//# sourceMappingURL=889.7cf848e6.js.map