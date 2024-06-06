import { useEffect, useState } from "react";
import { getAllCountries, getCountryByName } from "./services/countries";
import CountryItem from "./components/CountryItem";
import CountryBasicInfo from "./components/CountryBasicInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getAllCountries().then((res) =>
      setCountries(res.map((country) => country.name.common))
    );
  }, []);

  const filteredCountries =
    query &&
    countries.filter((country) => country.toLowerCase().includes(query));

  useEffect(() => {
    if (filteredCountries.length === 1) {
      getCountryByName(filteredCountries[0]).then((res) => setCountry(res));
    }
  }, [filteredCountries, setCountry]);

  return (
    <>
      <div>
        find countries{" "}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
          <ul>
            {filteredCountries.map((country) => (
              <CountryItem
                key={country}
                name={country}
                onSetCountry={setCountry}
              />
            ))}
          </ul>
        )}
        {country && <CountryBasicInfo country={country} />}
      </div>
    </>
  );
}

export default App;
