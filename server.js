const express = require('express')
const app = express()
const port = 3000
const db = require('./config/db');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const router = require('./Router/router');
app.use('/', router);


app.get('/', (req, res) => res.render('index', { title: 'EJS Dashboard' }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))