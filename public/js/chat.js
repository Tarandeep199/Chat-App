
const socket = io()



socket.on('message',(message)=>{    //listens for welcome event sent from server
    console.log(message)
})

document.querySelector('#Message-form').addEventListener('submit',(e)=>{
    e.preventDefault()

    const message = e.target.elements.message.value
    socket.emit('sendMessage',message)  //sends over message to server 

})

document.querySelector('#send-location').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocation not supported by browser')
    }    
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        })
    })
})

