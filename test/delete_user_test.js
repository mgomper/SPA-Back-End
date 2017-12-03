const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  beforeEach((done) => {
    joe = new User({
      username: 'Joe',
      password: 'password',
      description: 'Regular old Joe.',
      date_of_birth: new Date(1999, 18, 09)
    });

    joe2 = new User({
      username: 'Joe',
      password: 'password',
      description: 'Old pal Joe.',
      date_of_birth: new Date(1997, 09, 07)
    });

    joe.save();
    joe2.save()
    .then(() => done());
  });

  it('Deletes all users with a certain criteria', (done) => {
    User.remove({ username: 'Joe'})
      .then(() => User.findOne({username: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('Deletes a specific user by id', (done) => {
    User.findByIdAndRemove(joe2._id);
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
