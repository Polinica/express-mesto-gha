const express = require('express')
// const {
//   handleError,
// } = require('../utils/handleError')
const {
  users,
} = require('./users')
const {
  cards,
} = require('./cards')
const {
auth
} = require('../middlewares/auth')

const {
 login, createUser
} = require('../controllers/users')

const {
 NotFoundError
} = require('../errors/NotFoundError')

const routes = express.Router()

routes.post('/signup', express.json(), createUser)
routes.post('/signin', express.json(), login)

routes.all('*', auth)

routes.use('/users', users)
routes.use('/cards', cards)

routes.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес запроса'))
})

module.exports = {
  routes,
}
