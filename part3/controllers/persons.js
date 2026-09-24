const personsRouter = require('express').Router()
const Person = require('../models/person')

const validateName = (name) => {
  return name && name.length >= 3
}

const validateNumber = (number) => {
  return number && /^\d{2,3}-\d{3,}$/.test(number)
}

personsRouter.get('/', async (request, response) => {
  const persons = await Person.find({})
  response.json(persons)
})

personsRouter.get('/info', async (request, response) => {
  const persons = await Person.find({})
  const currentTime = new Date()
  const numberOfPersons = persons.length
  response.send(`<p>Time: ${currentTime}</p><p>Phonebook has ${numberOfPersons} contacts</p>`)
})

personsRouter.get('/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

personsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

personsRouter.put('/:id', async (request, response, next) => {
  try {
    const { name, number } = request.body
    const person = await Person.findById(request.params.id)

    if (!person) {
      return response.status(404).end()
    }

    person.name = name
    person.number = number

    const updatedPerson = await person.save()
    response.json(updatedPerson)
  } catch (error) {
    next(error)
  }
})

personsRouter.post('/', async (request, response, next) => {
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

  try {
    const existing = await Person.findOne({ name: body.name })

    if (existing) {
      return response.status(400).json({
        error: 'name must be unique',
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    const savedPerson = await person.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter
