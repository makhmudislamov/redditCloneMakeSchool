const Post = require('../models/post.js');
const User = require('../models/user.js'); 
module.exports = function (app)  {
    // INDEX
    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find()
            .then(post => {
                console.log(`currenUser: ${currentUser}`)
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
    app.post('/posts/new', (req, res) => {
        if (req.user){
            const post = new Post(req.body);
            post.author = req.user._id;
            post.save().then(post => {
                    return User.findById(req.user._id);
                }).then(user => {
                    user.posts.unshift(post);      
                    user.save();
                    // TODO: REDIRECT TO THE NEW POST
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
    // SHOW one post
    app.get('/posts/:id', function (req, res) {
        const currentUser = req.user;
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('author').populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        })
            .then(post => {
                res.render('post-show', { post, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    }); 
    // DELETE
    app.delete('/posts/:id', function (req, res) {
        Post.findByIdAndRemove(req.params.id).then((post) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    }) 
};