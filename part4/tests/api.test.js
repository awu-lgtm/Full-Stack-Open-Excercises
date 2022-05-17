const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const { c } = require('tar')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const oneUser = {
  _id: '5a422ba71b54a676234d17fd',
  username: 'wingdings',
  name: 'bill',
  passwordhash: '$2b$10$b63nO5GEQvNORuB4zfjOHuG6R8.CMiHAigY0Q48GNKcbdTgXQ7A1a',
  blogs: [],
  __v: 0,
}

const listWithOneBlog = {
  title: 'Hello',
  author: 'Adele',
  url: 'http://123songs',
  likes: 18,
}

const login = {
  username: 'wingdings',
  password: '123passwords',
}

const userForToken = {
  username: 'wingdings',
  id: '5a422ba71b54a676234d17fd',
}

let token = 'bearer '

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const blogObjects = blogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
  const user = new User(oneUser)
  await user.save()
  const newToken = jwt.sign(userForToken, process.env.SECRET)
  token += newToken.toString()
  console.log(token)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toBeDefined()
})

describe('post', () => {
  test('post adding blog', async () => {
    await api
      .post('/api/blogs')
      .send(listWithOneBlog)
      .set('Authorization', token)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogs.length + 1)
  })
})

// test('post adding correct content', async () => {
//   await api.post('/api/blogs', listWithOneBlog)
//   const response = await Blog.find({})

//   expect(response).toBeDefined()
// })

// test('like default value: 0', async () => {
//   await api.post('/api/blogs', { ...listWithOneBlog, likes: undefined })
//   const response = await Blog.find({})

//   expect(response).toBeDefined()
// })

afterAll(() => {
  mongoose.connection.close()
})
