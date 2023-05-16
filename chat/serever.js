// const express = require('express')
// const app = express()
// const port = 3000
// const http=require('http').createServer(app)


// http.listen(port,()=>{
//     console.log("Running");
// })

// app.use(express.static(__dirname+'/public'))
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+"/index.html")
// })


// const io=require('socket.io')(http);

// io.on('connection',(socket)=>{
//     console.log('Connected');

// socket.on('message',(msg)=>{
//     // console.log(msg);
//     socket.broadcast.emit('message',msg);
// })

// })







const express = require("express")
const { connection } = require("mongoose")
const app = express()
const PORT = 3000
const http =require('http').createServer(app)

http.listen(PORT, (req, resp) => {
    console.log("server running on port : " + PORT);
})

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
const io=require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('connected');
    socket.on ('message',(msg)=>{
        // console.log(msg);
    socket.broadcast.emit('message',msg);

    })
})