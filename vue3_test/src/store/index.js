import {createStore} from 'vuex'

export default createStore({
    state:{
        //书籍的信息(后期有时间可以改为对象)
        bookId:'10015',
        bookName:'',
        muluName:'',
        //用户信息与状态
        user:{
            user:null,
            pending:false
        },
        search:'没有任何搜索信息',
    },
    
    actions:{

    },

    mutations:{
        //修改 当前阅读的书籍 
        CUN(state,value){
            state.bookId = value.bookId;
            state.bookName = value.bookName;
        },
        //修改state中的目录
        GETMULU(state,value){
            state.muluName = value.muluName;
        },

        //登录(用于用户登录)
        REGISTER(state,value){
            state.user.user = value;
            state.user.pending = true;
            //存入浏览器本地
        },
        //退出登录
        REGISTERDWON(state,value){
            state.user.user = null;
            state.user.pending = false;
        },
        //修改搜索信息
        SEARCH(state,value){
            state.search = value; 
        }
    },

    modules:{
        
    }
});