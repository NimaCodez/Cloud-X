const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { isLoggedIn: false });
})

app.listen(3000, () => console.log('Running on 3000 | http://localhost:3000'));