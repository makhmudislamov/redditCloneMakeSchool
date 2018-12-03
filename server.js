const express = require('express')
const app = express()
const posts = require('./controllers/posts');
const auth = require('./controllers/auth');
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Set db
const database = require('./data/reddit-db');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditclone', { useNewUrlParser: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// should go after body parser
app.use(expressValidator());


const port = process.env.PORT || 3000;
app.listen(port);
console.log("app is up");

// controllers
posts(app);
auth(app);

module.exports = app;