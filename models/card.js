const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')
const Joi = require('joi').extend(require('@joi/date'))

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
            type: Date,
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
        columnId: {
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

const cardAddSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.date().required().format('YYYY-MM-DD HH:mm'),
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
})

const cardUpdateSchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    deadline: Joi.date().format('YYYY-MM-DD HH:mm'),
})

const cardGetAllSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
})

const cardUpdateColumnSchema = Joi.object({
    boardId: Joi.string().required(),
    columnId: Joi.string().required(),
})

const schemas = {
    cardAddSchema,
    cardGetAllSchema,
    cardUpdateSchema,
    cardUpdateColumnSchema,
}

const Card = model('card', cardSchema)

module.exports = {
    Card,
    schemas,
}
