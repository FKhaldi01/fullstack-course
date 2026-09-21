const personsRouter = require('express').Router()
const Person = require('../models/person')

const validateName = (name) => {
  return name && name.length >= 3
}

const validateNumber = (number) => {
  return number && /^\d{2,3}-\d{3,}$/.test(number)
}

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    const currentTime = new Date()
    const numberOfPersons = persons.length
    response.send(`<p>Time: ${currentTime}</p><p>Phonebook has ${numberOfPersons} contacts</p>`)
  })
})

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
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

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }

  if (!validateName(body.name)) {
    return response.status(400).json({
      error: 'name must be at least 3 characters',
    })
  }

  if (!validateNumber(body.number)) {
    return response.status(400).json({
      error: 'invalid phone number format (expected XX-XXX...)',
    })
  }

  Person.findOne({ name: body.name }).then(existing => {
    if (existing) {
      return response.status(400).json({
        error: 'name must be unique',
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }).catch(error => next(error))
})

module.exports = personsRouter
