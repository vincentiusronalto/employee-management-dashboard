const express = require('express')
const app = express()
const port = 3000

//dot env
require('dotenv').config();

//csurf-cookie-bodyparser
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(csrf({ cookie: true, httpOnly : true, secure: true}))

app.use(require('./routes/index'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})