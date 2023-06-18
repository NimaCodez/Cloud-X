const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, required: true },
    token: { type: String }
})

const UserModel = model('users', userSchema);

module.exports = {
    UserModel
}