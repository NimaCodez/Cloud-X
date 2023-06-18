const { Schema } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profilePicture: { type: String, required: true },
    bio: { type: String, required: true },
})