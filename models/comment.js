const mongoose = require('mongoose');

module.exports = mongoose.model("Comment", {
    content: { type: String, required: true }
});