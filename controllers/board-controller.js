const { HttpError } = require('../helpers')
const Board = require('../models/board')
const shortid = require('shortid')
const {getImages} = require('../middlewares')

const getBoardAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user

        const boards = await Board.find({ owner }).populate(
            'owner',
            '-_id email'
        )

        res.json(boards)
    } catch (err) {
        next(err)
    }
}

const addBoard = async (req, res, next) => {
    try {
        const { _id: owner } = req.user

        const board = await Board.create({ ...req.body, owner })

        res.status(201).json(board)
    } catch (err) {
        next(err)
    }
}

const updateBoardById = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { boardId } = req.params

        const updateBoard = await Board.updateOne(
            { _id: boardId, owner },
            req.body
        )

        if (updateBoard.modifiedCount == 0) {
            throw HttpError(404)
        }

        const board = await Board.findById(boardId)

        res.json(board)
    } catch (err) {
        next(err)
    }
}

const deleteBoardById = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { boardId } = req.params

        const board = await Board.deleteOne({ _id: boardId, owner })

        if (board.deletedCount == 0) {
            throw HttpError(404)
        }

        res.json({ message: 'board deleted' })
    } catch (err) {
        next(err)
    }
}

const addColum = async (req, res, next) => {
    try {
        const { title, boardId } = req.body
        const { _id: owner } = req.user

        const newColum = {
            id: shortid.generate(),
            title,
        }

        const board = await Board.updateOne(
            { _id: boardId, owner },
            { $push: { colums: newColum } }
        )

        if (board.modifiedCount == 0) {
            throw HttpError(404)
        }

        res.status(201).json(newColum)
    } catch (err) {
        next(err)
    }
}

const getColum = async (req, res, next) => {
    try {
        const { boardId } = req.body
        const { _id: owner } = req.user

        const board = await Board.findOne({ _id: boardId, owner })

        if (!board) {
            throw HttpError(404, 'Board not found')
        }

        const { colums } = board

        res.json(colums)
    } catch (err) {
        next(err)
    }
}

const updateColum = async (req, res, next) => {
    try {
        const { columId } = req.params
        const { title, boardId } = req.body
        const { _id: owner } = req.user

        const board = await Board.findOne({ _id: boardId, owner })

        if (!board) {
            throw HttpError(404, 'Board not found')
        }

        const { colums } = board

        const index = colums.findIndex((colum) => colum.id == columId)

        if (index == -1) {
            throw HttpError(400, `${columId} is not valid id`)
        }

        const updateBoard = await Board.updateOne(
            { _id: boardId, owner },
            { $set: { [`colums.${index}.title`]: title } }
        )

        if (updateBoard.modifiedCount == 0) {
            throw HttpError(404)
        }

        const boardGetColum = await Board.findOne({ _id: boardId, owner })

        res.json(boardGetColum.colums[index])
    } catch (err) {
        next(err)
    }
}

const deleteColumById = async (req, res, next) => {
    try {
        const { _id: owner } = req.user
        const { columId } = req.params
        const { boardId } = req.body

        const board = await Board.findOne({ _id: boardId, owner })

        if (!board) {
            throw HttpError(404, 'Board not found')
        }

        const { colums } = board

        const index = colums.findIndex((colum) => colum.id == columId)

        if (index == -1) {
            throw HttpError(
                400,
                `${columId} is not valid id or this colum not created`
            )
        }

        const updateBoard = await Board.updateOne(
            { _id: boardId, owner },
            { $pull: { colums: { id: columId } } }
        )

        if (updateBoard.modifiedCount == 0) {
            throw HttpError(404)
        }

        res.json({ message: 'Colum daleted' })
    } catch (err) {
        next(err)
    }
}

const getBackground = async (req, res) => {
  const screenSize = req.screenSize; 
  let folder;
  if (screenSize === 'mobile') {
    folder = 'background/mobile';
  } else if (screenSize === 'tablet') {
    folder = 'background/tablet';
  } else {
    folder = 'background/desktop';
  }
  try {
    const images = await getImages(folder);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

module.exports = {
    getBoardAll,
    addBoard,
    addColum,
    getColum,
    updateColum,
    deleteBoardById,
    updateBoardById,
    deleteColumById,
    getBackground,
}
