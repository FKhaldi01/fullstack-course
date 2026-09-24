const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogsInDb } = require('./test_helper')

const api = supertest(app)

let userId
let token

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chapman',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go TO or not Go TO',
    author: 'Andy J. G. Bichlmann',
    url: 'https://blog.risingstack.com/go-to-statement/',
    likes: 5,
  },
]

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salainen', 10)
    const user = new User({
      username: 'blog-root',
      name: 'Blog Root User',
      passwordHash,
    })
    const savedUser = await user.save()
    userId = savedUser._id

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'blog-root', password: 'salainen' })

    token = loginResponse.body.token

    const blogsWithUser = initialBlogs.map(blog => ({ ...blog, user: userId }))
    await Blog.insertMany(blogsWithUser)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('id identifier is named id', async () => {
    const blogs = await blogsInDb()

    assert.ok(blogs[0].id)
  })

  test('blogs include populated user information', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[0].user.username, 'blog-root')
    assert.strictEqual(response.body[0].user.name, 'Blog Root User')
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data when token is provided', async () => {
      const newBlog = {
        title: 'Type Wars for the Aged',
        author: 'Mark toots',
        url: 'https://type-war.example.com',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      assert(titles.includes('Type Wars for the Aged'))
    })

    test('fails with status code 401 if token is missing', async () => {
      const newBlog = {
        title: 'Type Wars for the Aged',
        author: 'Mark toots',
        url: 'https://type-war.example.com',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })

    test('likes default to zero if missing', async () => {
      const newBlog = {
        title: 'Default likes blog',
        author: 'Mark toots',
        url: 'https://default-likes.example.com',
        userId,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

      const blogsAtEnd = await blogsInDb()
      const created = blogsAtEnd.find(blog => blog.title === 'Default likes blog')
      assert.strictEqual(created.likes, 0)
    })

    test('fails with status code 400 if data is invalid', async () => {
      const newBlog = {
        author: 'Mark toots',
        url: 'https://type-war.example.com',
        userId,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await blogsInDb()
      const ids = blogsAtEnd.map(blog => blog.id)
      assert(!ids.includes(blogToDelete.id))
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const updatedBlog = {
        title: `${blogToUpdate.title} updated`,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)

      const updated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      assert.strictEqual(updated.likes, blogToUpdate.likes + 1)
      assert.strictEqual(updated.title, `${blogToUpdate.title} updated`)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
