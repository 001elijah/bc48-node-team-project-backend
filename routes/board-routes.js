const express = require('express')
const router = express.Router()

const { authenticate, isValidId } = require('../middlewares')
const boardController = require('../controllers/board-controller')
const { validateBodyBoard } = require('../utils')
const schema = require('../schema/boardSchema')

router.use(authenticate)

router.get('/', boardController.getBoardAll)

router.post(
    '/',
    validateBodyBoard(schema.boardAddAndUpdateSchema),
    boardController.addBoard
)

router.put(
    '/:boardId',
    validateBodyBoard(schema.boardAddAndUpdateSchema),
    isValidId,
    boardController.updateBoardById
)

router.delete('/:boardId', isValidId, boardController.deleteBoardById)

router.post(
    '/colum',
    validateBodyBoard(schema.columAddAndUpdateSchema),
    boardController.addColum
)

router.get(
    '/colum',
    validateBodyBoard(schema.columGetAllAndDeleteSchema),
    boardController.getColum
)

router.put(
    '/colum/:columId',
    validateBodyBoard(schema.columAddAndUpdateSchema),
    boardController.updateColum
)

router.delete(
    '/colum/:columId',
    validateBodyBoard(schema.columGetAllAndDeleteSchema),
    boardController.deleteColumById
)

module.exports = router
