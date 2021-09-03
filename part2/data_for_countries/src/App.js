import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import DisplayData from "./components/countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
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

export default App;
