import React, { useRef, useState } from 'react'; 

import './Weather.css';
import Spinner from './Spinner';
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
    const [message, setMessage] = useState(""); // for inline feedback
    const [cityInput, setCityInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    
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


  const fetchCitySuggestions = async (query) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&namePrefix=${query}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_GEODB_API_KEY,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });
    const data = await response.json();
    const cities = data.data.map(city => city.city);
    setSuggestions(cities);
  } catch (error) {
    console.error("Failed to fetch city suggestions:", error);
    setSuggestions([]);
  }
};


// const search = async (city) => {
//       if (city.trim() === "") {
//         setMessage("Please enter a city name");
//         setWeatherData(false); // Hide previous data if any
//         return;
//       }

//          setMessage(""); 
//          setLoading(true);
//          setWeatherData(false); // hide any previous weather data



//         try {
//             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

//             const response = await fetch(url);
//             const data = await response.json();
            
//             if (data.cod !== 200) {
//               setMessage("City not found. Please try another one");
//               setWeatherData(false);
//               return;
//             }


//             console.log(data);
//             const icon = allIcons[data.weather[0].icon] || clear_icon;
//             setWeatherData({
//                 humidity: data.main.humidity,
//                 windspeed: data.wind.speed,
//                 temperature: Math.floor(data.main.temp),
//                 location: data.name,
//                 icon:icon,
                
//             })

//         } catch (error) {
//             setMessage("Something went wrong. Please try again later.");
//             setWeatherData(false);
//             console.error('Error fetching weather data:', error);
//          }

//          setLoading(false); 
//     }


const search = async (city) => {
  setLoading(true); // Start spinner immediately
  setWeatherData(false); // Hide any previous data
  setMessage(""); // Clear old messages

  
  setTimeout(async () => {
    if (city.trim() === "") {
      setMessage("Please enter a city name");
      setLoading(false);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setMessage("City not found. Please try another one");
        setLoading(false);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error("Error fetching weather data:", error);
    }

    setLoading(false); // End spinner after everything
  }, 1000);
};


    
  return (
    <div className="weather">
      <div className="search-bar">
        <input 
        ref= {inputRef} 
        type="text" 
        placeholder="Search"


        //To display suggestions 

        value={cityInput}
          onChange={(e) => {
            const value = e.target.value;
            setCityInput(value);
            if (value.length > 2) {
              fetchCitySuggestions(value);
            } else {
              setSuggestions([]);
            }
          }}

        //To use the enter key on keyboard 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            search(cityInput);
            setSuggestions([]);
          }
        }}
     />
        <button><img src={searchIcon} alt="Search" className="search-icon" onClick={()=>search(inputRef.current.value)}/> </button>
      </div>

      {message && <p className="message">{message}</p>}

      <ul className="suggestions">
        {suggestions.map((city, index) => (
          <li key={index} onClick={() => {
            setCityInput(city);
            search(city);
            setSuggestions([]);
          }}>
            {city}
          </li>
        ))}
      </ul>

      
      {/* Show spinner when loading */}
      {loading && <Spinner />}
      
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
