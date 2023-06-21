const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
require('dotenv').config()

const authRouter = require('./routes/auth-routes')
const boardRouter = require('./routes/board-routes')
const cardRouter = require('./routes/card-routers')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/user', authRouter)
app.use('/board', boardRouter)
app.use('/card', cardRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Server Error' } = err
    res.status(status).json({ message })
})

module.exports = app
