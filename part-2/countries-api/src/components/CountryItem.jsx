import { getCountryByName } from "../services/countries";

function CountryItem({ name, onSetCountry }) {
  function handleClick() {
    getCountryByName(name).then((res) => onSetCountry(res));
  }
  return (
    <li>
      <span>{name}</span> <button onClick={() => handleClick()}>show</button>
    </li>
  );
}

export default CountryItem;
