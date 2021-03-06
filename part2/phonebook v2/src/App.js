import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Persons from './components/Persons'
import Input from './components/Input'
import axios from 'axios'
import personService from './services'
import Notif from './components/Notif'
import { c } from 'tar'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearch, setNewSearch ] = useState('') 
  const [ message, setMessage ] = useState(null)

  const setName = (event) => setNewName(event.target.value)

  const setNum = (event) => setNewNum(event.target.value)

  const setSearch = (event) => setNewSearch(event.target.value)

  const submission = (event) => {
    event.preventDefault()
    let id = ''
    let found = false

    persons.forEach(item => {
      if (item.name === newName) {
        id = item.id
        found = true
      }
    })

    const personsObject = {
      id: persons.length + 1,
      name: newName,
      num: newNum
    }

    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(id, {...personsObject, id: id})
          .then(response => setPersons(persons.map(person => person.id !== id ? person : response)))
          .catch(error => {
            setMessage([`Information of ${newName} has already been removed from server`, 1])
            setTimeout(() => setMessage(null), 5000)
          })
      }
      setNewName('')
      setNewNum('')
      return
    }

    personService
      .posts(personsObject)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage([`${newName} has been added`, 0])
        setTimeout(()=> setMessage(null), 5000)})
      .catch(error => console.log(error.response.data))
    
    
    setMessage([`${newName} has been added`, 0])
    setTimeout(()=> setMessage(null), 5000)
    setNewName('')
    setNewNum('')
  }

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
      console.log(persons)
    },
    [])

  const remove = id => {
    if (window.confirm(`Delete ${persons.find(person => person.id == id).name}?`))
    personService
      .deletion(id)
      .then(response => setPersons(persons.filter(person => person.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} setSearch={setSearch}/>
      <br/>
      <h3>Add a new</h3>
      <Input submission={submission} newName={newName} setName={setName} newNum={newNum} setNum={setNum}/>
      <br/>
      <h3>Numbers</h3>
      <Notif message={message}/>
      <Persons persons={persons} newSearch={newSearch} remove={remove}/>
    </div>
  )
}

export default App
