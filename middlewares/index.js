const authenticate = require('./authenticate')
const validate = require('./validateUser')
const { uploadToCloudinary, getImages } = require('./cloudinaryUpload')
const isValidId = require('./isValidId')
// const upload = require('./upload');
const { detectScreenSize } = require('./detectScreenSIze')


module.exports = {
    isValidId,
    authenticate,
    validate,
    uploadToCloudinary,
    detectScreenSize,
    getImages,
}
