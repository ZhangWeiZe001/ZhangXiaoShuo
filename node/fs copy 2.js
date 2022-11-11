const fs = require('fs');
const path = require('path');

function setBook(){
  
}
//小说名称 用于读取小说名 并将拆分后的小说写入
const bookName = '帝国1939';
//关键: 准备书籍内容
let book ={};
// 准备目录
let list;
new Promise ((resolve,reject)=>{
fs.readFile(path.join(__dirname+`/book/${bookName}.txt`),'utf-8',(err,data)=>{
    //拿到data数据 对数据进行二次加工
    list = getExecStrs(data);
    //遍历list 将章节写入 NeiR
    let NeiR = []
    for(let i =0;i<list.length;i++){
    //通过 两个章节切割出正文内容
    let box;
    //将最后多余的章节切掉
    let Jian;
    if(i+1 < list.length){
    //读取当前章节和下一章之间的内容
      //如果出现了错误 直接结束本次循环
    try{box = RegExp(`${list[i]}[^]*${list[i+1]}`)} catch(err){continue} 
    
    //拿到下一章的字符串
    Jian = RegExp(list[i+1],'ig');
    }else{  
    //如果是最后一章了直接将所有的内容都放出来
    box = RegExp(list[i]+'[^]*','ig');
    Jian= RegExp('~@#*&&^%$￥','ig');
    } 
    //a 代表找到的返回的数据(很重要)
    let a
    //这里很重要 判断 当data使用正则 出错时 捕获这个错误 (不然后面都打印不了)
    try {a = data.match(box)[0]} 
    catch(err){console.log('第'+i+'章打印错误'); a = '正在打印 请等待......'}
    //添加到数组的最后
    NeiR.push(a)
    
    //删除尾部的多余的章节名
    a = a.replace(Jian,'')
    
    //将数据(a)写入 book对象
    book[list[i]]=a;

  }
    //将数据转化为json格式
    book = JSON.stringify(book)
    list = JSON.stringify(list)
    //结束进行下一步
    resolve('成功')
});
}).then(
 value => {
  fs.writeFile(`./xiaoshuo/${bookName}.txt`,book,(err)=>{
    console.log(err);
    console.log('打印完毕 现写入中....');
  })
 }
)

//拆分小说章节方法
function getExecStrs(str) {
    let reg = /(正文){0,1}(第)([零〇一二三四五六七八九十百千万a-zA-Z0-9]{1,7})[章节卷集部篇回]((?! {4}).)((?!\t{1,4}).){0,30}\r?\n/g;
    let list = [];
    let result = null;
    result = str.match(reg);
    result && list.push(...result);
    //遍历所有的数组
    for (let i = 0; i < list.length; i++) {
      // 删除内部的 \n \r \t 替换为空字符串
      list[i] = list[i].split("\n").join("");
      list[i] = list[i].split("\r").join("");
      list[i] = list[i].split("\t").join("");
    }
    return list;
  }
