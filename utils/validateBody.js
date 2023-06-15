// const { HttpError } = require('../helpers');

// const validateBody = schema => {
//     const func = (req, res, next) => {
//         if (Object.keys(req.body).length === 0) {
//             next(HttpError(400, `Missing fields`));
//         }
//         const { error } = schema.validate(req.body)
//         if (error) {
//             next(HttpError(400, `Missing required ${error.details[0].context.label} field`));
//         } else {
//             next();
//         }
//     };
//     return func;
// };

// const validateFavBody = schema => {
//     const func = (req, res, next) => {
//         if (Object.keys(req.body).length === 0) {
//             next(HttpError(400, `Missing field favorite`));
//         } else {
//             next();
//         }
//     };
//     return func;
// };

// const validateSubscription = schema => {
//     const func = (req, res, next) => {
//         if (Object.keys(req.body).length === 0) {
//             next(HttpError(400, `Missing field subscription`));
//         } else {
//             next();
//         }
//     };
//     return func;
// };

// const validate = {
//     validateBody,
//     validateFavBody,
//     validateSubscription
// };

// module.exports = validate;