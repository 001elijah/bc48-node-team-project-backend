const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const boardSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        icon: {
            type: String,
            require: true,
        },
        background: {
            type: String,
            default: null,
        },
        colums: {
            type: Array,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            require: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

boardSchema.post('save', handleMongooseError)

const Board = model('board', boardSchema)

module.exports = Board
