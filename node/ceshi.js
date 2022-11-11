const fs = require('fs');
const path = require('path');

fs.writeFile('./xiaoshuo/2.txt','020312\n123456','utf-8',(err)=>{
    //如果写入成功 err 值等于一个 null  
    //如果写入失败 err 等于一个错误对象
    console.log(err);
    
    console.log('数据写入完毕');
})