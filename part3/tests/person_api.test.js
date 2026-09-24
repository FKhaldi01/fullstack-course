const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Person = require('../models/person')
const { personsInDb } = require('./test_helper')

const api = supertest(app)

const initialPersons = [
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    name: 'Grace Hopper',
    number: '12-43-234345',
  },
]

describe('when there is initially some persons saved', () => {
  beforeEach(async () => {
    await Person.deleteMany({})
    await Person.insertMany(initialPersons)
  })

  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')

    assert.strictEqual(response.body.length, initialPersons.length)
  })

  test('a specific person is within the returned persons', async () => {
    const response = await api.get('/api/persons')

    const names = response.body.map(person => person.name)
    assert(names.includes('Ada Lovelace'))
  })

  describe('viewing a specific person', () => {
    test('succeeds with a valid id', async () => {
      const personsAtStart = await personsInDb()
      const personToView = personsAtStart[0]

      const resultPerson = await api
        .get(`/api/persons/${personToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultPerson.body, personToView)
    })

    test('fails with statuscode 404 if person does not exist', async () => {
      const validNonExistingId = '64d7e6d5f1c7db5a1f9d1b7c'

      await api.get(`/api/persons/${validNonExistingId}`).expect(404)
    })

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '123'

      await api.get(`/api/persons/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new person', () => {
    test('succeeds with valid data', async () => {
      const newPerson = {
        name: 'Mary Poppins',
        number: '23-4567890',
      }

      await api
        .post('/api/persons')
        .send(newPerson)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const personsAtEnd = await personsInDb()
      assert.strictEqual(personsAtEnd.length, initialPersons.length + 1)

      const names = personsAtEnd.map(person => person.name)
      assert(names.includes('Mary Poppins'))
    })

    test('fails with status code 400 if data is invalid', async () => {
      const newPerson = { number: '12-34-567' }

      await api.post('/api/persons').send(newPerson).expect(400)

      const personsAtEnd = await personsInDb()
      assert.strictEqual(personsAtEnd.length, initialPersons.length)
    })
  })

  describe('deletion of a person', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const personsAtStart = await personsInDb()
      const personToDelete = personsAtStart[0]

      await api.delete(`/api/persons/${personToDelete.id}`).expect(204)

      const personsAtEnd = await personsInDb()
      const ids = personsAtEnd.map(person => person.id)
      assert(!ids.includes(personToDelete.id))
      assert.strictEqual(personsAtEnd.length, initialPersons.length - 1)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
