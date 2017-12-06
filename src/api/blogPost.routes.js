var express = require('express');
var routes = express.Router();
var BlogPost = require('../model/blogPost');

routes.get('/blogPosts', function(req, res){
  res.contentType('application/json');
  BlogPost.find({})
    .then((blogPost) => {
      res.status(200).json(blogPost);
    })
    .catch((error) => res.status(400).json(error));
});

routes.get('/blogPosts/:id', function(req, res) {
    res.contentType('application/json');
    const blogPostId = req.param('id');
    BlogPost.find({_id: blogPostId})
        .then((blogPost) => {
        res.status(200).json(blogPost);
})
    .catch((error) => res.status(400).json(error));
});

routes.post('/blogPosts', function(req, res) {
    const blogPostProps = req.body;

    BlogPost.create(blogPostProps)
        .then((blogPost) => {
        res.status(200).send(blogPost)
})
    .catch((error) => res.status(400).json(error))
});

routes.put('/blogPosts/:id', function(req, res) {
    res.contentType('application/json');
    const blogPostId = req.params.id;
    const blogPostProps = req.body;

    BlogPost.findByIdAndUpdate({_id: blogPostId}, blogPostProps)
        .then(()=> BlogPost.findById({_id: blogPostId}))
        .then((blogPost) => {
        res.status(200).send(blogPost)
})
    .catch((error) => res.status(400).json(error))

});

routes.delete('/blogPosts/:id', function(req, res) {
    const blogPostId = req.param('id');
    BlogPost.findByIdAndRemove(blogPostId)
        .then((blogPost) => res.status(200).json({
        'status': 'BlogPost is deleted.',
        'blogPost': blogPost
    }))
    .catch((error) => res.status(400).json(error))
});

module.exports = routes;
