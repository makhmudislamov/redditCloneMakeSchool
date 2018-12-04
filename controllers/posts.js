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


    // NEW
    app.get('/posts/new', (req, res) => {
        res.render('posts-new', {});
    })


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

    // SHOW one post
    app.get("/posts/:id", function (req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments')
            .then(post => {
                res.render("post-show", { post });
            })
            .catch(err => {
                console.log(err.message);
            });
    });
    
};