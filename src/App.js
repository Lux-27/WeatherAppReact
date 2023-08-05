import { useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    //this is not wrong but it is weird, it needs the function to be called to
    //to get async respionse

    // async function getResponse() {
    //   Promise.all([currentWeatherFetch, forecastFetch])
    //     .then(async (response) => {
    //       const weatherResponse = await response[0].json();
    //       const forecastResponse = await response[1].json();

    //       setCurrentWeather({ city: searchData.label, ...weatherResponse });
    //       setForecast({ city: searchData.label, ...forecastResponse });
    //     })
    //     .catch((error) => console.log(error));
    //}

    //This is similar to the one above but it promises first and then
    //executes the function inside the promise, thus enabling it
    Promise.all([currentWeatherFetch, forecastFetch]).then(
      async function getResponse(response) {
        try {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({ city: searchData.label, ...weatherResponse });
          setForecast({ city: searchData.label, ...forecastResponse });
        } catch (error) {
          console.error(error);
        }
      }
    );

    //this was given in tutorial, but it does not work

    // Promise.all([currentWeatherFetch, forecastFetch])
    //   .then(async (response) => {
    //     const weatherResponse = await response[0].json();
    //     const forecastResponse = await response[1].json();

    //     setCurrentWeather({ city: searchData.label, ...weatherResponse });
    //     setForecast({ city: searchData.label, ...forecastResponse });
    //   })
    //   .catch((err) => console.log(err));
  };

  //console.log(currentWeather);
  //console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
