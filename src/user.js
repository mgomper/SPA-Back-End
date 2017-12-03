const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  Description: String,
  Date_of_birth: Date
  // posts: [Post]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
