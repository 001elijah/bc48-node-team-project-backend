const express = require('express')
const authControllers = require('../controllers/auth-controller')
const { authenticate, upload } = require('../middlewares')
const { schemas } = require('../models/user')
const { validate } = require('../utils')
const router = express.Router()

// router.post('/register', validate.validateBody(schemas.userRegisterSchema), authControllers.register);

// router.post('/login', validate.validateBody(schemas.userLoginSchema), authControllers.login);

// router.post('/logout', authenticate, authControllers.logout);

// router.get('/current', authenticate, authControllers.getCurrent);

// router.patch('/', authenticate, validate.validateSubscription(schemas.updateSubscription), authControllers.subscription);

// router.patch('/avatars', authenticate, upload.single('avatar'), authControllers.updateAvatar)

module.exports = router
