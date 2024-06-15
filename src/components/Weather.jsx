import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search from '../Images/search.png'
import clear from '../Images/clear.png'
import cloud from '../Images/cloud.png'
import drizzle from '../Images/drizzle.png'
import humidity from '../Images/humidity.png'
import rain from '../Images/rain.png'
import snow from '../Images/snow.png'
import wind from '../Images/wind.png'

const Weather = () => {

const inputRef = useRef()
const [weatherData, setWeatherData] = useState(false);

const allIcons = {
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,
    "04d":drizzle,
    "04n":drizzle,
    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,
    "13d":snow,
    "13n":snow,

}

const search = async (city)=>{
    if(city === ""){
        alert("Enter City Name");
        return;
    }
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const icon = allIcons[data.weather[0].icon] || clear;



        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon
        })
    } catch  (error) {

    }
}

useEffect(()=>{
    search("Siwan");
},[])

  return (
    <div className='weather'>
    <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search' />
        <img src={search} alt=''onClick={()=>search(inputRef.current.value)} />
    </div>
    <img src={weatherData.icon} alt='' className='weather-icon' />
    <p className='temperature'>{weatherData.temperature}°c</p>
    <p className='location'>{weatherData.location}</p>
    <div className='weather-data'>
    <div className='col'>
    <img src={humidity} alt='' />
    <div>
        <p>{weatherData.humidity}%</p>
        <span>Humidity</span>
        </div>
    </div>
    <div className='col'>
    <img src={wind} alt='' />
    <div>
        <p>{weatherData.windSpeed} Km/h</p>
        <span>Wind Speed</span>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Weather
