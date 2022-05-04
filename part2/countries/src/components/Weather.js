import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ( {country, capital}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [ coord, setCoordinates ] = useState({})
    const [ weather, setWeather ] = useState({})

    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/geo/1.0/direct?q=${capital[0]}}&limit=1&appid=${api_key}`)
            .then(response => {
                const copy = {...coord}
                copy[country] = response.data[0]
                setCoordinates(copy)
                // console.log(coord[country]['lon'])
            })
        }, [capital])
        //console.log(coord[country][0].lon)
    
    console.log(coord)
    if (coord.hasOwnProperty(country)) {
        console.log(coord[country].lon)
    }
    useEffect(() => {
        if (coord.hasOwnProperty(country)) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord[country]['lat']}&lon=${coord[country]['lon']}&appid=${api_key}`)
                .then(response => {
                    const copy = {...weather}
                    copy[country] = response.data
                    setWeather(copy)
                })
            }
        }, [coord])

    console.log(weather)
    if (weather.hasOwnProperty(country)) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p> temperature: {(weather[country].main.temp-273.15).toFixed(2)} {'\u2103'} </p>
                <p> wind: {weather[country].wind.speed} </p>
        </div>
        )
    }
}

export default Weather