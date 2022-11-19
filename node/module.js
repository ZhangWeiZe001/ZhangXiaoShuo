const express = require('express'); //1 导入 express模块
const router = express.Router() //2 创建路由对象
const cors = require('cors');
const mssql = require('mssql');
//
const session = require('express-session')
//读取资源
const fs = require('fs');
const path = require('path');
const { strict } = require('assert');
const { send } = require('process');

// const { request } = require('express'); 上面如果有这个 见到就删 否则会报错
/* 
中间件
*/
//解析 json
router.use(express.json());
router.use(express.urlencoded({extended:false}));
//跨域
router.use(cors());
//启用 session 中间件
router.use(session({
  secret:"keyboard cat", // secret 的属性值可以是任意字符串
  resave:false ,         //固定写法
  saveUninitialized:true //固定写法
}))

//配置数据库
const config = {
  user:'sa',
  password:'sa',
  server:'127.0.0.1',
  //链接的数据集
  database:'XiaoShuo',
  //encrypt 是否加密
  encrypt: false ,
}

//试链接数据
mssql.connect(config,(err)=>{
  if(err) console.log(err)
  else console.log('数据库链接成功!!');
  return request = new mssql.Request();
})

//提取小说的目录数据
router.post('/loadBook/get',(req,res)=>{
  //提取传递来的数据
  let body = req.body;
  let bookURL;
  let book;
  //设置数据库查询语句
  let sql = `select * from book where id='${body.id}'`;
  new Promise((resolve,reject)=>{
    request.query(sql,(err,data)=>{
      book = data.recordset[0];
      bookURL  = data.recordset[0].bookURL;
      //调用成功的回调
      resolve('成功')
    })
  }).then(
    value =>{
      //返回目录
      fs.readFile(bookURL,'utf-8',(err,data)=>{
        //将JSON转换为对象类型
        data = JSON.parse(data);

        //返回拆出的目录名
        book.mulu = Object.keys(data)
        res.send(book);
      })
    }
  )
})

//提取小说的内容数据
router.post('/loadBook',(req,res)=>{
  let body = req.body //将前端发来的数据保存到body中
  let book={} //准备发送 书籍的内容
  let neirong //准备内容
  let sql = `select * from book where id='${body.id}'`;
  new Promise((resolve,reject)=>{
    request.query(sql,(err,data)=>{
      if(err) {return console.log('数据库查询出错');}
      neirong  = data.recordset[0].bookURL;
      //调用成功的回调
      resolve('成功')
    })
  }).then(
    value => {
      fs.readFile(neirong,'utf-8',(err,data)=>{
        //返回检索到的小说 章节内容
        data = JSON.parse(data)
        book.neirong = data[body.mulu];
        
        //拆出目录名
        let mulus = Object.keys(data);
        //准备接收三张章节名
        let thereMu =['','',''];
        //准备前当后 章节的章节名
        for (let i = 0; i < mulus.length; i++) {
          if(body.mulu == mulus[i]){
            //判断是否有上一章
            if(i-1<0) {thereMu[0] = undefined}
            else{thereMu[0] = mulus[i-1]}
            //判断是否有下一章
            if(i+1 ==mulus.length) {thereMu[2] = undefined} 
            else {thereMu[2] = mulus[i+1]}

            thereMu[1] = mulus[i]
            book.thereMu = thereMu;
          }
        }
        //返回book数据
        res.send(book)
      })
    }
  )
})

//测试用户账号是否重复
router.post('/usertest',(req,res)=>{
  let user = req.body.user;
  let sql = `select * from consumer where [user]='${user}'`;
  //向数据库发送查询请求
  request.query(sql,(err,data)=>{
    //如果为false 则表示没有重复 如果为ture 则表示搜索到了内容
    if(data.recordset[0]) {
      res.send(false);
    }else{res.send(true)}
  })
})

//将账号和密码 存入数据库中
router.post('/landUser',(req,res)=>{
  let body = req.body;
  let sql = 
  `
  insert into consumer([user],password)
  values ('${body.user}','${body.password}')
  `
  request.query(sql,(err,data)=>{
    //如果发送了错误则返回 false
    if(err){return res.send(false)}
    //正常则返回true
    res.send(true)
  })
})

