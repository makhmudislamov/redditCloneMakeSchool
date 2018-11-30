const express = require('express')
const app = express()
const posts = require('./controllers/posts');
var exphbs = require('express-handlebars');
// const mongoose = require('mongoose');



// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/redditclone', { useNewUrlParser: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
    res.render('posts-index', { posts: posts });
})

// INDEX
// app.get('/', (req, res) => {
//     Charity.find()
//         .then(charity => {
//             res.render('orgs-index', { charity: charity });
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// NEW
app.get('/posts/new', (req, res) => {
    res.render('posts-new', {});
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log("app is up");

posts(app);
module.exports = app;