const Post = require('../models/post.js');

module.exports = function (app)  {

    // INDEX
    app.get('/', (req, res) => {
        Post.find()
            .then(post => {
                res.render('posts-index', { post: post });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // CREATE
    app.post('/posts/new', (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });
};