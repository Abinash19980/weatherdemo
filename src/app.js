// const   = require('express')
const express = require('express')
const path =require('path')
const app = express()
const hbs = require('hbs')
const { query } = require('express')
const forecast = require('./utils/forecast')


//define paths for express
const publicDirectorypath= path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//setup static directory    
app.use(express.static(publicDirectorypath))


//changing views to template/views setup handlebars and view location
app.set('views',viewDirectory);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath)

app.get('/',(req,res) =>{
    res.render('index', {
        title:'Weather app',
        name: 'Andew Bogut'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About page"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:"HElp page",
        helpText: 'this is teh ekoepadfk'
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404page',{
        errorMessage: 'Help not found'
    })
})

app.get('/weather', (req, res) => {
    // Provide an object to send as JSON
    if(!req.query.log && !req.query.lat ){
        res.send({
            error : 'Error provide address to get weather'
        })
    }
    else{
       
        forecast(req.query.log,req.query.lat,(data,error)=>{
            if(error){
                return res.send(error)
            }
            console.log(data.request);

            res.send({
                forecast: "The weather is "+ data.current.weather_descriptions,
                location: data.location,
                address:  data.request.query
            })
        });
    }
   })
app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error :"Search term must be provided"
        })
    }
    console.log(req.query)
    // Provide an object to send as JSON
    res.send({
    products :[]
    })
   })

app.get('*',(req,res) =>{
    res.render('404page',{
        errorMessage: 'Page not found',
        title :'404 page'
    })
})


app.listen(3000, ()=> {
     console.log('The server is up to on port 3000.')
})