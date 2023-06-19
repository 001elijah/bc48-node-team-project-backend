const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card-controller')
const { validateBodyBoard } = require('../utils')
const schema = require('../schema/cardSchema')
const { authenticate, isValidId } = require('../middlewares')

router.use(authenticate)

router.post(
    '/',
    validateBodyBoard(schema.cardAddSchema),
    cardController.addCard
)

router.get(
    '/',
    validateBodyBoard(schema.cardGetAllSchema),
    cardController.getCardsByColum
)

router.put('/:cardId', isValidId, cardController.updateCardById)

router.delete('/:cardId', isValidId, cardController.deleteCardById)

module.exports = router
