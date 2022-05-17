const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

logger.info('Connecting to MongoDB')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => { logger.info('Connected to MongoDB') })
  .catch((error) => logger.info('Error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
