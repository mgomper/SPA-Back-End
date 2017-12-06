const assert = require('assert');
const User = require('../src/model/user');

describe('Creating user records', () => {
  it('Saves a user', (done) => {
    const joe = new User({
      username: 'Joe',
      password: 'password',
      description: 'regular old Joe',
      date_of_birth: new Date(1999, 09, 18)
    });

    joe.save()
    .then(() => {
      assert(!joe.isNew);
      done();
    });
  });
});
