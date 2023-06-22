const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')
const Joi = require('joi')

const boardSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        icon: {
            type: String,
            enum: ['icon-project', 'icon-star', 'icon-loading', 'icon-puzzle-piece', 'icon-container', 'icon-lightning', 'icon-colors', 'icon-hexagon'],
            default: 'icon-project',
        },
        background: {
            type: String,
            default: null,
        },
        columns: {
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

const boardAddSchema = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required(),
})

const boardUpdateSchema = Joi.object({
    title: Joi.string(),
    icon: Joi.string(),
})

const columnAddAndUpdateSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required(),
})

const columnGetAllAndDeleteSchema = Joi.object({
    boardId: Joi.string().required(),
})

const schemas = {
    boardAddSchema,
    columnAddAndUpdateSchema,
    columnGetAllAndDeleteSchema,
    boardUpdateSchema,
}

const Board = model('board', boardSchema)

module.exports = {
    Board,
    schemas,
}

