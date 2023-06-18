const { body } = require("express-validator")

const LoginValidator = () => {
    return [
        body('email').isEmail().withMessage('Please enter a valid email address').notEmpty().withMessage('Please enter an email address'),

        body('password').isLength({ min: 6, max: 25 }).withMessage('Password Must be 6-25 Characters').notEmpty().withMessage('Please enter a password'),
    ]
}

module.exports = {
    LoginValidator
}
