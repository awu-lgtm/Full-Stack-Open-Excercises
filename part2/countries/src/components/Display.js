import Button from './Button'
import { useState } from 'react'
import Weather from './Weather'

const Display = ( {countries, filtered, shown, search, show} ) => {

    // let filtered = countries.filter(country => country.name.common.toUpperCase().includes(search.toUpperCase()))

    // let arr = new Array(filtered.length).fill(0)

    // const [ shown, setShown ] = useState(arr)

    // const show = (index) => {
    //     const copy = [...shown]
    //     copy[index] = 1
    //     return (
    //         setShown(copy)
    //     )
    // }

    const state = (index) => {
        return shown[index] ? 'hide' : 'show'
    }

    const reveal = (index) => {
        let country = filtered[index]
        let languages = []
        for (const lang in country.languages) {
            languages.push(country.languages[lang])
        }
        if (shown[index]) {
            return (
                <div>
                    <h1>
                        {country.name.common}
                    </h1>
                    <p> capital {country.capital} 
                        <br/>
                        population {country.population} </p>
                    <h1> languages </h1>
                    <ul>
                        {languages.map(lang => <li key={lang}>{lang}</li>)}
                    </ul>
                    <img src={country.flags.png}/>
                    <Weather country={country.name.common} capital={country.capital} />
                </div>
            )
        }
    }

    if (filtered.length > 10 && search != '') {
        return (
            <div> Too many matches, specify another filter </div>
        )

    } else if (filtered.length == 1) {
        const country = filtered[0]
        console.log(country)
        let languages = []
        for (const lang in country.languages) {
            languages.push(country.languages[lang])
        }

        return (
            <div>
                <h1>
                    {country.name.common}
                </h1>
                <p> capital {country.capital} 
                    <br/>
                    population {country.population} </p>
                <h1> languages </h1>
                <ul>
                    {languages.map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png}/>
                <Weather country={country.name.common} capital={country.capital} />
            </div>
        )
    }

    return (
        <div>
            <br/>
            {filtered.map((country, index) => 
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => show(index)}> 
                        {state(index)}
                    </button>
                {reveal(index)}
                <br/><br/>
                </div>)}
        </div>
    )
}

export default Display