const express = require('express')
const mongoose = require('mongoose')
const {
  errors,
} = require('celebrate')
const helmet = require('helmet')
const {
  routes,
} = require('./routes')
const {
  handleError,
} = require('./middlewares/handleError')

const {
  requestLogger, errorLogger,
} = require('./middlewares/logger')

const {
  PORT = 3000, DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env

const app = express()

app.use(helmet())

// подключаемся к серверу mongo
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`)
  })
  .catch((err) => {
    console.log('Error on database connection')
    console.error(err)
  })

app.use(requestLogger) // подключаем логгер запросов

// подключаем роуты и всё остальное...
app.use(express.json())
app.use(routes)

app.use(errorLogger) // подключаем логгер ошибок

app.use(errors()) // обработчик ошибок celebrate

app.use(handleError)

app.listen(PORT, () => {
  console.log(`is running on port ${PORT}`)
})
