/* GET /users/:userId - возвращает пользователя по _id
   GET /users — возвращает всех пользователей
   POST /users — создаёт пользователя
   PATCH /users/me — обновляет профиль
   PATCH /users/me/avatar — обновляет аватар профиля
*/

const {
  User,
} = require('../models/user')
const {
  handleError,
} = require('../utils/handleError')

// GET /users/:userId - возвращает пользователя по _id
async function getUser(req, res) {
  try {
    const {
      userId,
    } = req.params
    const user = await User.findById(userId)

    if (!user) {
      const error = new Error('Пользователь не найден')
      error.name = 'NotFoundError'
      throw error
    }

    res.send(user)
  } catch (err) {
    handleError(err, req, res)
  }
}

// GET /users — возвращает всех пользователей
async function getAllUsers(req, res) {
  try {
    const users = await User.find({
    })
    res.send(users)
  } catch (err) {
    handleError(err, req, res)
  }
}

// POST /users — создаёт пользователя
async function createUser(req, res) {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body
    const user = await User.create({
      email, password, name, about, avatar,
    })
    res.send(user)
  } catch (err) {
    handleError(err, req, res)
  }
}

// PATCH /users/me — обновляет профиль
async function updateUser(req, res) {
  try {
    const userId = req.user._id
    const {
      name, about,
    } = req.body
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name, about,
      },
      {
        new: true, runValidators: true,
      },
    )
    res.send(user)
  } catch (err) {
    handleError(err, req, res)
  }
}

// PATCH /users/me/avatar — обновляет аватар профиля
async function updateAvatar(req, res) {
  try {
    const userId = req.user._id
    const {
      avatar,
    } = req.body
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      {
        new: true,
      },
    )
    res.send(user)
  } catch (err) {
    handleError(err, req, res)
  }
}

module.exports = {
  getAllUsers, getUser, createUser, updateUser, updateAvatar,
}
