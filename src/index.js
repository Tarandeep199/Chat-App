const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {generateMessage} = require('./utils/messages')



const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))



io.on('connection',(socket)=>{
    console.log('New WebSocket connection')


    //sends message from server to the clienT
    socket.emit('message',generateMessage('Welcome!'))    


    socket.broadcast.emit('message', generateMessage('new user has joined'))





    socket.on('sendMessage',(message,callback)=>{    //server listens for send message from chat.js
        io.emit('message',generateMessage(message))
        callback('Delivered!')
    })






    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('user has left'))
    })




    socket.on('sendLocation',(location,callback)=>{
        io.emit('locationMessage',`https://www.google.com/maps/@${location.latitude},${location.longitude}`)
        callback()
    })

})

server.listen(port,()=>{
    console.log(`Server up on port ${port}`)
})
 