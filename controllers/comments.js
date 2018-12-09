const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = function (app) {
    // CREATE Comment
    app.post('/posts/:postId/comments', function (req, res) {
        //creating instance of model
        if (req.user) {
            const comment = new Comment(req.body)
            comment.author = req.user._id;
            //save instance of comment model to DB
            comment.save().then((comment) => {
                return User.findById(req.user._id)
            }).then(user => {
                user.comments.unshift(comment);
                user.save();
                return Post.findById(req.params.postId);
            }).then(post => {
                post.comments.unshift(comment)
                return post.save()
            }).then((post) => {
                console.log(comment);
                res.redirect(`/posts/${req.params.postId}`);
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            return res.status(401);
        }
    })

};