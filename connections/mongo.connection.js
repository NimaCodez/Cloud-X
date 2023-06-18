const { default: mongoose } = require("mongoose")
require('dotenv').config();

const ConnectToMongoDB = () => {
    mongoose.connect(process.env.DB_URL);

    mongoose.connection.on('error', (err) => console.log('Error occurred while connecting to MongoDB: ' + err.message))
    mongoose.connection.on('close', () => console.log('Connection closed successfully with mongodb'));

    mongoose.connection.on('connected' , () => console.log('Connection established successfully 🎉✅'))
    mongoose.connection.on('disconnected' , () => console.log('Connection disconnected to MongoDB ❌'))
}

module.exports = {
    ConnectToMongoDB
}