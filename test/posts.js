const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require("../models/post.js");
const server = require('../server')

describe("Post", () => {
    it("should create with valid attributes at POST /posts", done => {
        
        // TODO: test code goes here!
        // var post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        // Import your Post model
        
        var post = { title: "post title", url: "https://www.google.com", summary: "post summary" };

        Post.findOneAndRemove(post, function () {
            Post.find(function (err, posts) {
                var postCount = posts.length;
                chai
                    .request(server)
                    .post("/posts/new")
                    .send(post)
                    .then(res => {
                        Post.find(function (err, posts) {
                            postCount.should.be.equal(posts.length - 1);
                            res.should.have.status(200);
                            return done();
                        });
                    })
                    .catch(err => {
                        return done(err);
                    });
            });
        });

    });
});