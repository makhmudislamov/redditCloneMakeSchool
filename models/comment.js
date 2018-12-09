const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema ({
    // content: { type: String, required: true },
    // author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    // // postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
module.exports = mongoose.model("Comment", CommentSchema);