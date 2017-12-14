//Boards nog niet toegepast in app

var express = require('express');
var routes = express.Router();
var Board = require('../model/board');

routes.get('/boards', function(req, res){
  res.contentType('application/json');
  Board.find({})
    .then((board) => {
      res.status(200).json(board);
    })
    .catch((error) => res.status(400).json(error));
});

routes.get('/boards/:id', function(req, res) {
    res.contentType('application/json');
    const boardId = req.param('id');
    Board.find({_id: boardId})
        .then((board) => {
        res.status(200).json(board);
})
    .catch((error) => res.status(400).json(error));
});

routes.post('/boards', function(req, res) {
    const boardProps = req.body;

    Board.create(boardProps)
        .then((board) => {
        res.status(200).send(board)
})
    .catch((error) => res.status(400).json(error))
});

routes.put('/boards/:id', function(req, res) {
    res.contentType('application/json');
    const boardId = req.params.id;
    const boardProps = req.body;

    Board.findByIdAndUpdate({_id: boardId}, boardProps)
        .then(()=> Board.findById({_id: boardId}))
        .then((board) => {
        res.status(200).send(board)
})
    .catch((error) => res.status(400).json(error))

});

routes.delete('/boards/:id', function(req, res) {
    const boardId = req.param('id');
    Board.findByIdAndRemove(boardId)
        .then((board) => res.status(200).json({
        'status': 'Board is deleted.',
        'board': board
    }))
    .catch((error) => res.status(400).json(error))
});

module.exports = routes;
