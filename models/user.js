// const { Schema, model } = require('mongoose');
// const Joi = require('joi');
// const { handleMongooseError } = require('../helpers');

// const theme = ["Light", "Dark", "Violet"];
// const pattern = "r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'";

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: [true, 'Namr is required'],
//     },
//     password: {
//         type: String,
//         required: [true, 'Set password for user'],
//     },
//     email: {
//         type: String,
//         required: [true, 'Email is required'],
//         unique: true,
//         enum: pattern,
//     },
//     theme: {
//         type: String,
//         enum: theme,
//         default: "Light"
//     },
//     avatarUrl: {
//         type: String,
//         required: true,
//     },
//     token: String

// }, {
//     versionKey: false,
//     timestamps: true
// });

// userSchema.post("save", handleMongooseError);

// const userRegisterSchema = Joi.object({
//     name: Joi.string().min(2).max(32).required(),
//     email: Joi.string().min(8).max(64).required(),
//     password: Joi.string().required(),
// });

// const userLoginSchema = Joi.object({
//     email: Joi.string().required(),
//     password: Joi.string().required(),
// });

// const updateTheme = Joi.object({
//     theme: Joi.string().valid(...theme).required(),
// })

// const schemas = {
//     userRegisterSchema,
//     userLoginSchema,
//     updateTheme,
// };

// const User = model("user", userSchema);

// module.exports = {
//     User,
//     schemas,
// };
