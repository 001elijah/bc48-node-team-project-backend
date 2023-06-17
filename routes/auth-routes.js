const express = require('express');
const authControllers = require('../controllers/auth-controller');
const { authenticate, validate, uploadToCloudinary } = require('../middlewares');
const { schemas } = require('../models/user');


const router = express.Router();

router.post('/register', validate.validateUser(schemas.userRegisterSchema), authControllers.register);

router.post('/login', validate.validateUser(schemas.userLoginSchema), authControllers.login);

router.get('/current', authenticate, authControllers.getCurrent);

router.post('/logout', authenticate, authControllers.logout);

router.patch('/', authenticate, validate.validateTheme(schemas.updateTheme), authControllers.theme);

//router.patch('/updateUser', authenticate, validate.validateUser(schemas.updateUser), authControllers.updateUser)

router.patch('/updateUser', authenticate, uploadToCloudinary, validate.validateUser(schemas.updateUser), authControllers.updateUser);

module.exports = router;