import React, {useEffect, useState} from 'react'
import Country from './Country'

const Countries = ({countries, setCountries, countryFilter}) => {
    
    const countryList = countries
        .filter(country =>
            !country ||
            (country.name.toUpperCase().includes(countryFilter.toUpperCase())))

    switch (true) {
        case (countryList.length > 10):
            return (
                <div>Too many matches, specify another filter</div>
            )
        case (countryList.length > 1):
            return (
                countryList.map((country, index) => {
                    return (
                        <div key={index}>
                            {country.name} <button onClick={() => {
                                const copy = countries.map(it => {
                                    if (it.name === country.name) {
                                        it.show = !it.show
                                    }
                                    return it
                                })
                                setCountries(copy)
                            }}>{country.show ? "hide" : "show"}</button>
                            { country.show ? <Country country={country} /> : null }
                            
                        </div>
                    )
                })
            )
        case (countryList.length === 1):
            return (
                <Country country={countryList[0]} showWeather={true} />
            )
        default:
            return (
                <div>No countries match, specify another filter</div>
            )
    }
}

export default Countries