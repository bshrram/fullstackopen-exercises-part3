import React from 'react'

const Persons = props => {
  return (
    <>
      {props.shownPersons.map(person => (
        <div key={person.id}>
          {person.name} {person.number + ' '}
          <button onClick={() => props.deletePerson(person)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default Persons
