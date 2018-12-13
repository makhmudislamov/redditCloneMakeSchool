const mongoose = require('mongoose');
const Autopopulate = require('../utilities/autopopulate');
const Schema = mongoose.Schema;
const CommentSchema = new Schema ({
   
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // postId is giving error
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}).pre('findOne', Autopopulate('comments'))
    .pre('find', Autopopulate('comments'))
module.exports = mongoose.model("Comment", CommentSchema);