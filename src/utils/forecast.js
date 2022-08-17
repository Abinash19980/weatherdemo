const request = require('postman-request')




const forecast =  (lat,lon, callback)=>{
  
    const url = 'http://api.weatherstack.com/current?access_key=82ec726bbdde694efe063805f70fe287&query=query='+lat+','+lon;
    console.log(url);
    request({url, json:true}, (error,{body})=>{
        if(error){
            // console.log('Unable to connect to the weather')
            callback("Unble to connect to the weather", 
            error);
        }
        // else if(response.body.error){
        else if(body.error){
            // console.log(response.body.error)
            callback("Unable to connect to the weather", 
            response.body.error);
        }
        else{
            // const data = (body.current);
            const data= body
            // const data = (response.body.current);
            // console.log(response.body.location.name);
            console.log(body.location.name);
            // console.log(data.temperature);
            // console.log(body);
            console.log('It is currently ' + data.current.temperature ,data.current.weather_descriptions     + ' degrees out there. There is ' + data.current.precip + '% chance of rain.' )
            callback(data,error)
        }
    })

}

module.exports = forecast;