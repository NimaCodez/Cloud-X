const express = require('express');
const app = express();
const path = require('path');
const { AppRouter } = require('./routes/index.routes');
const { ConnectToMongoDB } = require('./connections/mongo.connection');

// app settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

ConnectToMongoDB();

app.use(AppRouter)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () => console.log('Running on 3000 | http://localhost:3000'));