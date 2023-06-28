const shortid = require('shortid')
const { HttpError, ctrlWrapper } = require('../helpers')
const { Board } = require('../models/board')
const { initializBackgrounds } = require('../middlewares')
const { Background } = require('../models/background')

const getBoardAll = async (req, res) => {
    const { _id: owner } = req.user

    const boards = await Board.find({ owner }).populate('owner', '-_id email')

    res.json(boards)
}

const addBoard = async (req, res) => {
    const { _id: owner } = req.user

    const board = await Board.create({ ...req.body, owner })

    res.status(201).json(board)
}

const getBoardById = async (req, res) => {
    const { _id: owner } = req.user
    const { boardId } = req.params

    const board = await Board.findOne({ _id: boardId, owner })
        .populate('owner', '-_id email')
        .populate(
            'background',
            '-_id mobileUrl_1x mobileUrl_2x tabletUrl_1x tabletUrl_2x desktopUrl_1x desktopUrl_2x'
        )

    if (!board) {
        throw HttpError(404)
    }

    res.json(board)
}

const updateBoardById = async (req, res) => {
    const { _id: owner } = req.user
    const { boardId } = req.params

    const updateBoard = await Board.updateOne({ _id: boardId, owner }, req.body)

    if (updateBoard.modifiedCount === 0) {
        throw HttpError(404)
    }

    const board = await Board.findById(boardId)

    res.json(board)
}

const deleteBoardById = async (req, res) => {
    const { _id: owner } = req.user
    const { boardId } = req.params

    const board = await Board.deleteOne({ _id: boardId, owner })

    if (board.deletedCount === 0) {
        throw HttpError(404)
    }

    res.json({ message: 'board deleted' })
}

const addColumn = async (req, res) => {
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

const getColumn = async (req, res) => {
    const { boardId } = req.body
    const { _id: owner } = req.user

    const board = await Board.findOne({ _id: boardId, owner })

    if (!board) {
        throw HttpError(404, 'Board not found')
    }

    const { columns } = board

    res.json(columns)
}

const updateColumn = async (req, res) => {
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

const deleteColumnById = async (req, res) => {
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
            `${columnId} is not valid id or this column not created`
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

const getBackgroundThumbnails = async (req, res) => {
    try {
        let backgrounds = await Background.find()
        if (backgrounds.length === 0) {
            await initializBackgrounds()
            backgrounds = await Background.find()
        }

        const thumbnails = backgrounds.map((i) => {
            return { id: i._id, thumbnail: i.thumbnail }
        })
        res.json(thumbnails)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
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
    getBackgroundThumbnails: ctrlWrapper(getBackgroundThumbnails),
    getBoardById: ctrlWrapper(getBoardById),
}
