
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './Phonebook'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filterName, setFilterName] = useState('')

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleInputChange = (event) => {
    const target = event.target
    const copy = { ...newPerson }
    copy[target.name] = target.value
    setNewPerson(copy)
  }

  const addPhonebookEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  const setInitialPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        const persons = response.data
        console.log(persons)
        setPersons(persons)
      })
  }

  useEffect(setInitialPersons, [])

  return (
    <div>
      <Phonebook
        persons={persons}
        newPerson={newPerson}
        filterName={filterName}
        handleFilterChange={handleFilterChange}
        handleInputChange={handleInputChange}
        addPhonebookEntry={addPhonebookEntry}
      />
    </div>
  )
}

export default App
