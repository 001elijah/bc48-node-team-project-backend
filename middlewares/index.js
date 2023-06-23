const authenticate = require('./authenticate')
const validate = require('./validateUser')
const { uploadToCloudinary, initializBackgrounds} = require('./cloudinaryUpload')
const isValidId = require('./isValidId')
const validateBodyBoard = require('./validateBodyBoard')
// const upload = require('./upload');

module.exports = {
    isValidId,
    authenticate,
    validate,
    uploadToCloudinary,
    validateBodyBoard,
    initializBackgrounds,
}
