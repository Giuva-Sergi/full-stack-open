function CountryBasicInfo({ country }) {
  console.log(country);
  const {
    name: { common },
    capital,
    area,
    languages,
    flags: { png },
  } = country;

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
    </div>
  );
}

export default CountryBasicInfo;
