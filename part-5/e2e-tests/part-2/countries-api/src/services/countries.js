import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const COUNTRY_BY_NAME_URL =
  "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAllCountries = function () {
  const request = axios.get(BASE_URL);

  return request.then((res) => res.data);
};

const getCountryByName = function (country) {
  const request = axios.get(`${COUNTRY_BY_NAME_URL}/${country}`);

  return request.then((res) => res.data);
};

export { getAllCountries, getCountryByName };
