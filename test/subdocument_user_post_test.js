// const assert = require('assert');
// const User = require('../src/user');
// const PostSchema = require('../src/post');
//
// describe('Subdocumenting posts within users', () => {
//   it('can create a user with a subdocument', (done) => {
//     const user = new User({
//       username: 'Dave',
//       password: 'password',
//       posts: [{ content: 'Post with some content.', rating: 3.5 }]
//     });
//
//     user.save()
//       .then(() => User.findOne({username: 'Dave'}))
//       .then((user) => {
//         assert(user.posts[0].content === 'Post with some content.');
//         done();
//       });
//   });
//
//   it('can add a post to an existing user', (done) => {
//     const user = new User({
//       username: 'Dave',
//       password: 'password',
//       posts: []
//     });
//
//     user.save()
//       .then(() => User.findOne({username: 'Dave'}))
//       .then((user) => {
//         user.posts.push({content: 'Toegevoegde nieuwe post.', rating: 4});
//         return user.save();
//       })
//       .then(() => User.findOne({username: 'Dave'}))
//       .then((user) => {
//         assert(user.posts[0].content === 'Toegevoegde nieuwe post.');
//         done();
//       });
//   });
//
//   it('can remove a post from an existing user', (done) => {
//     const user = new User({
//       username: 'Dave',
//       password: 'password',
//       posts: [{ content: 'Post with some content.', rating: 3.5 }]
//     });
//
//     user.save()
//       .then(() => User.findOne({username: 'Dave'}))
//       .then((user) => {
//         user.posts[0].remove();
//         return user.save();
//       })
//       .then(() => User.findOne({username: 'Dave'}))
//       .then((user) => {
//         assert(user.posts.length === 0);
//         done();
//       });
//   });
// });
