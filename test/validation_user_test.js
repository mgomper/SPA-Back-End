const assert = require('assert');
const User = require('../src/user');


describe('Validation on user records', () => {
  it('Gives an error on an empty username.', (done) => {
    const user = new User({
      username: undefined,
      password: 'password',
      description: 'regular old Joe',
      date_of_birth: new Date(1999, 09, 18)
    });

    const validationResult = user.validateSync();
    const { message } = validationResult.errors.username;

    assert(message === 'Username must be filled in.');
    done();
  });

  it('Gives an error on a username smaller than three characters', (done) => {
    const user = new User({
      username: 'Ed',
      password: 'password',
      description: 'regular old Joe',
      date_of_birth: new Date(1999, 09, 18)
    });

    const validationResult = user.validateSync();
    const { message } = validationResult.errors.username;

    assert(message === 'Name must be longer than two characters.');
    done();
  });

  it('Disallows adding an invalid record to the database', (done) => {
    const user = new User({
      username: 'E',
      password: 'password',
      description: 'regular old Joe',
      date_of_birth: new Date(1999, 09, 18)
    });

    user.save()
    .catch((validationResult) => {
      const { message } = validationResult.errors.username;
      assert(message === 'Name must be longer than two characters.');
      done();
    });
    //promise rejected dus .then kan niet
  });
});
