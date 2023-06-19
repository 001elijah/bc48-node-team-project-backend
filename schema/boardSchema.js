const Joi = require('joi')

const boardAddAndUpdateSchema = Joi.object({
    title: Joi.string().required(),
    icon: Joi.string().required(),
})

const columAddAndUpdateSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required(),
})

const columGetAllAndDeleteSchema = Joi.object({
    boardId: Joi.string().required(),
})

module.exports = {
    boardAddAndUpdateSchema,
    columAddAndUpdateSchema,
    columGetAllAndDeleteSchema,
}
