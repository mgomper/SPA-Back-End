const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/app_test');
// app_test wordt automatisch aangemaakt bij aanroep
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });
