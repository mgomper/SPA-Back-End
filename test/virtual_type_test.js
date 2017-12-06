// const assert = require('assert');
// const User = require('../src/user');
// const PostSchema = require('../src/post');
//
// describe('virtual types', () => {
//   it('postcount returns number of posts', (done) => {
//     const user = new User({
//       username: 'Joost',
//       posts: [{content: 'Joost post content.', rating: 4}]
//     });
//
//     user.save()
//     .then(() => User.findOne({username: 'Joost'}))
//     .then((user) => {
//       assert(user.postCount === 1);
//       done();
//     });
//   });
// });
