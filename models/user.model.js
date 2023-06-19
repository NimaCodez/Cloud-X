const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, required: true },
    token: { type: String },
    browser: { type: String },
    IPAddress: { type: String },
    lastTimeLoggedIn: { type: Number },
    apps: { type: [Types.ObjectId] },
    domains: { type: [Types.ObjectId] },
    databases: { type: [Types.ObjectId ] },
    buckets: { type: [Types.ObjectId ] }
})

const UserModel = model('users', userSchema);

module.exports = {
    UserModel
}