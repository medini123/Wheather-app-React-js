import React, {  useState } from 'react'
import search from "./images/search.svg"


import axios from 'axios'
import "../App.css"

function Home() {

    const [data, setData] = useState({
        celcuis: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: ''
    })

    const [name, setName] =useState('');
    const [error ,setError] = useState('')


    const handleClick = () =>{
        if(name !== ''){
          
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=031cd5259df2193627e70c2aa7602167&units=metric`;   
            axios.get(apiUrl)
            .then(res => {
             let imagePath = "";
                
             if(res.data.weather[0].main === "Clouds"){
                imagePath = require("./images/cloud.png")
             }else if(res.data.weather[0].main === "Clear"){
                imagePath = require("./images/clear.png")
             }else if(res.data.weather[0].main === "Rain"){
                imagePath = require("./images/rain.png")
             }else if(res.data.weather[0].main === "Snow"){
                imagePath = require("./images/snow.png")
             }else if(res.data.weather[0].main === "Mist"){
                imagePath = require("./images/mist.png")
             }else{
                imagePath = require("./images/cloud.png")
             }


               setData({...data, celcuis: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity,
                   speed: res.data.wind.speed, image: imagePath
         })        
         setError("");
     })
     .catch(err =>{ 
        if(err.response.status === 404){
            setError("Invalid City name")
            
        } else{
            setError("")
        }
        console.log(err)
    
    })

        }
    }

  return (
    <div className='container'>

      
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={(e) => setName(e.target.value)}/>
                <button onClick={handleClick}><img src={search}  alt="" /></button>
            </div>
           
           {
            error ? 
            <div>
            <img className='error-img' src={require("./images/404.png")} alt=''/>  
            <h3>Oops !! City not found</h3>
            </div>
            : 

              <div className="winfo">
                <img src= {data.image}  alt=''/>
                <h1>{Math.round(data.celcuis)}°C</h1>
                <h2>{data.name}</h2>

                <div className="details">
                    <div className="col">
                           <i className='bx bx-water'></i>
                           <div className='humidity'>
                               <p>{Math.round(data.humidity)}%</p>
                               <p>Humidity</p>
                           </div>
                    </div>

                    <div className="col">
                            <i className='bx bx-wind'></i>
                            <div className='wind'>
                                <p>{Math.round(data.speed)}km/h</p>
                                <p>Wind speed</p>
                            </div>
                    </div>
                </div>
            </div>
           }

            
        </div>
    </div>
  )
}

export default Home