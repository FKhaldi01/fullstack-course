import { useState } from 'react'

const NewPersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addPerson(newName)
    setNewName('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm
