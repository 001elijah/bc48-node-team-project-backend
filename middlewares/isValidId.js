const { isValidObjectId } = require('mongoose')
const { HttpError } = require('../helpers')

const isValidId = (req, res, next) => {
    const { boardId, cardId } = req.params

    if (!isValidObjectId(boardId) && !isValidObjectId(cardId)) {
        next(HttpError(400, `${boardId || cardId} is not valid id`))
    }

    next()
}

module.exports = isValidId
