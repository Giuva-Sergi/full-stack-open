import axios from "axios";

const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_API_KEY;

const getWeatherData = function (lat, lon) {
  const request = axios.get(`${BASE_URL}lat=${lat}&lon=${lon}&appid=${apiKey}`);

  return request.then((res) => res.data);
};

export { getWeatherData };
