const express = require('express')
const router = express.Router()

const { authenticate, isValidId } = require('../middlewares')
const boardController = require('../controllers/board-controller')
const { validateBodyBoard } = require('../middlewares')
const { schemas } = require('../models/board')

router.use(authenticate)

router.get('/thumbnails', boardController.getBackgroundThumbnails)

router.get('/', boardController.getBoardAll)

router.get('/:boardId', isValidId, boardController.getBoardById)

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

module.exports = router
