const { UserModel } = require("../models/user.model");
const { SendResponse } = require("../utils/SendResponse");
const { StatusCodes } = require('http-status-codes');
const { comparePassword, hashPassword } = require("../utils/ecnryption.service");
const { SignAccessToken } = require("../utils/AccessToken.service");

async function Login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) res.render('register');

        else if (user && !comparePassword(password, user.password))
            throw SendResponse(res, StatusCodes.BAD_REQUEST, false, 'Email or password is incorrect');

        const token = SignAccessToken(user);
        user.token = token;
        await user.save();
        res.cookie('authorization', token);

        return res.render('dash');
    } catch (error) {
        next(error)
    }
}

function checkIfFieldsAreNull(...fields) {
    let nulls = 0;
    const nullishData = ['', ' ', 0, -1, null, undefined]
    fields.map(item => {
        if (nullishData.includes(item)) nulls++;
    })
    return nulls;
}

async function CheckUsernameAndEmailExistence(res, username, email) {
    const user = await UserModel.findOne({ $or: [
        { username },
        { email }
    ]})

    if (!user) return;

    let duplicateField;
    
    if (user.username == username && user.email != email) {
        duplicateField = 'Username'
        throw SendResponse(res, StatusCodes.BAD_REQUEST, false, `${duplicateField} already exists`)
    }

    else if (user.email == email && user.username != username) {
        duplicateField = 'email'
        throw SendResponse(res, StatusCodes.BAD_REQUEST, false, `${duplicateField} already exists`)
    }
    
    else if (user.username == username && user.email == email) {
        duplicateField = 'Username and Email'
        throw SendResponse(res, StatusCodes.BAD_REQUEST, false, `${duplicateField} already exists`)
    } 
}

async function Register(req, res, next) {
    try {
        const { email, password, username, fileUploadPath, fileName } = req.body;
        const nulls = checkIfFieldsAreNull(email, password, username, fileUploadPath, fileName);

        if (nulls !== 0) {
            throw SendResponse(res, StatusCodes.BAD_REQUEST, false, 'Please fill all the fields!');
        }
        
        await CheckUsernameAndEmailExistence(res, username, email);

        const profileLink = `${req.protocol}://${req.get('host')}/uploads/profiles/${fileName}`;

        const user = await UserModel.create({
            username,
            email,
            password: hashPassword(password),
            profilePicture: profileLink,
        })

        if (user) res.render('login');
    } catch (error) {
        next(error)
    }
}

module.exports = {
    Login,
    Register
}
