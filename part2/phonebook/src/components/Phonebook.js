
import React from 'react'
import SearchFilter from './SearchFilter'
import Numbers from './Numbers'

const Phonebook = ({
  persons,
  newPerson,
  filterName,
  handleFilterChange,
  handleInputChange,
  addPhonebookEntry }) => {

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchFilter handleFilterChange={handleFilterChange} filterName={filterName} />

      <h2>Add New Person</h2>
      <form onSubmit={addPhonebookEntry}>
        <div>
          name: <input name="name" onChange={handleInputChange} value={newPerson.name} />
        </div>
        <div>
          number: <input name="number" onChange={handleInputChange} value={newPerson.number} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} filterName={filterName} />
    </div>
  )
}

export default Phonebook
