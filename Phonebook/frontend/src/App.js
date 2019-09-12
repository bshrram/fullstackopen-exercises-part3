import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorState, setErrorState] = useState(0)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const newNotification = (newMessage, e) => {
    setMessage(newMessage)
    setErrorState(e)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const addName = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson.id, personObject)
          .then(returnedPerson => {
            newNotification(`Updated ${returnedPerson.name}'s number`, 0)
            setPersons(
              persons.map(p => (p.id !== foundPerson.id ? p : returnedPerson))
            )
          })
          .catch(err => {
            newNotification(
              `Information of ${foundPerson.name} has already been removed from server`,
              1
            )
            setPersons(persons.filter(p => p.id !== foundPerson.id))
          })
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        newNotification(`Added ${returnedPerson.name}`, 0)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteOne(person.id)
        .then(response => {
          newNotification(`deleted ${person.name}`, 0)
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(err => {
          newNotification(
            `Information of ${person.name} has already been removed from server`,
            1
          )
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const handleNameChange = event => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const shownPersons =
    filter === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorState={errorState} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons shownPersons={shownPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
