var mongoose = require('mongoose');


module.exports = mongoose.model('Post', {
    title: String,
    url: String,
    summary: String
});
// let posts = [
//     { title: "Fantastic post", postBody: "hlkjhlkhlkhlkh" },
//     { title: "Awesome Movie", postBody: "ifasdfbisdufbi" }
// ]