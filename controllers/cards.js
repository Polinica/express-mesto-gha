const mongoose = require('mongoose')
const {
  Card,
} = require('../models/card')
const {
  handleError,
} = require('../utils/handleError')
const {
 NotFoundError
} = require('../errors/NotFoundError')
const {
 UnauthorizedError
} = require('../errors/UnauthorizedError')

// GET /cards — возвращает все карточки
async function getAllCards(req, res) {
  try {
    const cards = await Card.find({
    })
    res.send(cards)
  } catch (err) {
    handleError(err, req, res)
  }
}

// POST /cards — создаёт карточку
async function createCard(req, res) {
  try {
    const {
      name, link,
    } = req.body
    const ownerId = req.user._id
    const card = await Card.create({
      name, link, owner: ownerId,
    })
    res.send(card)
  } catch (err) {
    handleError(err, req, res)
  }
}

// DELETE /cards/:cardId — удаляет карточку по идентификатору
async function deleteCard(req, res, next) {
  try {
    const {
      cardId,
    } = req.params

    let card = mongoose.Types.ObjectId.isValid(cardId)

    if (card) {
      card = await Card.findById(cardId).populate('owner')
    }

    if (!card) {
      throw new NotFoundError('Карточка не найдена')
    }

    const ownerId = card.owner.id
    const userId = req.user._id

    if (ownerId !== userId) {
      throw new UnauthorizedError('Удалить можно только свою карточку')
    }

    await Card.findByIdAndRemove(cardId)

    res.send(card)
  } catch (err) {
    next(err)
  }
}

// PUT /cards/:cardId/likes — поставить лайк карточке
async function putLike(req, res, next) {
  try {
    const userId = req.user._id
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: {
          likes: userId,
        },
      }, // добавить _id в массив, если его там нет
      {
        new: true,
      },
    )

    if (!card) {
      throw new NotFoundError('Карточка не найдена')
    }
    res.send(card)
  } catch (err) {
    next(err)
  }
}

// DELETE /cards/:cardId/likes — убрать лайк с карточки
async function deleteLike(req, res, next) {
  try {
    const userId = req.user._id
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: {
          likes: userId,
        },
      }, // убрать _id из массива, если он есть
      {
        new: true,
      },
    )
    if (!card) {
      throw new NotFoundError('Карточка не найдена')
    }
    res.send(card)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createCard, getAllCards, deleteCard, putLike, deleteLike,
}
