const jwt = require('jsonwebtoken');
const { SendResponse } = require('./SendResponse');
require('dotenv').config({
    path: '../'
})
const { StatusCodes } = require('http-status-codes');
const { UserModel } = require('../models/user.model');

const SignAccessToken = ({ email }) =>  jwt.sign(email, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30d' });

const GetTokenFromCookies = async (req) => {
    const token = await req.cookies.authorization;
    console.log(token);
    return token;
}

async function VerifyAccessToken(req, res, next) {
    try {
        const token = await GetTokenFromCookies(req)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if (err) throw SendResponse(res, StatusCodes.UNAUTHORIZED, false, 'Login To Your Account First!');
                const { email } = payload;

                const user = await UserModel.findOne({ email }, {
                    password: 0
                });
                if (!user) throw SendResponse(res, StatusCodes.NOT_FOUND, false, 'Your Account Was Not Found');

                req.user = user;
                next();
            } catch (error) {
                next(error);
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    SignAccessToken,
    VerifyAccessToken
}