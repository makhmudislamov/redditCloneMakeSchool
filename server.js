const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

let posts = [
    { title: "Fantastic post", postBody: "hlkjhlkhlkhlkh" },
    { title: "Awesome Movie", postBody: "ifasdfbisdufbi" }
]

app.get('/', (req, res) => {
    res.render('posts-index', { posts: posts });
})

const port = process.env.PORT || 3000;
app.listen(port);
console.log("app is up");