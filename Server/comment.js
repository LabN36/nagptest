var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    text: { type: String },
    time: { type: Number },
    commentId: { type: String, unique: true },
});
var CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
    Comment: CommentModel
};