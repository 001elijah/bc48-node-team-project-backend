const Joi = require('joi')

const cardAddSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.string().required(),
    boardId: Joi.string().required(),
    columId: Joi.string().required(),
})

const cardGetAllSchema = Joi.object({
    boardId: Joi.string().required(),
    columId: Joi.string().required(),
})

module.exports = {
    cardAddSchema,
    cardGetAllSchema,
}
