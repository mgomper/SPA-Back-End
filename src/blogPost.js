const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  // title: {
  //   type: String,
  //   validate: {
  //     validator: (title) => title.length > 2,
  //     message: 'Title must contain at least 3 characters.'
  //   },
  //   required: [true, 'Title must be filled in.']
  // },

  content: {
    type: String,
    validate: {
      validator: (content) => content.length > 5,
      message: 'Content must contain at least 6 characters.'
    },
    required: [true, 'Content must be filled in.']
  },
  // user: User,
  rating: Number,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  board: {type: Schema.Types.ObjectId, ref: 'board'},
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
  // board: Board
});

// UserSchema.virtual('postCount').get(function(){
//   return this.posts.length;
// });

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
