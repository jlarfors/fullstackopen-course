
import React, { useState, useEffect } from 'react'
import Phonebook from './Phonebook'
import personService from '../services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)

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
    const person = persons.find(person => person.name === newPerson.name)
    if (person) {
      const result = window.confirm(`${newPerson.name} already exists. Replace the old number with the new one?`)
      // alert(`${newPerson.name} is already added to the phonebook`)
      if (result) {
        personService
          .update(person.id, newPerson)
          .then(response => {
            setPersons(persons.map(it => it.id === person.id ? response.data : it))
            setNotification({"message" : `${person.name} successfully updated`, "status" : "success"})
            setTimeout(() => {
              setNotification(null)
            }, 2000)
          })
          .catch(error => {
            console.log(error)
            setNotification({"message" : `${newPerson.name} could not be updated`, "status" : "error"})
            setTimeout(() => {
              setNotification(null)
            }, 2000)
            setPersons(persons.filter(it => it.id !== person.id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(response => {
          console.log(response.data)
          setPersons(persons.concat(response.data))
          setNotification({"message" : `${newPerson.name} successfully added`, "status" : "success"})
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          setNotification({"message" : error.response.data.error, "status" : "error"})
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }
  }

  const setInitialPersons = () => {
    personService
      .getAll()
      .then(response => {
        const persons = response.data
        console.log(persons)
        setPersons(persons)
      })
  }

  const deletePhonebookEntry = (person) => {
    const result = window.confirm(`Delete ${person.name}?`)
    if (result) {
      personService
        .deletePerson(person.id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(it => it.name !== person.name))
          setNotification({"message" : `${person.name} successfully deleted`, "status" : "success"})
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
        .catch(error => {
          console.log(error)
          setNotification({"message" : `${newPerson.name} could not be deleted`, "status" : "error"})
          setTimeout(() => {
            setNotification(null)
          }, 2000)
        })
    }
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
        deletePhonebookEntry={deletePhonebookEntry}
        notification={notification}
      />
    </div>
  )
}

export default App
