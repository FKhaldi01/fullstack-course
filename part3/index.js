require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const currentTime = new Date()
    const numberOfPersons = persons.length
    response.send(`<p>Time: ${currentTime}</p><p>Phonebook has ${numberOfPersons} contacts</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const validateName = (name) => {
  return name && name.length >= 3
}

const validateNumber = (number) => {
  return number && /^\d{2,3}-\d{3,}$/.test(number)
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (!validateName(body.name)) {
    return response.status(400).json({
      error: 'name must be at least 3 characters'
    })
  }

  if (!validateNumber(body.number)) {
    return response.status(400).json({
      error: 'invalid phone number format (expected XX-XXX...)'
    })
  }

  Person.findOne({ name: body.name }).then(existing => {
    if (existing) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

app.use(express.static('dist'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
