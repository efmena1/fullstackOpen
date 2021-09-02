import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Filter = ({ state, handler }) => {
  return (
    <div>
      filter countries
      <input value={state} onChange={handler} />
    </div>
  );
};

const Button = ({ onClick, text, name }) => {
  return (
    <>
      <button onClick={onClick} name={name}>
        {text}
      </button>
    </>
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
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>
            <b>{language.name}</b>
          </li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" style={flagStyle} />
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

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const FilteredCountries = (filter, countries) => {
    if (filter === "") return [];
    return countries.filter((country) => {
      const re = RegExp(`.*${filter.toLowerCase()}.*`);
      return country.name.toLowerCase().match(re);
    });
  };

  return (
    <div>
      <h1>Data for Countries</h1>
      <Filter state={filter} handler={handleFilterChange} />
      <DisplayData countries={FilteredCountries(filter, countries)} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
