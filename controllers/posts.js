const Post = require('../models/post.js')

module.exports = function (app)  {

    // CREATE
    app.post("/posts/new", (req, res) => {
        console.log(req.body);
    });
};