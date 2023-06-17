const { HttpError } = require('../helpers');

const validateUser = (schema) => {
    const func = (req, res, next) => {
       
        if (Object.keys(req.body).length === 0 && res.locals.avatarUrl == null) {
            next(HttpError(400, `Missing required fields`));
        }

        const { error } = schema.validate(req.body);

        if (error) {
            const emailError = error.details.find((detail) => detail.path.includes('email'));
            const passwordError = error.details.find((detail) => detail.path.includes('password'));

            if (emailError) {
                next(HttpError(400, `Incorrect email format. Example: example@example.com`));
            }

            if (passwordError) {
                next(HttpError(400, 'Password must be min 8 characters and does not contain white spaces'))
            }else {
                next(HttpError(400, `Missing required ${error.details[0].context.label} field`));
            }
        } else {
            next();
        }
    };
    return func;
};

const validateTheme = schema => {
    const func = (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            next(HttpError(400, `Missing field theme`));
        }
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, "Invalid theme value"));
        } else {
            next();
        }
    };
    return func;
};

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


const validate = {
    validateUser,
    validateTheme,
    //validateFavBody,
    //validateSubscription
};

module.exports = validate;