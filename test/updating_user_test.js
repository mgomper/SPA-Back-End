const assert = require('assert');
const User = require('../src/model/user');

describe('Updating a user', () => {
  beforeEach((done) => {
    joe = new User({
      username: 'Joe',
      password: 'password',
      description: 'Regular old Joe.',
      date_of_birth: new Date(1999, 18, 09)
    });
    joe.save()
    .then(() => done());
  });

  it('Updates users by username', (done) => {
    User.update({username: 'Joe'}, {username: 'Dave'})
      .then(() => {
        User.findOne({username: 'Dave'})
          .then((user) => {
            assert(user.username === 'Dave');
            done();
          });
      });
  });

  it('Updates an individual user by id', (done) => {
    User.findByIdAndUpdate(joe._id, {username: 'Frank'})
      .then(() => {
        User.findOne({username: 'Frank'})
          .then((user) => {
            assert(user.username === 'Frank');
            done();
          });
      });
  });
});
