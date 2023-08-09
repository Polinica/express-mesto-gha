const express = require('express')
// const {
//  celebrate, Joi
// } = require('celebrate')
const {
  getAllUsers, getUser, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users')

const users = express.Router()

users.get('/', getAllUsers)
users.get('/:userId', getUser)
// users.post('/', express.json(), createUser)
users.get('/me', getCurrentUser)
users.patch('/me', updateUser)
users.patch('/me/avatar', updateAvatar)

module.exports = {
  users,
}
