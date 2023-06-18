const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: '../'
})
const { UserModel } = require('../models/user.model');

const SignAccessToken = ({ email }) => {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '30d' });
    return token;
}

const GetTokenFromCookies = (req) => {
    const token = req.cookies.authorization;
    return token;
}

async function VerifyAccessToken(req, res, next) {
    try {
        const token = await GetTokenFromCookies(req)
        if (req.url == "/" && !token) {
            return res.render('index', { isLoggedIn: false })
        }
        else if (req.url == "/register" && !token) {
            return res.render('register');
        }
        else {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
                try {
                    if (err) {
                        return res.render('login');
                    }
    
                    const { email } = payload;
    
                    const user = await UserModel.findOne({ email }, {
                        password: 0
                    });
                    if (!user) return res.render('register');
    
                    req.user = user;
                    req.isLoggedIn = true;
                    return next()
                } catch (error) {
                    next(error);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    SignAccessToken,
    VerifyAccessToken,
    GetTokenFromCookies
}