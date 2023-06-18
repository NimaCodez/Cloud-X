const { UserModel } = require("../models/user.model");
const { SendResponse } = require("../utils/SendResponse");
const { StatusCodes } = require('http-status-codes');
const { comparePassword, hashPassword } = require("../utils/ecnryption.service");
const { SignAccessToken } = require("../utils/AccessToken.service");
const path = require('path');

async function Login(req, res, next) {
    try {
        console.log('body: ', req.body)
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw SendResponse(res, StatusCodes.NOT_FOUND, false, 'Your Email Was Not Found!');

        else if (user && !comparePassword(password, user.password))
            throw SendResponse(res, StatusCodes.BAD_REQUEST, false, 'Email or password is incorrect');

        const token = SignAccessToken(user);
        user.token = token;
        await user.save();
        res.cookie('authorization', token);

        res.redirect('/dash');
    } catch (error) {
        next(error)
    }
}

function checkIfFieldsAreNull(...fields) {
    const nulls = 0;
    const nullishData = ['', ' ', 0, -1, null, undefined]
    fields.map(item => {
        if (nullishData.includes(item)) nulls++;
    })
    return nulls;
}

async function Register(req, res, next) {
    try {
        const { email, password, fileUploadPath, fileName } = req.body;
        const nulls = this.checkIfFieldsAreNull(email, password, fileUploadPath, fileName);

        if (nulls !== 0) {
            throw SendResponse(res, StatusCodes.BAD_REQUEST, false, 'Please fill all the fields!');
        }
        const profilePic = path.join(fileUploadPath, fileName).replace(/\\/gi, '/');

        const user = await UserModel.create({
            username,
            email,
            password: hashPassword(password),
            profilePicture: profilePic,
        })

        if (user) return SendResponse(res, StatusCodes.OK, true, 'You Were successfully registered! 🎉');
    } catch (error) {
        next(error)
    }
}

module.exports = {
    Login,
    Register
}
