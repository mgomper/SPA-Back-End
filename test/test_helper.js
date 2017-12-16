const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(()=>{
mongoose.connect('mongodb://localhost/app_test');
// app_test wordt automatisch aangemaakt bij aanroep
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
  });

beforeEach((done) => {
  const { users, blogposts} = mongoose.connection.collections;
  users.drop(() => {
      blogposts.drop(() => {
          done();
      });
  });
});
