import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";
import { cityList } from "./cityList";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState(props.icon);

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    setFilteredCities(cityList.filter((city) => city.toLowerCase().includes(value)));
  }

  const handleListClick = (city) => {
    setQuery(city)
    search(city)
  }

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        console.log(response.data)
        switch (response.data.weather[0].main) {
          case "Haze":
            setIcon("CLEAR_DAY");
            break;
          case "Clouds":
            setIcon("CLOUDY");
            break;
          case "Thunderstorm":
            setIcon("RAIN");
            break;
          case "Rain":
            setIcon("RAIN");
            break;
          case "Snow":
            setIcon("SNOW");
            break;
          case "Dust":
            setIcon("WIND");
            break;
          case "Drizzle":
            setIcon("SLEET");
            break;
          case "Fog":
            setIcon("FOG");
            break;
          case "Smoke":
            setIcon("FOG");
            break;
          case "Tornado":
            setIcon("WIND");
            break;
          default:
            setIcon("CLEAR_DAY");
        }
        setWeather(response.data);
        setQuery("");
        setFilteredCities([])
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setFilteredCities([])
        setError({ message: "Not Found", query: query });
      });
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search(props.city);
  }, []);

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
      <div className="today-weather">
        <h4>{weather?.weather?.[0]?.main}</h4>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={handleInputChange}
            value={query}
          />
          <ul className="cityList">
            {filteredCities?.map((city) => (
              <li key={city} onClick={() => handleListClick(city)}>{city}</li>
            ))}
          </ul>
          <div className="img-box">
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={search}
            />
          </div>
        </div>
        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temp{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;