const { HttpError, ctrlWrapper } = require('../helpers')
const { Board } = require('../models/board')
const shortid = require('shortid')
const { getImages } = require('../middlewares')

const getBoardAll = async (req, res, next) => {
    const { _id: owner } = req.user

    const boards = await Board.find({ owner }).populate('owner', '-_id email')

    res.json(boards)
}

const addBoard = async (req, res, next) => {
    const { _id: owner } = req.user

    const board = await Board.create({ ...req.body, owner })

    res.status(201).json(board)
}

const updateBoardById = async (req, res, next) => {
    const { _id: owner } = req.user
    const { boardId } = req.params

    const updateBoard = await Board.updateOne({ _id: boardId, owner }, req.body)

    if (updateBoard.modifiedCount === 0) {
        throw HttpError(404)
    }

    const board = await Board.findById(boardId)

    res.json(board)
}

const deleteBoardById = async (req, res, next) => {
    const { _id: owner } = req.user
    const { boardId } = req.params

    const board = await Board.deleteOne({ _id: boardId, owner })

    if (board.deletedCount === 0) {
        throw HttpError(404)
    }

    res.json({ message: 'board deleted' })
}

const addColumn = async (req, res, next) => {
    const { title, boardId } = req.body
    const { _id: owner } = req.user

    const newColumn = {
        id: shortid.generate(),
        title,
    }

    const board = await Board.updateOne(
        { _id: boardId, owner },
        { $push: { columns: newColumn } }
    )

    if (board.modifiedCount === 0) {
        throw HttpError(404)
    }

    res.status(201).json(newColumn)
}

const getColumn = async (req, res, next) => {
    const { boardId } = req.body
    const { _id: owner } = req.user

    const board = await Board.findOne({ _id: boardId, owner })

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    res.json(columns)
}

const updateColumn = async (req, res, next) => {
    const { columnId } = req.params
    const { title, boardId } = req.body
    const { _id: owner } = req.user

    const board = await Board.findOne({ _id: boardId, owner })

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    const index = columns.findIndex((column) => column.id == columnId)

    if (index == -1) {
        throw HttpError(400, `${columnId} is not valid id`)
    }

    const updateBoard = await Board.updateOne(
        { _id: boardId, owner },
        { $set: { [`columns.${index}.title`]: title } }
    )

    if (updateBoard.modifiedCount === 0) {
        throw HttpError(404)
    }

    const boardGetColumn = await Board.findOne({ _id: boardId, owner })

    res.json(boardGetColumn.columns[index])
}

const deleteColumnById = async (req, res, next) => {
    const { _id: owner } = req.user
    const { columnId } = req.params
    const { boardId } = req.body

    const board = await Board.findOne({ _id: boardId, owner })

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    const index = columns.findIndex((column) => column.id == columnId)

    if (index === -1) {
        throw HttpError(
            400,
            `${columId} is not valid id or this column not created`
        )
    }

    const updateBoard = await Board.updateOne(
        { _id: boardId, owner },
        { $pull: { columns: { id: columnId } } }
    )

    if (updateBoard.modifiedCount === 0) {
        throw HttpError(404)
    }

    res.json({ message: 'Column daleted' })
}

const getBackground = async (req, res) => {
    const screenSize = req.screenSize
    let folder
    if (screenSize === 'mobile') {
        folder = 'background/mobile'
    } else if (screenSize === 'tablet') {
        folder = 'background/tablet'
    } else {
        folder = 'background/desktop'
    }
    try {
        const images = await getImages(folder)
        res.json(images)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve images' })
    }
}

module.exports = {
    getBoardAll: ctrlWrapper(getBoardAll),
    addBoard: ctrlWrapper(addBoard),
    addColumn: ctrlWrapper(addColumn),
    getColumn: ctrlWrapper(getColumn),
    updateColumn: ctrlWrapper(updateColumn),
    deleteBoardById: ctrlWrapper(deleteBoardById),
    updateBoardById: ctrlWrapper(updateBoardById),
    deleteColumnById: ctrlWrapper(deleteColumnById),
    getBackground: ctrlWrapper(getBackground),
}
