const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { WebSocketShard } = require('discord.js')



const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))



io.on('connection',(socket)=>{
    console.log('New WebSocket connection')

    socket.emit('message','Welcome')    //sends message from server to the clienT


    socket.broadcast.emit('message', 'new user has joined')

    socket.on('sendMessage',(message)=>{    //server listens for send message from chat.js
        io.emit('message',message)
    })

    socket.on('disconnect',()=>{
        io.emit('message','user has left')
    })

    socket.on('sendLocation',(location)=>{
        io.emit('message',`https://www.google.com/maps/@${location.latitude},${location.longitude}`)
    })

})

server.listen(port,()=>{
    console.log(`Server up on port ${port}`)
})
 