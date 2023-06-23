const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const backgroundSchema = new Schema(
    {
        mobileUrl_1x: {
            type: String,
        },
        mobileUrl_2x: {
            type: String,
        },
        tabletUrl_1x: {
            type: String,
        },
        tabletUrl_2x: {
            type: String,
        },
        desktopUrl_1x: {
            type: String,
        },
        desktopUrl_2x: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

backgroundSchema.post('save', handleMongooseError)

const Background = model('background', backgroundSchema)

module.exports = { Background }