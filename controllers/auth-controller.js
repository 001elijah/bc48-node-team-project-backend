const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const gravatar = require('gravatar');
// const fs = require('fs/promises');
// const path = require('path');
// const jimp = require('jimp');
const { User, schemas } = require('../models/user');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../utils');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, 'Email in use')
    }

    //const defaultImage = gravatar.url(email);
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ ...req.body, password: hashPassword });

    const payload = {
        id: result._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7h" });
    await User.findByIdAndUpdate(result._id, { token });


    res.status(201).json({
        token,
        user: {
            userName: result.userName,
            email: result.email,
            theme: result.theme,
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        throw HttpError(401, 'Email or password is wrong')
    }

    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong')
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            userName: user.userName,
            email: user.email,
            theme: user.theme,
            avatarUrl: user.avatarUrl,
        },
    })
}

// const logout = async (req, res) => {
//     const { _id: id } = req.user;
//     await User.findByIdAndUpdate(id, { token: "" });

//     res.status(204).json()
// };

// const getCurrent = async (req, res) => {
//     const { subscription, email } = req.user;

//     res.json({
//         email,
//         subscription,
//     })
// };

// const subscription = async (req, res, next) => {
//     const { subscription } = req.body;
//     const { _id: id } = req.user;

//     try {
//         await schemas.updateSubscription.validateAsync({ subscription }); 
//     } catch (error) {
//         return next(HttpError(400, "Invalid subscription value"));
//     }

//     const update = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });

//     if (update.modifiedCount === 0) {
//         return next(HttpError(404));
//     }

//     const user = await User.findById(id);
//     res.json({
//         user: {
//             email: user.email,
//             subscription: user.subscription,
//         }
//     });
// };

// const updateAvatar = async (req, res) => {
//     const { path: tempPath, originalname } = req.file;
//     const resultDir = path.join(avatarsDir, originalname);
//     const { _id } = req.user;

//     const avatar = await jimp.read(tempPath);
//     await avatar.resize(250, 250).write(resultDir);

    fs.rename(tempPath, resultDir);
    const avatarUrl = path.join('avatars', originalname);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
        avatarUrl,
    })
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};