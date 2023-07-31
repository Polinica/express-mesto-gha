const express = require('express')

const {
  createCard, getAllCards, deleteCard, putLike, deleteLike,
} = require('../controllers/cards')

const cards = express.Router()

cards.get('/', getAllCards)
cards.delete('/:cardId', deleteCard)
cards.post('/', express.json(), createCard)
cards.put('/:cardId/likes', putLike)
cards.delete('/:cardId/likes', deleteLike)

module.exports = {
  cards,
}
