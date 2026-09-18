import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Anecdotes from './components/Anecdotes'
import Statistics from './components/Statistics'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [view, setView] = useState('phonebook')
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleToggleAll = () => {
    setShowAll(!showAll)
  }

  const handleViewChange = (newView) => {
    setView(newView)
  }

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newName || !newNumber) {
      alert('Name and number are required')
      return
    }

    const personExists = persons.some(p => p.name.toLowerCase() === newName.toLowerCase())

    if (personExists) {
      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...person, number: newNumber }
        personService.update(person.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const displayedPersons = showAll
    ? persons
    : persons.filter(person => !person.important)

  const filteredPersons = filter
    ? displayedPersons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    : displayedPersons

  return (
    <div className="app">
      <div className="navigation">
        <button onClick={() => handleViewChange('phonebook')}>Phonebook</button>
        <button onClick={() => handleViewChange('anecdotes')}>Anecdotes</button>
        <button onClick={() => handleViewChange('unicafe')}>Unicafe</button>
      </div>
      {view === 'phonebook' && (
        <div className="phonebook">
          <h1>Phonebook</h1>
          <h2>Phonebook</h2>
          <Filter filter={filter} handleFilterChange={handleFilterChange} />
          <button onClick={handleToggleAll}>{showAll ? 'hide important' : 'show important'}</button>
          <h3>Add a new</h3>
          <PersonForm
            newName={newName}
            number={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            handleSubmit={handleSubmit}
          />
          <h3>Numbers</h3>
          <Persons persons={filteredPersons} handleDelete={handleDelete} />
        </div>
      )}
      {view === 'anecdotes' && <Anecdotes />}
      {view === 'unicafe' && (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          handleGood={handleGood}
          handleNeutral={handleNeutral}
          handleBad={handleBad}
        />
      )}
    </div>
  )
}

export default App
