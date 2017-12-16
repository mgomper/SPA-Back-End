const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = require('../model/comment');

const BlogPostSchema = new Schema({
  content: {
    type: String,
    validate: {
      validator: (content) => content.length > 5,
      message: 'Content must contain at least 6 characters.'
    },
    required: [true, 'Content must be filled in.']
  },
  rating: Number,
  title: String,
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  board: {type: Schema.Types.ObjectId, ref: 'board'},
  comments: [commentSchema]
},
{timestamps: true});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
