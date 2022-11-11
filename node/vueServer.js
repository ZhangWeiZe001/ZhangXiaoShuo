const express = require('express')
const cors =require('cors');
const history = require('connect-history-api-fallback');
const app =express()

app.use(history())
app.use(express.static(__dirname+'/dist'))


app.listen(1999,(err)=>{
    if(!err) console.log('服务器已开启\nhttp://127.0.0.1:1999')
})