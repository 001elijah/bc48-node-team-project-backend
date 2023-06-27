const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card-controller')
const { validateBodyBoard } = require('../middlewares')
const { schemas } = require('../models/card')
const { authenticate, isValidId } = require('../middlewares')

router.use(authenticate)

router.post(
    '/',
    validateBodyBoard(schemas.cardAddSchema),
    cardController.addCard
)

router.get('/', cardController.getAllCards)

router.patch(
    '/:cardId',
    validateBodyBoard(schemas.cardUpdateSchema),
    isValidId,
    cardController.updateCardById
)

router.patch(
    '/column/:cardId',
    validateBodyBoard(schemas.cardUpdateColumnSchema),
    isValidId,
    cardController.updateCardColumn
)

router.delete('/:cardId', isValidId, cardController.deleteCardById)

module.exports = router
