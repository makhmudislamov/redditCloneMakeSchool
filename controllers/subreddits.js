const Post = require('../models/post.js');

module.exports = function (app) {
    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        Post.find({ subreddit: req.params.subreddit })
            .then(posts => {
                res.render("posts-index.handlebars", { posts });
            })
            .catch(err => {
                console.log(err);
            });
    });
}