//登录
router.post('/register',(req,res)=>{
  let body = req.body;
  let sql = `
  select * from consumer 
  where [user] = '${body.user}'
  `;
  //向数据库发送查询语句
  request.query(sql,(err,data)=>{
    //如果为false 则表示没有重复 如果为ture 则表示搜索到了内容
    if(data.recordset[0]) {
      //如果密码正确 则返回状态为 ture 表示可以登录
      if(data.recordset[0].password == body.password){
        return res.send({padding:true})
      }else{
        return res.send({padding:false,err:'密码输入错误'})
      }
    }else{
      res.send({padding:false,err:'未找到此账号'})
    }
  })

})

//读取用户的信息
router.post('/setUser',(req,res)=>{
  let sql = `
  select * from consumer 
  where [user] = '${req.body.user}'
  `;

  request.query(sql,(err,data)=>{
    res.send(data.recordset[0])
    }
  )
})

//保存用户修改的信息(后续可能会续写)
router.post('/setName',(req,res)=>{
  let sql = `
  update consumer set
  name = '${req.body.name}'
  where [user] ='${req.body.user}'
  `
  request.query(sql,(err,data)=>{
    //此处数据库代码必定执行成功
    res.send(true);
    }
  )
})

//将 三种推荐 发给页面
router.get('/getRecommend',(req,res)=>{
  fs.readFile(path.join(__dirname+'/sundry/Recommend.JSON'),(err,data)=>{
    //将数据发送给页面
    res.send(data)
  })
})

//将三种推荐中的 书籍在数据库中找到并且发送给页面
router.post('/Recommend/getBook',(req,res)=>{
  //准备数据
  let recommendBook={};

  let sql = `select * from book
  where `;

  //使用遍历器
  for(let value of req.body.goodBook){
    //注: 这里需要将空格加在 id前面 否则正则无法通过 $量词删除最后的 or
    sql += ` id='${value}' or`
  }
  //删去最后一个 or
  sql = sql.replace(/(or)$/g,'')
  //链式回调
  new Promise((resolve,reject)=>{
    request.query(sql,(err,data)=>{
      recommendBook.goodBook = data.recordset;
      resolve('ok');
    })
  }).then(
    value =>{
      let sql = `select * from book where `;
      for(let value of req.body.newBook){sql += ` id='${value}' or`}
      sql = sql.replace(/(or)$/g,'')

      request.query(sql,(err,data)=>{
        recommendBook.newBook = data.recordset;
      })
      return('ok')
    }
  ).then(
    value=>{
      let sql = `select * from book where `;
      for(let value of req.body.dayBook){sql += ` id='${value}' or`}
      //删去最后一个 or
      sql = sql.replace(/(or)$/g,'')

      request.query(sql,(err,data)=>{
        recommendBook.dayBook = data.recordset;
        res.send(recommendBook);
      })
    }
  )
})

//获取用户 书架内对应的所有书
router.post('/myBookBox',(req,res)=>{

  let bookBox = req.body.bookBox;
  let sql = `select * from book
  where `;

  //使用遍历器
  for(let value of bookBox){
    //注: 这里需要将空格加在 id前面 否则正则无法通过 $量词删除最后的 or
    sql += ` id='${value}' or`
  }
  //删去最后一个 or
  sql = sql.replace(/(or)$/g,'')

  request.query(sql,(err,data)=>{
    //返回数据
    //如果data 的取反为 真 则说明这个查询语句没有查询到任何东西
    //所以返回一个 false
    if(!data){
      return res.send(false)
    }
    res.send(data.recordset);
  })

})

//通过书籍id 找到该书籍的数据(仅能接收一个非数组 返回一个书籍的信息)
router.post('/getbook',(req,res)=>{
  let sql = `
  select * from book
  where Id = '${req.body.Id}'
  `
  request.query(sql,(err,data)=>{
    //返回数据
    res.send(data.recordset[0]);
  })
})

//通过用户的 id 和本书的信息 判断用户是订阅了某本书
router.post('/ifbookBox',(req,res)=>{
  let sql = `
  select * from consumer
  where [user] = '${req.body.user}'
  `
  request.query(sql,(err,data)=>{
    //返回数据
    //如果书架数据为 undefined 则直接结束该函数并返回 true
    if(data.recordset[0]==undefined) {return res.send(true)}
    let bookBox = data.recordset[0].bookBox;
    let reg = new RegExp(req.body.bookId);
    
    //如果 没有有这个纪录返回ture 有返回false
    if(bookBox.search(reg) == -1){
      res.send(true);
    }else{res.send(false)}
  })
})

