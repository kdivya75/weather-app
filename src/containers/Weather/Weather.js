import {react, useState, useEffect, useContext } from 'react';
import { apiKey } from '../../constants/api_config';
import PropTypes from 'prop-types';
import WeatherCard from '../../components/Weather/WeatherCard';
import windIcon from '../../assets/wind.png';
import {Search} from "../../App";
import './Weather.css';

const fetchFromLocationData = async(lat, long) => {
    const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`)
    const weatherJson = await weatherResult.json();
    return weatherJson;
}

const fetchFromSearch= async(value) => {
  const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${apiKey}`)
  const weatherJson = await weatherResult.json();
  return weatherJson;
}

function Weather(props) {
    const [weatherData, setWeatherData] = useState(null);
    const [windData, setWindData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const {searchValue} = props;
    function success(pos) {
        var crd = pos.coords;
        setLat(crd.latitude);
        setLong(crd.longitude)
      }
      function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      const parseWeatherData = (result) => {
        console.log(result)
        const weatherDetails = {
          type: "weather",
          icon: result.weather[0].icon,
          mainValue: <>{`${Math.ceil(result.main.temp)}`}<sup>o</sup>C</>,
          conditions:result.weather[0].description,
          city: result.name,
          time: result.dt,
          timeZone: result.timeZone,
          id: result.id,
          country: result.sys.country,
          summary: [
            {label: "Feels like", value: <>{`${Math.ceil(result.main.feels_like)}`}<sup>o</sup>C</>},
            {label: "Max temp", value: <>{`${Math.ceil(result.main.temp_max)}`}<sup>o</sup>C</>},
            {label: "Min temp", value: <>{`${Math.ceil(result.main.temp_min)}`}<sup>o</sup>C</>},
          ]

        }
        setWeatherData(weatherDetails); 
      }

      const parseWindData = (result) => {

        const windDetails = {
          type: "wind",
          icon: windIcon,
          mainValue:`${Math.ceil(result.wind.speed)} Km/h`,
          city: result.name,
          id: result.id,
          country: result.sys.country,
          summary:[
            {label: "Gust", value: result.wind.gust ? `${result.wind.gust} Km/h` : "-- Km/h"},
            {label: "Visibility", value:`${Math.ceil(result.visibility)} meters`},
            {label: "Humidity", value:`${Math.ceil(result.main.humidity)} %`}
          ]

        }
        setWindData(windDetails);

      }
      useEffect(() => {
        const  options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };
        if (navigator.geolocation) {
            navigator.permissions
              .query({ name: "geolocation" })
              .then(function (result) {
                if (result.state === "granted") {
                  console.log(result.state);
                  //If granted then you can directly call your function here
                  navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                  navigator.geolocation.getCurrentPosition(success, errors, options);
                } else if (result.state === "denied") {
                  //If denied then you have to show instructions to enable location
                }
                result.onchange = function () {
                  console.log(result.state);
                };
              });
        }
    }, [])


    useEffect(() => {

        if(lat && long){
            setIsLoading(true)
            fetchFromLocationData(lat, long).then((result) => {
              parseWeatherData(result)
              parseWindData(result)
              setIsLoading(false)
            });
        }
    }, [ lat, long])

    useEffect(() => {
      if(searchValue){
        setIsLoading(true)
        fetchFromSearch(searchValue).then((result) => {
          parseWeatherData(result)
          parseWindData(result)
          setIsLoading(false)
        })
      }
    },[searchValue])
    return(
        <div className="weatherContainer">
          {weatherData ? <WeatherCard data={weatherData} /> : null }
          {windData ? <WeatherCard data={windData} /> : null }
          {isLoading? "Loading....": null}
        </div>
    )
}
Weather.propTypes = {};
export default Weather;