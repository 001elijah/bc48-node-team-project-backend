const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const cardSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            enum: ['without', 'low', 'medium', 'high'],
            default: 'without',
        },
        deadline: {
            type: String,
            require: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        boardId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        columId: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

cardSchema.post('save', handleMongooseError)

const Card = model('card', cardSchema)

module.exports = Card
