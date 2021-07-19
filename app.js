const express = require('express')
const morgan = require('morgan')
const path = require('path')
const userRouter = require('./routes/userRoutes')
const movieRouter = require('./routes/movieRoutes')
const actorRouter = require('./routes/actorRoutes')

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// @@desc Middleware for parsing request/response body
app.use(express.json())

//@@desc Serve static files
app.use(express.static(path.join(__dirname, 'uploads')))

//@@desc Use defined routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/actors', actorRouter)

module.exports = app
