const Joi = require('joi')
const { Schema, model } = require('mongoose')
const { handleMongooseError } = require('../helpers')

const theme = ['light', 'dark', 'colorful']
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        theme: {
            type: String,
            enum: theme,
            default: 'light',
        },
        avatarUrl: {
            type: String,
            default: null,
        },
        token: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

userSchema.post('save', handleMongooseError)

const userRegisterSchema = Joi.object({
    userName: Joi.string()
        .regex(/^[a-zA-Z0-9]+([-_ ][a-zA-Z0-9]+)*$/)
        .min(2)
        .max(32)
        .required(),
    email: Joi.string().min(8).max(64).pattern(emailPattern).required(),
    password: Joi.string().min(8).pattern(/^\S+$/).required(),
})

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const updateTheme = Joi.object({
    theme: Joi.string()
        .valid(...theme)
        .required(),
})

const updateUser = Joi.object({
    userName: Joi.string()
        .regex(/^[a-zA-Z0-9]+([-_ ][a-zA-Z0-9]+)*$/)
        .min(2)
        .max(32),
    email: Joi.string().min(8).max(64).pattern(emailPattern),
    password: Joi.string().min(8).pattern(/^\S+$/),
})

const userSendEmail = Joi.object({
    email: Joi.string().min(8).max(64).pattern(emailPattern).required(),
    comment: Joi.string().min(2).required(),
})

const schemas = {
    userRegisterSchema,
    userLoginSchema,
    updateTheme,
    updateUser,
    userSendEmail,
}

const User = model('user', userSchema)

module.exports = {
    User,
    schemas,
}
