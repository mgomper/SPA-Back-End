const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    validate: {
      validator: (content) => content.length > 5,
      message: 'Content must contain at least 6 characters.'
    },
    required: [true, 'Content must be filled in.']
  },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  rating: Number

  // board: Board
});

// UserSchema.virtual('postCount').get(function(){
//   return this.posts.length;
// });

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
