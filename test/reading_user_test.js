const assert = require('assert');
const User = require('../src/model/user');

describe('Reading user records', () => {
  let joe, joe2, alex, patrick;

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

  kim = new User({
    username: 'Kim',
    password: 'password',
    description: 'Old pal Joe.',
    date_of_birth: new Date(1997, 09, 07)
  });

  laurens = new User({
    username: 'Laurens',
    password: 'password',
    description: 'Old pal Joe.',
    date_of_birth: new Date(1997, 09, 07)
  });

  Promise.all([joe.save(), joe2.save(), kim.save(), laurens.save()])
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

  it('Can skip and limit results (pagination)', (done) => {
    User.find({}).sort({ username: 1 }).skip(1).limit(2)
    .then((users) => {
      assert(users.length === 2);
      assert(users[0].username === 'Joe');
      assert(users[1].username === 'Kim');
      done();

    })
  });
});
