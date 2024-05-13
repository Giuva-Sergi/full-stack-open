import { useEffect, useState } from "react";
import { getWeatherData } from "../services/weather";

function CountryBasicInfo({ country }) {
  const {
    name: { common },
    capital,
    capitalInfo: { latlng },
    area,
    languages,
    flags: { png },
  } = country;
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!weatherData) {
      getWeatherData(latlng[0], latlng[1])
        .then((res) => setWeatherData(res))
        .catch((err) => console.error(err));
    }
  }, [weatherData, latlng]);

  return (
    <div>
      <h1>{common}</h1>
      <p>capital {capital?.at(0)}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={png} alt={`${common} flag`} />
      {weatherData && (
        <>
          <h3>Weather in {capital?.at(0)}</h3>
          <p>temperature {weatherData.main.temp} Fahrenheit</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weatherData.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
}

export default CountryBasicInfo;
