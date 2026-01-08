import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country, weather }) => {
  const languages = Object.values(country.languages || {})
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital?.[0]}</p>
      <p>area {country.area}</p>
      <h4>languages:</h4>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        width="150"
      />
      {weather && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

const CountryList = ({ countries, onShow }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>show</button>
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (search) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const filtered = response.data.filter(country => 
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          setCountries(filtered)
          setSelectedCountry(null)
          setWeather(null)
        })
    } else {
      setCountries([])
    }
  }, [search])

  useEffect(() => {
    const countryToShow = selectedCountry || (countries.length === 1 ? countries[0] : null)
    
    if (countryToShow && countryToShow.capital?.[0]) {
      const api_key = import.meta.env.VITE_WEATHER_API_KEY
      if (api_key) {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryToShow.capital[0]}&appid=${api_key}&units=metric`)
          .then(response => {
            setWeather(response.data)
          })
          .catch(error => {
            console.log('Weather fetch failed:', error)
            setWeather(null)
          })
      }
    }
  }, [countries, selectedCountry])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  const getContent = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} weather={weather} />
    }
    
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    
    if (countries.length > 1) {
      return <CountryList countries={countries} onShow={handleShow} />
    }
    
    if (countries.length === 1) {
      return <CountryDetails country={countries[0]} weather={weather} />
    }
    
    return null
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      {getContent()}
    </div>
  )
}

export default App
