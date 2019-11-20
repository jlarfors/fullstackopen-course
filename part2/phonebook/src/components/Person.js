import React from 'react'

const Person = ({ person, deletePhonebookEntry }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={() => deletePhonebookEntry(person)}>Delete</button></td>
  </tr>
)

export default Person