import React, { useRef, useState } from 'react';
import './Weather.css';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import SuggestionsList from './SuggestionsList';
import WeatherInfo from './WeatherInfo';
import { ICONS, getGeoUrl, getWeatherUrl, getUvUrl } from '../utils/weatherUtils';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [message, setMessage] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const APP_ID = import.meta.env.VITE_APP_ID;

  // Fetch city suggestions for autocomplete
  const fetchCitySuggestions = async (query) => {
    try {
      const response = await fetch(getGeoUrl(query, APP_ID));
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format");
      setSuggestions(
        data.map(
          entry =>
            `${entry.name}${entry.state ? ", " + entry.state : ""}, ${entry.country}`
        )
      );
    } catch (error) {
      console.error("Failed to fetch city suggestions:", error);
      setSuggestions([]);
    }
  };

  // Main search handler
  const search = async (city) => {
    setLoading(true);
    setWeatherData(false);
    setMessage("");

    if (city.trim() === "") {
      setMessage("Please enter a city name");
      setLoading(false);
      return;
    }

    try {
      // 1. Get weather info
      const weatherRes = await fetch(getWeatherUrl(city, APP_ID));
      const weatherJson = await weatherRes.json();

      if (weatherJson.cod !== 200) {
        setMessage("City not found. Please try another one");
        setLoading(false);
        return;
      }

      const { lat, lon } = weatherJson.coord;

      // 2. Get UV index
      const uvRes = await fetch(getUvUrl(lat, lon, APP_ID));
      const uvJson = await uvRes.json();
      const uvIndex = uvJson.value || "N/A";

      // 3. Set weather data
      setWeatherData({
        humidity: weatherJson.main.humidity,
        windspeed: weatherJson.wind.speed,
        temperature: Math.floor(weatherJson.main.temp),
        location: weatherJson.name,
        icon: ICONS[weatherJson.weather[0].icon] || ICONS["01d"],
        uvIndex,
      });
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error("Error fetching weather data or UV index:", error);
    }
    setLoading(false);
  };

  // Handlers
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCityInput(value);
    if (value.length > 2) {
      fetchCitySuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(cityInput);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setCityInput(city);
    search(city);
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    search(inputRef.current.value);
    setSuggestions([]);
  };

  return (
    <div className="weather">
      <div className="searchbar-dropdown-container">
        <SearchBar
          inputRef={inputRef}
          cityInput={cityInput}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onSearchClick={handleSearchClick}
        />
        <SuggestionsList
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
        />
      </div>

      {message && <p className="message">{message}</p>}

      {loading && <Spinner />}

      {weatherData && <WeatherInfo weatherData={weatherData} />}
    </div>
  );
};

export default Weather;