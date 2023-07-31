const express = require('express')
const {
  getAllUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users')

const users = express.Router()

users.get('/', getAllUsers)
users.get('/:userId', getUser)
users.post('/', express.json(), createUser)
users.patch('/me', express.json(), updateUser)
users.patch('/me/avatar', express.json(), updateAvatar)

module.exports = {
  users,
}
