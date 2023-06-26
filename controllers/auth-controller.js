const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models/user')
const sgMail = require('@sendgrid/mail')
const { HttpError, ctrlWrapper } = require('../helpers')
const { SECRET_KEY, SENDGRID_API_KEY, SENDGRID_FROM, SENDGRID_TO } = process.env

require('dotenv').config()
sgMail.setApiKey(SENDGRID_API_KEY)

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        throw HttpError(409, 'Email in use')
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({ ...req.body, password: hashPassword })

    const payload = {
        id: result._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7h' })
    await User.findByIdAndUpdate(result._id, { token })

    res.status(201).json({
        token,
        user: {
            userName: result.userName,
            email: result.email,
            theme: result.theme,
            avatarUrl: result.avatarUrl,
        },
    })
}

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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7h' })
    await User.findByIdAndUpdate(user._id, { token })

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

const getCurrent = async (req, res) => {
    const { userName, email, theme, avatarUrl } = req.user

    res.json({
        userName,
        email,
        theme,
        avatarUrl,
    })
}

const logout = async (req, res) => {
    const { _id: id } = req.user
    await User.findByIdAndUpdate(id, { token: '' })

    res.status(204).json()
}

const updateUserTheme = async (req, res, next) => {
    const { _id: id } = req.user

    const update = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
    )

    if (update.modifiedCount === 0) {
        return next(HttpError(404))
    }

    const user = await User.findById(id)
    res.json({
        user: {
            email: user.email,
            theme: user.theme,
        },
    })
}

const updateUser = async (req, res, next) => {
    const { _id: id } = req.user
    const { password, email } = req.body
    let user = await User.findOne({ email })

    if (user) {
        if (email === user.email) {
            if (id != user.id) {
                throw HttpError(409, 'Email in use')
            }
        }
    }
    let cloudinaryUrl = res.locals.avatarUrl ?? user.avatarUrl

    user = await User.findById(id)

    let hashPassword = user.password
    if (password) {
        hashPassword = await bcrypt.hash(password, 10)
    }

    const update = await User.findByIdAndUpdate(
        id,
        { ...req.body, password: hashPassword, avatarUrl: cloudinaryUrl },
        { new: true }
    )

    if (update === null) {
        next(HttpError(404, 'Failed to update user'))
    }

    user = await User.findById(id)

    res.json({
        user: {
            userName: user.userName,
            email: user.email,
            theme: user.theme,
            avatarUrl: user.avatarUrl,
        },
    })
}

const sendEmail = async (req, res) => {
    const { email, comment } = req.body
    const message = {
        to: SENDGRID_TO,
        from: SENDGRID_FROM,
        subject: 'Need Help',
        text: `Email: ${email}\nComment: ${comment}`,
    }

    await sgMail.send(message)

    res.status(200).json({
        message: 'Email sent',
    })
}

const authWithGoogle = async (req, res) => {
    const { credential, googleClientId } = req.body
    const { idToken } = credential

    // Verify the Google ID token
    const client = new OAuth2Client(googleClientId)
    let payload
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: googleClientId,
        })
        payload = ticket.getPayload()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid Google ID token' })
    }

    const { email } = payload
    const user = await User.findOne({ email })

    if (!user) {
        // Create a new user with Google authentication
        const newUser = {
            email,
            password: shortid(),
            userName: payload.given_name,
            avatarUrl: payload.picture,
        }

        const createdUser = await User.create(newUser)
        const createdUserId = createdUser._id
        const token = jwt.sign({ id: createdUserId }, SECRET_KEY, {
            expiresIn: '7h',
        })
        await User.findByIdAndUpdate(createdUserId, { token })

        res.status(201).json({
            token,
            user: {
                userName: createdUser.userName,
                email: createdUser.email,
                theme: createdUser.theme,
                avatarUrl: createdUser.avatarUrl,
            },
        })
    }

    if (user) {
        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7h' })
        await User.findByIdAndUpdate(user._id, { token })

        res.status(201).json({
            token,
            user: {
                userName: user.userName,
                email: user.email,
                theme: user.theme,
                avatarUrl: user.avatarUrl,
            },
        })
    }
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateUserTheme: ctrlWrapper(updateUserTheme),
    updateUser: ctrlWrapper(updateUser),
    sendEmail: ctrlWrapper(sendEmail),
    authWithGoogle: ctrlWrapper(authWithGoogle),
}
