
const socket = io()


//Elements
const $messageForm = document.querySelector('#Message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-template').innerHTML


socket.on('locationMessage',(url)=>{
    console.log(url)
    const html = Mustache.render(locationMessageTemplate,{
        url
    })
    $messages.insertAdjacentHTML('beforeend',html) 
})


socket.on('message',(message)=>{    //listens for welcome event sent from server
    console.log(message)
    const html =Mustache.render(messageTemplate,{
        message: message.text
    })
    $messages.insertAdjacentHTML('beforeend',html)
})




$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled','disabled')

    const message = e.target.elements.message.value//sends over message to server 


    socket.emit('sendMessage',message,(message)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value=''
        $messageFormInput.focus()
        console.log(message)
    }) 

})




$sendLocationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('geolocation not supported by browser')
    }    
    navigator.geolocation.getCurrentPosition((position)=>{
        $sendLocationButton.setAttribute('disabled','disabled')
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude:position.coords.longitude
        }, ()=>{
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location Shared')
        })
    })
})

