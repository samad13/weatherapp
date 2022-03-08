const express = require("express");
const https = require("https")




const app = express()
dotenv.config({path:'./.env'})
app.use(express.urlencoded({extended: true}));


app.get("/", function(req,res){
    
    res.sendFile(__dirname +"/index.html")
})

app.post("/", function(req,res){

const city = req.body.CityName;
    const apiKey = process.env.EMAIL_USERNAME,
    const unit = "metric"; 
const url ="https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" +apiKey+"&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);
   response.on("data",function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDiscription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"

       res.write("<p>the weather discription is "+ weatherDiscription +"</p>");
       res.write("<h1> the temperature in "+ city+ " is  "+ temp + " degree celcius and sky is also has "+weatherDiscription +"</h1>" );
       res.write("<img src=" + imageUrl +">");
       res.send()
   })
   
   // try to use it with staffdb
    })
})


app.listen(4000, function(){
    console.log("weather server starting")
});