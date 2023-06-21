const { HttpError } = require('../helpers')
const Card = require('../models/card')

const addCard = async (req, res, next) => {
    try {
        const { _id: owner } = req.user

        const card = await Card.create({ ...req.body, owner })

        res.status(201).json(card)
    } catch (err) {
        next(err)
    }
}

const getCardsByColum = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { boardId, columId } = req.body

        const cards = await Card.find({ boardId, columId, owner })

        res.json(cards)
    } catch (err) {
        next(err)
    }
}

const updateCardById = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { cardId } = req.params

        const updateCard = await Card.updateOne(
            { _id: cardId, owner },
            req.body
        )

        if (updateCard.modifiedCount == 0) {
            throw HttpError(404)
        }

        const card = await Card.findById(cardId)

        res.json(card)
    } catch (err) {
        next(err)
    }
}

const deleteCardById = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { cardId } = req.params

        const card = await Card.deleteOne({ _id: cardId, owner })

        if (card.deletedCount == 0) {
            throw HttpError(404)
        }

        res.json({ message: 'card deleted' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCard,
    getCardsByColum,
    updateCardById,
    deleteCardById,
}
