import React from 'react'

const CountryFilter = ({ countryFilter, handleFilterChange }) =>(
  <div>
    <input onChange={handleFilterChange} value={countryFilter} />
  </div>
)

export default CountryFilter