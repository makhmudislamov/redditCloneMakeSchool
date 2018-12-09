const Post = require('../models/post.js');

module.exports = function (app)  {

    // INDEX
    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find()
            .then(post => {
                console.log('you are current user')
                res.render('posts-index', { post: post, currentUser: currentUser });
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
    app.post("/posts", (req, res) => {
        if (req.user) {
            const post = new Post(req.body);

            post.save(function (err, post) {
                return res.redirect(`/`);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
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