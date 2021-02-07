const path = require('path')
const express= require('express')
const hbs  = require('hbs')
const app = express()
const geoCode =require('./utils/geoCode')
const forecast =require('./utils/forecast')

//Paths
publicDirectoryPath = path.join(__dirname,'../public')
templateDirectortPath = path.join(__dirname,'../templates/views')
partialDirectorPath = path.join(__dirname,'../templates/partails')


app.use(express.static(publicDirectoryPath))

// HandleBar
app.set('view engine', 'hbs')
app.set('views',templateDirectortPath)
hbs.registerPartials(partialDirectorPath)

app.get('',(req,res)=>{
    res.render('index',{
        tittle:'Weather',
        name:'Sushil Dubey'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        tittle:'About Us',
        name:'Sushil Dubey'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        tittle:'Help',
        name:'Sushil Dubey'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send('Please provide a Address')
    }
    const address = req.query.address
    geoCode(address, (error,{latitude,longitued,location}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude, longitued, (error, forecastData) => {
           if(error)
           {
            return res.send({error})
           }
           res.send({
               location,
               forecastData,
               address
           })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('Please Provide Search Term')
    }
    res.send({
        apple:'Cost'
    })

})


app.get('/help/*',(req,res)=>{
    res.render('helparticle',{
        tittle:'HELP',
        name:'Sushil Dubey',
        message:'Article Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        tittle:'Page Not Found',
        name:'Sushil Dubey',
        message:'You LOST YOUR WAY'
    })
})
app.listen(80,'127.0.0.2',()=>{
console.log('Server is running on 127.0.0.2:80')
})