import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const Filter = ({state,handler}) =>{
  return(
    <div>
      filter countries
      <input value={state} onChange={handler} />
    </div>
  )
}

const DisplayData = ({countries}) =>{
  if(countries.length >10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if(countries.length === 1){
    var flagStyle = {
      "width": "120px",
      "height": "120px",
   };
    return(
      <div>
        {countries.map((country) => 
        <div key={country.name}>
          <h1>{country.name}</h1>
          <h2>languages</h2>
          <ul>{country.languages.map((language)=>
            <li key={language.name}><b>{language.name}</b></li>
          )}
          </ul>
          <img src={country.flag} alt="Flag" style={flagStyle}/>
        </div>
      )}
      </div>
    )
  }
  if(countries.length=== 0 ) return (<div>No match found</div>)
  return(
    <div>
      <h2>Countries</h2>
      <ul>
      {countries.map((country) => 
        <li key={country.name}>{country.name}</li>
      )}
      </ul>
    </div>
  )
}

const App = () =>{
  const [countries, setCountries] = useState([]);
  const [filter,setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const FilteredCountries = (filter,countries) =>{
    if(filter === '') return []
    return countries.filter(function (country){
      const re = RegExp(`.*${filter.toLowerCase()}.*`)
      return country.name.toLowerCase().match(re)
    })
  }


  return(
    <div>
      <h1>Data for Countries</h1>
      <Filter state={filter} handler={handleFilterChange} />
      <DisplayData countries={FilteredCountries(filter,countries)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
