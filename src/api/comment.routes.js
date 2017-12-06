var express = require('express');
var routes = express.Router();
var Comment = require('../model/comment');
var User = require('../model/user');
var BlogPost = require('../model/blogPost');

routes.get('/comments', function(req, res){
  res.contentType('application/json');
  Comment.find({})
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => res.status(400).json(error));
});

routes.get('/comments/:id', function(req, res) {
    res.contentType('application/json');
    const commentId = req.param('id');
    Comment.find({_id: commentId})
        .then((comment) => {
        res.status(200).json(comment);
})
    .catch((error) => res.status(400).json(error));
});

routes.post('/comments', function(req, res) {
    const commentProps = req.body;

    Comment.create(commentProps)
        .then((comment) => {
        res.status(200).send(comment)
})
    .catch((error) => res.status(400).json(error))
});

routes.put('/comments/:id', function(req, res) {
    res.contentType('application/json');
    const commentId = req.params.id;
    const commentProps = req.body;

    Comment.findByIdAndUpdate({_id: commentId}, commentProps)
        .then(()=> Comment.findById({_id: commentId}))
        .then((comment) => {
        res.status(200).send(comment)
})
    .catch((error) => res.status(400).json(error))

});

routes.delete('/comments/:id', function(req, res) {
    const commentId = req.param('id');
    Comment.findByIdAndRemove(commentId)
        .then((comment) => res.status(200).json({
        'status': 'Comment is deleted.',
        'comment': comment
    }))
    .catch((error) => res.status(400).json(error))
});

// non standaard CRUD operaties

routes.post('/comments/push/:id', function(req, res) {
    const blogPostId = req.param('id');
    const commentProps = req.body;

    BlogPost.findById(blogPostId)
      .then((blogPost) => {
        blogPost.comments.push(commentProps);
        return blogPost.save();
      })
        .then((blogPost) => res.status(200).json({
        'status': 'Comment is deleted.',
        'comment': blogPost
    }))
    .catch((error) => res.status(400).json(error))
});

module.exports = routes;
