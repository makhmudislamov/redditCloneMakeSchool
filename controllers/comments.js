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
            comment
            .save()
            .then((comment) => {
                console.log(req.body)
                return Post.findById(req.params.postId)
                
            }).then(post => {
                console.log('crashing here')
                console.log(post)

                post.comments.unshift(comment);
                console.log('here')
                return post.save();
                // return Post.findById(req.params.postId);
            }).then(comment => {
                // post.comments.unshift(comment)
                // return post.save()
                return User.findById(req.user._id);
            })
            .then(user => {
                // console.log(comment);
                // // TODO: redirect to current post
                // res.redirect('/');
                console.log(user)
                user.comments.unshift(comment);
                user.save();
                res.redirect('/');
            })
            .then(post => {
                res.redirect('/');
            })
            .catch(err => {
                console.log("oops")
                console.log(err.message);
            })
        } else {
            return res.status(401).send({message: "login first"});
        }
    })

};