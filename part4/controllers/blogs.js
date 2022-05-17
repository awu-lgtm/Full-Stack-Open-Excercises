const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1, name: 1, id: 1,
    })
  response.json(blogs)
})

// eslint-disable-next-line consistent-return
blogRouter.post('/', userExtractor, async (request, response) => {
  const {
    title, author, url, likes = 0,
  } = request.body

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401)
  // }
  // const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: request.user.id,
  })

  const result = await blog.save()
  response.status(201).json(result).end()
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401)
  }

  const user = await User.findById(decodedToken.id)

  const blog = await Blog.findById(request.params.id)
  if (!blog.user.toString() === user.id.toString()) {
    return response.status(401)
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const {
    title, author, url, likes = 0,
  } = request.body

  const blog = {
    title,
    author,
    url,
    likes,
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)
})

module.exports = blogRouter
