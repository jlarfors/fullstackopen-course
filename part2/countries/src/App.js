import React, { useState, useEffect } from 'react';
import axios from 'axios'

import CountryFilter from './CountryFilter'
import Countries from './Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('sweden')

  const handleFilterChange = (event) => {
    const target = event.target
    console.log("handleFilterChange ", target.value)
    setCountryFilter(target.value)
  }

  const setInitialCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        console.log(countries)
        // setCountries(countries)
        setCountries(countries.map(country => { return {show: false, ...country}}))
      })
  }

  useEffect(setInitialCountries, [])

  return (
    <div>
      <CountryFilter 
        countryFilter={countryFilter}
        handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        setCountries={setCountries} 
        countryFilter={countryFilter} />
    </div>
  );
}

export default App;
