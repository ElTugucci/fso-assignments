require('dotenv').config()

const express = require('express')
const app = express()
require('express-async-errors')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const { errorHandler } = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const logoutRouter = require('./controllers/logout')
const authorRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readinglists')



app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/logout', logoutRouter)

app.use(errorHandler)


const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
