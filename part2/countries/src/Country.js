import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Country = ({ country, showWeather=false }) => {
  const [weather, setWeather] = useState({})
  const [isLoadingWeather, setIsLoadingWeather] = useState(true)

  const setInitialWeather = () => {
    setIsLoadingWeather(true)
    axios
      .get(`http://api.weatherstack.com/current?access_key=dedde65249b0565dafdeeaa4fd9774c4&query=${country.name}`)
      .then(response => {
        const data = response.data
        console.log(data)
        setWeather(data.current)
        console.log(data.current)
        setIsLoadingWeather(false)
      })
  }

  useEffect(setInitialWeather, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language, index) => <li key={index}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height="150" width="150" />
      {showWeather ? (
        <div>
          <h2>Weather in {country.name}</h2>
          {isLoadingWeather ? (
            <div>Loading weather...</div>
          ) : (
            <div>
              <p><b>Temperature: </b>{weather.temperature}</p>
              <img src={weather.weather_icons[0]} height="50" width="50" />
              <p><b>Wind: </b>{weather.wind_speed}kph direction {weather.wind_dir}</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Country