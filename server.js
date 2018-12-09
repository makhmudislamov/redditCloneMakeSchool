const dotenv = require('dotenv').config(); // TODO: try without config()
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const posts = require('./controllers/posts');
const auth = require('./controllers/auth');
const comments = require('./controllers/comments');
const subreddits = require('./controllers/subreddits');

var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Set db
const database = require('./data/reddit-db');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditclone', { useNewUrlParser: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(methodOverride('_method'))
const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        const token = req.cookies.nToken;
        const decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};
app.use(checkAuth);

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
comments(app);
subreddits(app);

module.exports = app;