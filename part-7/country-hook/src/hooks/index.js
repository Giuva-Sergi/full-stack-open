import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api/name/";

  useEffect(() => {
    if (!name) return;
    async function fetchCountry() {
      const res = await axios.get(`${BASE_URL}/${name}`);
      const countryData = await res.data;
      console.log(countryData);
      setCountry({
        name: countryData.name.common,
        capital: countryData.capital[0],
        population: countryData.population,
        flag: countryData.flags.png,
        found: true,
      });
    }

    fetchCountry();
  }, [name]);

  return country;
};
