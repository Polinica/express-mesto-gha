const express = require('express')

const {
  createCard,
} = require('../controllers/cards')

const {
  getAllCards,
} = require('../controllers/getAllCards')
const {
  deleteCard,
} = require('../controllers/deleteCard')

const {
  putLike,
} = require('../controllers/putLike')
const {
  deleteLike,
} = require('../controllers/deleteLike')

const cards = express.Router()

cards.get('/', getAllCards)
cards.delete('/:cardId', deleteCard)
cards.post('/', express.json(), createCard)
cards.put('/:cardId/likes', putLike)
cards.delete('/:cardId/likes', deleteLike)

module.exports = {
  cards,
}
