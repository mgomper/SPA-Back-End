const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  username: {
    type: String,
    validate: {
      validator: (username) => username.length > 2,
      message: 'Name must be longer than two characters.'
    },
    required: [true, 'Username must be filled in.']
  },
  password: String,
  description: String,
  date_of_birth: Date,
  user_score: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
},
{timestamps: true});

// UserSchema.virtual('postCount').get(function(){
//   return this.posts.length;
// });

const User = mongoose.model('user', UserSchema);

module.exports = User;