//将用户新加入书架的书籍 录入数据库
router.post('/joinbookBox',(req,res)=>{
  let sql = `
  select * from consumer
  where [user] = '${req.body.user}'
  `
  //查询该用户的 书架信息 并添加新加入的书籍
  request.query(sql,(err,data)=>{
    let bookBox
    if(data.recordset[0].bookBox){
      //如果不为空的话直接作为 JSON开始 加工
      bookBox = JSON.parse(data.recordset[0].bookBox);
      bookBox.push(req.body.bookId+"");
      bookBox = JSON.stringify(bookBox);
    }else{
      //如果为空省去解析JSON 新建一个数组 并转换为JSON
      bookBox = [`${req.body.bookId}`];
      bookBox = JSON.stringify(bookBox);
    }
    

    sql = `update consumer set 
    bookBox = '${bookBox}'
    where [user] = '${req.body.user}'`
    request.query(sql,(err,data)=>{
      if(err){return console.log(err);}
      res.send('ok')
    })
  })
})

//取消订阅
router.post('/Unsubscribe',(req,res)=>{
  let sql = `
  select * from consumer
  where [user] = '${req.body.user}'
  `
  //查询该用户的 书架信息 并添加新加入的书籍
  request.query(sql,(err,data)=>{
    let bookBox = JSON.parse(data.recordset[0].bookBox);

    for(let i=0;i<bookBox.length;i++){
      //找到该书在 订阅所有中的位置
      if(bookBox[i] == req.body.bookId){
        //移除掉该条订阅信息
        bookBox.splice(i,1);
        bookBox = JSON.stringify(bookBox);
      }
    }
    //将信息写入数据库
    sql = `update consumer set 
    bookBox = '${bookBox}'
    where [user] = '${req.body.user}'`
    
    request.query(sql,(err,data)=>{
      if(err){return console.log(err);}
      res.send('ok')
    })

  })
})

//上传时检查书名是否被用过
router.post('/examineBook',(req,res)=>{
  let Name = req.body.Name;
  sql = `select * from book where Name='${Name}'`
  request.query(sql,(err,data)=>{
    if (data.recordset[0]==undefined){
      res.send(true)
    }else{
      res.send(false)
    }
    
  })
})
//引入下面需要使用的模块
const gotoBook = require(path.join(__dirname,'./fs.js'))
//接收用户上传的书籍的链接
router.post('/uploading',(req,res)=>{
  let data = req.body.data
  //开始解析 书籍内容 同时将书籍内容保存至服务器
  gotoBook.setBook(data);
  let user = data.user
  //开始将数据写入数据库
  let sql = `
  insert into book([Name],Author,Class,JianJie,MiNiJianJie,bookURL) 
  values ('${data.Name}','${data.Author}','${data.Class}','${data.JianJie}','${data.MiNiJianJie}','${`./xiaoshuo/${data.Name}.txt`}')
  `
  //第一步 将数据写入 书籍表
  request.query(sql,(err,data)=>{
    if(err){return console.log(err);}
    //提取新书的id
    sql = 'select * from book '
    //第二部 拿到新书的id
    request.query(sql,(err,data)=>{
      let id = data.recordset[data.recordset.length-1].Id;
      //拿到用户的信息
      sql = `select * from consumer where [user] = '${user}'`;

      //第三步 拿到用户的信息
      request.query(sql,(err,data)=>{
        //开始解析 用户的 mybook
        let mybook = data.recordset[0].myBookId;
        console.log(mybook);
        //如果myBook不是第一次就先解析为数组 操作完成后在 重新封装为 JSON
        if(mybook){
          mybook = JSON.parse(mybook);
          mybook.push(id);
          mybook = JSON.stringify(mybook);
        }else{
          //如果是第一次 将mybook置为一个数组
          mybook = [];
          mybook.push(id);
          mybook = JSON.stringify(mybook);
        }
        console.log(mybook);
        console.log(user);
        sql = `
        update consumer set
        myBookId = '${mybook}'
        where [user] = '${user}'
        `

        //最后一步 将处理好的数据保存到用户的 myBookId中 
        //然后返回信息给前端
        request.query(sql,(err,data)=>{
          res.send('ok')
        })
      })
    })
  })

})

