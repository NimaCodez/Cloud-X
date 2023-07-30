const express = require('express');
const app = express();
const path = require('path');
const { AppRouter } = require('./routes/index.routes');
const { ConnectToMongoDB } = require('./connections/mongo.connection');
const cookieParser = require('cookie-parser');

// app settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(AppRouter)

ConnectToMongoDB();

app.listen(3000, () => console.log('Running on 3000 | http://localhost:3000'));