const express = require('express')
const router = express.Router()

const { authenticate, isValidId, detectScreenSize } = require('../middlewares')
const boardController = require('../controllers/board-controller')
const { validateBodyBoard } = require('../middlewares')
const { schemas } = require('../models/board')

router.use(authenticate)

router.get('/', boardController.getBoardAll)

router.post(
    '/',
    validateBodyBoard(schemas.boardAddSchema),
    boardController.addBoard
)

router.patch(
    '/:boardId',
    validateBodyBoard(schemas.boardUpdateSchema),
    isValidId,
    boardController.updateBoardById
)

router.delete('/:boardId', isValidId, boardController.deleteBoardById)

router.post(
    '/column',
    validateBodyBoard(schemas.columnAddAndUpdateSchema),
    boardController.addColumn
)

router.get(
    '/column',
    validateBodyBoard(schemas.columnGetAllAndDeleteSchema),
    boardController.getColumn
)

router.patch(
    '/column/:columnId',
    validateBodyBoard(schemas.columnAddAndUpdateSchema),
    boardController.updateColumn
)

router.delete(
    '/column/:columnId',
    validateBodyBoard(schemas.columnGetAllAndDeleteSchema),
    boardController.deleteColumnById
)

router.get('/backgrounds', detectScreenSize, boardController.getBackground)

module.exports = router
