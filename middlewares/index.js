const authenticate = require('./authenticate')
const validate = require('./validateUser')
const { uploadToCloudinary } = require('./cloudinaryUpload')
const isValidId = require('./isValidId')
// const upload = require('./upload');

module.exports = {
    isValidId,
    authenticate,
    validate,
    uploadToCloudinary,
}
