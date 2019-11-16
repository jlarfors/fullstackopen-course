import React from 'react'
import Person from './Person'

const Numbers = ({persons, filterName}) => {
    const isSearchMatch = (name, filter) => {
        return (!filter || name.toUpperCase().includes(filter.toUpperCase()))
    }

    const personList = persons
        .filter(person => !filterName || isSearchMatch(person.name, filterName))
        // .filter(person => true)
        .map((person, index) => <Person key={index} person={person} />)

    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
                {personList}
                </tbody>
            </table>
        </div>
    )
}

export default Numbers