import logo from './logo.svg';
import './App.css';
import Form from './components/Form'
import { useState, useEffect } from 'react'
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY

  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])
  // const [ weather, setWeather] = useState({})

  let filtered = countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))

  let arr = new Array(filtered.length).fill(0)

  const [ shown, setShown ] = useState(arr)

  const setNewSearch = (event) => {
    setSearch(event.target.value)
    setShown(arr)
  }
  
  const show = (index) => {
    const copy = [...shown]
    copy[index] ? copy[index] = 0 : copy[index] = 1
    return (
      setShown(copy)
    )
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })}, 
  [])

  // probably create a new component just to use to display weather data to minimize calls
  // useEffect(() => {
  //   for (let i = 0; i < countries.length; i++) {
  //     let country = countries[i].name.common
  //     axios
  //       .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`)
  //       .then(response => {
  //         setWeather({...weather, country: response.data})
  //       })
  //   }
  // }, [])

  return (
    <div>
      <Form setNewSearch={setNewSearch}/>
      <Display countries={countries} filtered={filtered} shown={shown} search={search} show={show} />
    </div>
  )
}

export default App;
