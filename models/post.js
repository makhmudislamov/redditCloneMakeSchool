const mongoose = require('mongoose');


// TODO: check stretch challenge for this schema - date attribute
module.exports = mongoose.model("Post", {

    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true }
    
});

