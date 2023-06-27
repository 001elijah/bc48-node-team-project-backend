const { HttpError, ctrlWrapper } = require('../helpers')
const { Card } = require('../models/card')
const { Board } = require('../models/board')

const addCard = async (req, res, next) => {
    const { _id: owner } = req.user
    const { boardId, columnId } = req.body

    const board = await Board.findById(boardId)

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    const index = columns.findIndex((column) => column.id == columnId)

    if (index === -1) {
        throw HttpError(400, `${columnId} is not valid id or not found`)
    }

    const card = await Card.create({ ...req.body, owner })

    res.status(201).json(card)
}

const getAllCards = async (req, res, next) => {
    const { _id: owner } = req.user

    const cards = await Card.find({ owner })

    res.json(cards)
}

const updateCardById = async (req, res, next) => {
    const { _id: owner } = req.user
    const { cardId } = req.params

    const updateCard = await Card.updateOne({ _id: cardId, owner }, req.body)

    if (updateCard.modifiedCount === 0) {
        throw HttpError(404)
    }

    const card = await Card.findById(cardId)

    res.json(card)
}

const deleteCardById = async (req, res, next) => {
    const { _id: owner } = req.user
    const { cardId } = req.params

    const card = await Card.deleteOne({ _id: cardId, owner })

    if (card.deletedCount === 0) {
        throw HttpError(404)
    }

    res.json({ message: 'card deleted' })
}

const updateCardColumn = async (req, res, next) => {
    const { _id: owner } = req.user
    const { boardId, columnId } = req.body
    const { cardId } = req.params

    const board = await Board.findById(boardId)

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    const index = columns.findIndex((column) => column.id == columnId)

    if (index === -1) {
        throw HttpError(404, `Column not found`)
    }

    const card = await Card.findById(cardId)

    if (card.columnId === columnId) {
        throw HttpError(404, 'This column was used in this card')
    }

    const updateCard = await Card.updateOne(
        { _id: cardId, owner },
        { columnId: columnId }
    )

    if (updateCard.modifiedCount === 0) {
        throw HttpError(404)
    }

    const cardNow = await Card.findById(cardId)

    res.json(cardNow)
}

module.exports = {
    addCard: ctrlWrapper(addCard),
    getAllCards: ctrlWrapper(getAllCards),
    updateCardById: ctrlWrapper(updateCardById),
    deleteCardById: ctrlWrapper(deleteCardById),
    updateCardColumn: ctrlWrapper(updateCardColumn),
}
