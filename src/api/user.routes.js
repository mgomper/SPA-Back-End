var express = require('express');
var routes = express.Router();
var User = require('../model/user');

routes.get('/users', function(req, res){
  res.contentType('application/json');
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(400).json(error));
});

routes.post('/users', function(req, res) {
    const userProps = req.body;

    User.create(userProps)
        .then((user) => {
        res.status(200).send(user)
})
    .catch((error) => res.status(400).json(error))
});

module.exports = routes;
