console.log('Client Side Work')

const locationForm = document.querySelector('form')
const searchLocation = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


locationForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = searchLocation.value
    messageOne.textContent='Loading'
    messageTwo.textContent=''
    //console.log(location)
    fetch('http://myweatherapp.com/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error
            messageTwo.textContent=''
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastData
        }
    })
})

})