//通过 用户名找到 对应的 myBookId 信息
router.post('/getMyBook',(req,res)=>{
  let sql = `
  select * from consumer
  where [user] = '${req.body.user}'
  `
  
  request.query(sql,(err,data)=>{
    //如果用户没有 任意一本书籍 直接返回一个 false给页面
    if(!data.recordset[0].myBookId) {res.send(false)}else{
      res.send(data.recordset[0].myBookId) 
    }
  })
})

//通过一个书籍id的数组  获取用户 myBook信息(可泛于一次性通过多个id找到多本书籍)
router.post('/getbooks',(req,res)=>{
  sql = `select * from book
  where `
  //如果它是false 就直接不执行下面的 程序同时向页面返回一个 false
  if(!req.body.myBooks){return res.send([{Name:'null'}])}
  for(let value of req.body.myBooks){
    //注: 这里需要将空格加在 id前面 否则正则无法通过 $量词删除最后的 or
    sql += ` id='${value}' or`
  }
  //删去最后一个 or
  sql = sql.replace(/(or)$/g,'')

  request.query(sql,(err,data)=>{
    //如果查询到了 数据则 返回
    if(data.recordset[0] !=undefined){
      res.send(data.recordset);
    }else{
      //否则返回一个 一个数组 且它的第一个元素是一个对象 这个对象只有一个Name属性 作为前端判断的条件
      res.send([{Name:'null'}])
    }
  })
})

//上传新章节
router.post('/upChapter',(req,res)=>{
  let book = req.body;
  sql =  `select * from book
  where Id = '${book.Id}'`
  request.query(sql,(err,data)=>{
    let url = data.recordset[0].bookURL;
    //读取章节 对章节进行修改
    fs.readFile(path.join(__dirname,url),(err,data)=>{
      let text = JSON.parse(data);
      //将新章节写入
      text[book.Chapter] = book.bookText;
      //转换为JSON格式
      text = JSON.stringify(text);
      //将text 重新写入
      fs.writeFile(path.join(__dirname,url),text,(err)=>{
        if(err){return console.log(err);}
        res.send('更新完毕')
      })
    })
  })
})

//修改书籍信息
router.post('/setBook',(req,res)=>{
  let book = req.body.book;
  let sql = `
  update book set
  Name = '${book.Name}',Author ='${book.Author}',Class = '${book.Class}',JianJie='${book.JianJie}',MiNiJianJie='${book.MiNiJianJie}'
  where Id = '${book.Id}'
  `
  request.query(sql,(err,data)=>{
    if(err) {return console.log(err);}
    res.send('ok')
  })
})

//删除书籍
router.post('/deleteBook',(req,res)=>{

  let sql = `
  delete from book
  where Id = '${req.body.Id}'
  `
  request.query(sql,(err,data)=>{
    res.send('ok')
  })
})
//获取当前类型 对应的书籍
router.post('/getClass',(req,res)=>{
  let sql = `
  select * from book
  where Class ='${req.body.Class}'
  `;

  request.query(sql,(err,data)=>{
    if(err) {return console.log(err);}
    res.send(data.recordset)
  })
})

//获取用户 搜索对应的内容
router.post('/getSearch',(req,res)=>{
  //注: 搜索的范围 包括 书名即 简介
  let sql = `
  select * from book
  where Name like '%${req.body.search}%' or JianJie like '%${req.body.search}%'
  `
  request.query(sql,(err,data)=>{
    res.send(data.recordset)
  })
})

//通过书籍作者 获取相对应的书籍
router.post('/getAuthor',(req,res)=>{
  let sql = `
  select * from book
  where Author = '${req.body.author}'
  `

  request.query(sql,(err,data)=>{
    res.send(data.recordset)
  })
})
//以下是管理员中需要使用的 后端路由
//获取所有的用户信息
router.get('/getUser',(req,res)=>{
  let sql = 'select * from consumer'

  request.query(sql,(err,data)=>{
    res.send(data.recordset)
  })
})
//修改用户的信息
router.post('/amendUser',(req,res)=>{
  console.log(req.body);
  let body = req.body;
  let sql = `
  update consumer set 
  [password] = '${body.password}',name = '${body.name}', LV = '${body.LV}' 
  where [user] = '${body.user}'
  `

  console.log(sql);

  request.query(sql,(err,data)=>{
    res.send('ok')
  })
})
//向外共享路由
module.exports = router;
