import React, { useState, useEffect } from "react";
import axios from "axios";

const Button = ({ onClick, text, name }) => {
  return (
    <>
      <button onClick={onClick} name={name}>
        {text}
      </button>
    </>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    const weather_api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?query=${capital}&access_key=${weather_api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [capital]);
  const data = weather === undefined ? undefined: weather.current
  return (
    <div>
      {weather === undefined ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <p>
            <b>Temperature: </b>
            {data.temperature} °C
          </p>
          <img src={data.weather_icons} alt={data.weather_description} />
          <p>
            <b>Wind: </b>
            {`${data.wind_speed} mph direction ${data.wind_dir}`}
          </p>
        </div>
      )}
    </div>
  );
};

const DisplayCountry = ({ countries }) => {
  var flagStyle = {
    width: "120px",
    height: "120px",
  };

  const country = countries[0];

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>
        <b>Capital: </b>
        {country.capital}
      </p>
      <p>
        <b>Population: </b>
        {country.population}
      </p>
      <h2>Spoken Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>
            <b>{language.name}</b>
          </li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" style={flagStyle} />
      <h2>Weather in {country.capital}</h2>
      <Weather capital={country.capital} />
    </div>
  );
};

const DisplayData = ({ countries }) => {
  const [show, setShow] = useState("");

  const handleShowClick = (event) => {
    const showObject = countries.filter(
      (country) => country.name === event.target.name
    );
    setShow(showObject);
  };
  if (countries.length === 0) return <p>Enter a keyword to filter</p>;
  if (countries.length > 10) return <p>Too many matches</p>;
  if (countries.length === 1) return <DisplayCountry countries={countries} />;
  return (
    <div>
      <ul>
        {countries.map((country) => {
          return (
            <li key={country.name}>
              {country.name}
              <Button
                onClick={handleShowClick}
                name={country.name}
                text="show"
              />
              {show && country.name === show[0].name ? (
                <DisplayCountry countries={show} />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayData;
