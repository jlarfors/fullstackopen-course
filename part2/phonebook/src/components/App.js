
import React, { useState } from 'react'
import Phonebook from './Phonebook'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0123456' },
    { name: 'Charles Darwin', number: '987654' },
    { name: 'Charles Xavier', number: '987654' },
    { name: 'King Charles', number: '987654' },
  ]) 

  const [ newPerson, setNewPerson ] = useState({name: '', number: ''})
  const [ filterName, setFilterName ] = useState('')

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleInputChange = (event) => {
    const target = event.target
    const copy = {...newPerson}
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
