const assert = require('assert');
const User = require('../src/user');

describe('Reading user records', () => {
  let joe;
  let dave;

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

  it('Reads all users', (done) => {
    User.find({ username: 'Joe' })
      .then((users) => {
        assert(users[1]._id.toString === joe2._id.toString && users[0]._id.toString === joe._id.toString);
        done();
      });
  });

  it('Reads an individual user', (done) => {
    User.findOne({_id: joe._id})
      .then((user) => {
        assert(user.username === 'Joe');
        done();
      });
  });
});
