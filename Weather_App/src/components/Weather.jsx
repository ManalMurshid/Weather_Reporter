import React, { useRef, useState } from 'react'; 

import './Weather.css';
import uvIcon from '../assets/uv.png';         // local UV icon (optional)
import searchIcon from '../assets/search.png';
import HumidityIcon from '../assets/humidity.png';
import WindIcon from '../assets/wind.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';




const Weather = () => {
    
    const inputRef= useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons ={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04n":drizzle_icon,
        "04d":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,

    }


    const search=async (city)=>{
        if (city === ""){
            alert("Please enter a city name");
            return;

        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon:icon,
                
            })

        } catch (error) {
            setWeatherData(false);
            console.error('Error fetching weather data:', error);
         }
    }

    
  return (
    <div className="weather">
      <div className="search-bar">
        <input 
        ref= {inputRef} 
        type="text" 
        placeholder="Search"

        //To use the enter key on keyboard 
        onKeyDown={(e) => {
      if (e.key === 'Enter') {
        search(inputRef.current.value);
      }
    }}
     />
        <button><img src={searchIcon} alt="Search" className="search-icon" onClick={()=>search(inputRef.current.value)}/> </button>
      </div>
      
      
      {/* To display only if weather data is available */}
      {weatherData?<>

      <div className="weather-info">
         <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
        <h2 className='temperature'>{weatherData.temperature}°C</h2>
        <h3 className='location'>{weatherData.location}</h3>
      </div>

      <div className="weather-stats">
        
        <div className="stat">
            <img src={HumidityIcon} alt="Humidity icon" />
          <p>{weatherData.humidity}</p>
          <small>Humidity</small>
        </div>
        <div className="stat">
          <img src={WindIcon} alt="Wind icon" />
          <p>{weatherData.windspeed}</p>
          <small>Wind Speed</small>
        </div>
      </div>

      <div className="uv-index">
        <img src={uvIcon} alt="UV icon" />
        <div>
          <p>{weatherData.uvIndex}</p>
          <small>UV Index</small>
        </div>
      </div>
       
       </>:<></>}
      
      
    </div>
  );
};

export default Weather;
