const { Schema, model } = require("mongoose");

const APPSchema = new Schema({
    name: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true},
    RAM: { type: Number, required: true },
    storage: { type: String, required: true },
    domain: { type: String, unique: true },
    IPAddress: { type: String, unique: true, required: true },
    image: { type: String, unique: true, required: true },
})

const APPModel = model('apps', APPSchema);

module.exports = {
    APPSchema,
    APPModel
}
