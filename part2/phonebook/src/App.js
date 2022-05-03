import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import Input from './components/Input'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch ] = useState('') 

  const setName = (event) => setNewName(event.target.value)

  const setNum = (event) => setNewNum(event.target.value)

  const setSearch = (event) => setNewSearch(event.target.value)

  const submission = (event) => {
    event.preventDefault()

    let found = false

    persons.forEach(item=> {
      if (item.name === newName) {
        alert(`${newName} is already added to phonebook`)
        found = true
      }
    })

    if (found) {
      return
    }

    const personsObject = {
      id: persons.length + 1,
      name: newName,
      num: newNum
    }

    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNum('')
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      console.log(persons)
    },
    [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} setSearch={setSearch}/>
      <br/>
      <h3>Add a new</h3>
      <Input submission={submission} newName={newName} setName={setName} newNum={newNum} setNum={setNum}/>
      <br/>
      <h3>Numbers</h3>
      <Persons persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App
