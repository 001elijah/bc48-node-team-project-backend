const authenticate = require('./authenticate')
const validate = require('./validateUser')
const { uploadToCloudinary, getImages } = require('./cloudinaryUpload')
const isValidId = require('./isValidId')
const validateBodyBoard = require('./validateBodyBoard')
// const upload = require('./upload');
const { detectScreenSize } = require('./detectScreenSize')

module.exports = {
    isValidId,
    authenticate,
    validate,
    uploadToCloudinary,
    validateBodyBoard,
    detectScreenSize,
    getImages,
}
