
import React, { useState } from 'react'

const Person = ({person}) => (
  <div>
    {person.name}
  </div>
)

const Numbers = ({persons}) => {
  const personList = persons.map(person => <Person person={person} />)
  return (
    <div>
      <h2>Numbers</h2>
      {personList}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPhonebookEntry = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    console.log(newName)
    if (persons.some(person => person.name == newName)) {
      alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhonebookEntry}>
        <div>
          name: <input onChange={handleNoteChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <Numbers persons={persons} />
      
    </div>
  )
}

export default App
