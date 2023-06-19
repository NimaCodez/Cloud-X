const { body } = require("express-validator")
const { UserModel } = require("../models/user.model")

const RegisterValidator = () => {
    return [
        body('email').isEmail().withMessage('Please provide a valid email address').notEmpty().withMessage('Please enter an email address'),

        body('password').isLength({ min: 6, max: 25 }).withMessage('Password Must be 6-25 Characters').notEmpty().withMessage('Please enter a password'),

        body('username').notEmpty().withMessage('Please Provide a username'),
    ]
}

module.exports = {
    RegisterValidator
}
