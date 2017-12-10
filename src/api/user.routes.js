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

routes.get('/users/:id', function(req, res) {
    res.contentType('application/json');
    const userId = req.params.id;
    User.findById({_id: userId})
        .then((user) => {
        res.status(200).json(user);
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

routes.put('/users/:id', function(req, res) {
    res.contentType('application/json');
    const userId = req.params.id;
    const userProps = req.body;

    User.findByIdAndUpdate({_id: userId}, userProps)
        .then(()=> User.findById({_id: userId}))
        .then((user) => {
        res.status(200).send(user)
})
    .catch((error) => res.status(400).json(error))

});

routes.delete('/users/:id', function(req, res) {
    const userId = req.param('id');
    User.findByIdAndRemove(userId)
        .then((user) => res.status(200).json({
        'status': 'User is deleted.',
        'user': user
    }))
    .catch((error) => res.status(400).json(error))
});

module.exports = routes;
