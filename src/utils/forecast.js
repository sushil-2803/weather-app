const request =require('request')
const forecast = (latitude, longitued,callback)=>{
     const url ="http://api.weatherstack.com/current?access_key=77c38b2a8af6a9ada121bbce65ff9d9c&query="+latitude+","+longitued

request({url, json:true }, (error, {body})=>{
    if(error){
       callback("Unable to connect to server",undefined)
    }
    else if(body.error)
    {
       callback('Unable to find the location',undefined)
    }
    else{
    callback(undefined, body.current.weather_descriptions[0] + ". The current temperature is " + body.current.temperature +". It feels like " + body.current.feelslike + ". The current humidity is "+ body.current.humidity +"%")
    }
})

}

module.exports= forecast