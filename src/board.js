const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    validate: {
      validator: (title) => title.length > 2,
      message: 'Title must contain at least 3 characters.'
    },
    required: [true, 'Content must be filled in.']
  },
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]

});

// UserSchema.virtual('postCount').get(function(){
//   return this.posts.length;
// });

const Board = mongoose.model('board', BoardSchema);

module.exports = Board;
