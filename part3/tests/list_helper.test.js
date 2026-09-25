const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, sums all likes', () => {
    const blogs = [
      { title: 'First', likes: 5 },
      { title: 'Second', likes: 7 },
      { title: 'Third', likes: 3 },
    ]

    assert.strictEqual(listHelper.totalLikes(blogs), 15)
  })

  test('when list is empty, returns zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      likes: 10,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 0,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      likes: 2,
    },
  ]

  test('returns the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    { title: 'First', author: 'Robert C. Martin', likes: 5 },
    { title: 'Second', author: 'Edsger W. Dijkstra', likes: 10 },
    { title: 'Third', author: 'Robert C. Martin', likes: 3 },
    { title: 'Fourth', author: 'Robert C. Martin', likes: 8 },
  ]

  test('returns the author with the most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  const blogs = [
    { title: 'First', author: 'Robert C. Martin', likes: 5 },
    { title: 'Second', author: 'Edsger W. Dijkstra', likes: 10 },
    { title: 'Third', author: 'Robert C. Martin', likes: 3 },
    { title: 'Fourth', author: 'Edsger W. Dijkstra', likes: 8 },
  ]

  test('returns the author with the most likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 18,
    })
  })
})
