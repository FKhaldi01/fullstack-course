const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

app.use(morgan('tiny'))

app.use((request, response, next) => {
  if (request.method === 'POST') {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', JSON.stringify(request.body))
    console.log('---')
  }
  next()
})

let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const currentTime = new Date()
  const numberOfPersons = persons.length
  response.send(`<p>Time: ${currentTime}</p><p>Phonebook has ${numberOfPersons} contacts</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const person = persons.find(p => p.id === id)
  if (!person) {
    return response.status(404).end()
  }

  const updatedPerson = {
    ...person,
    name: body.name,
    number: body.number,
  }
  persons = persons.map(p => p.id !== id ? p : updatedPerson)
  response.json(updatedPerson)
})

const generateId = () => {
  return String(Math.floor(Math.random() * 100000))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const nameExists = persons.some(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

app.use(express.static('dist'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
