import React from 'react';
import HumidityIcon from '../assets/humidity.png';
import WindIcon from '../assets/wind.png';
import uvIcon from '../assets/uv.png';

const WeatherInfo = ({ weatherData }) => (
  <>
    <div className="weather-info">
      <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
      <h2 className="temperature">{weatherData.temperature}°C</h2>
      <h3 className="location">{weatherData.location}</h3>
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
  </>
);

export default WeatherInfo;