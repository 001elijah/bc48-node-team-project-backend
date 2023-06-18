const express = require('express')
const authControllers = require('../controllers/auth-controller')
const { schemas } = require('../models/user')
const { authenticate, validate, uploadToCloudinary } = require('../middlewares')

const router = express.Router()

router.post(
    '/register',
    validate.validateUser(schemas.userRegisterSchema),
    authControllers.register
)

router.post(
    '/login',
    validate.validateUser(schemas.userLoginSchema),
    authControllers.login
)

router.get('/current', authenticate, authControllers.getCurrent)

router.post('/logout', authenticate, authControllers.logout)

router.patch(
    '/',
    authenticate,
    validate.validateTheme(schemas.updateTheme),
    authControllers.updateUserTheme
)

router.patch(
    '/updateUserInfo',
    authenticate,
    uploadToCloudinary,
    validate.validateUser(schemas.updateUser),
    authControllers.updateUser
)

module.exports = router
