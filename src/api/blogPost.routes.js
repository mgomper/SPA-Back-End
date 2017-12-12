var express = require('express');
var routes = express.Router();
var BlogPost = require('../model/blogPost');
var neo4j = require('neo4j-driver').v1;
var BlogPost = require('../model/blogPost');

const driver = neo4j.driver("bolt://hobby-blepbjifjhecgbkeenplgjal.dbs.graphenedb.com:24786", neo4j.auth.basic("neo4j-favorite", "b.4XH9o3Lqpsdw.DY99bLVYkcFRZm8u"));
const session = driver.session();

routes.get('/blogposts/frontpage', function(req, res) {
  //res.contentType('application/json');
  var ids = [];
  var advertisementsFromFavs = [];

  session
    .run("MATCH (n:BlogPost) RETURN n")
    .then(function(result) {
      result.records.forEach(function(record){
        ids.push(record._fields[0].properties.mongoId);
      });
      console.log(ids);
      return ids;
    })
    .then((ids)=>{
      BlogPost.find({_id: { $in: ids}})
          .then((blogPost) => {
          res.status(200).json(blogPost);
  })
    })
    .catch((error) => {
      res.status(400).json(error);
    })
});

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

routes.put('/blogPosts/:id/comment', function(req, res) {
    const blogPostId = req.param('id');
    const commentProps = req.body;

    BlogPost.findById(req.params.id)
        .then((blogPost) => {
          blogPost.comments.push(commentProps);
          blogPost.save();
        })
        .then(() => res.status(200).json({
        'status': 'Comment is added.'
    }))
    .catch((error) => res.status(400).json(error))
});

routes.put('/blogPosts/:id/commentinc/:idm', function(req, res) {
    const blogPostId = req.params.id;
    const commentId = req.params.idm;

        BlogPost.update({_id: blogPostId, 'comments._id': commentId}, {$inc:{'comments.$.rating':1}})
        .then((blogPost) => res.status(200).json({
        'status': 'Comment rating is increased.'
    }))
    .catch((error) => res.status(400).json(error))
});

routes.put('/blogPosts/:id/commentdec/:idm', function(req, res) {
    const blogPostId = req.params.id;
    const commentId = req.params.idm;

        BlogPost.update({_id: blogPostId, 'comments._id': commentId}, {$inc:{'comments.$.rating':-1}})
        .then((blogPost) => res.status(200).json({
        'status': 'Comment rating is decreased.'
    }))
    .catch((error) => res.status(400).json(error))
});

routes.put('/blogPosts/:id/incr', function(req, res) {
    const blogPostId = req.params.id;

        BlogPost.update({_id: blogPostId}, {$inc:{rating:1}})
        .then((blogPost) => res.status(200).json({
        'status': 'Post rating is increased.'
    }))
    .catch((error) => res.status(400).json(error))
});

routes.put('/blogPosts/:id/decr', function(req, res) {
    const blogPostId = req.params.id;

        BlogPost.update({_id: blogPostId}, {$inc:{rating:-1}})
        .then((blogPost) => res.status(200).json({
        'status': 'Post rating is decreased.'
    }))
    .catch((error) => res.status(400).json(error))
});

routes.get('/blogPosts/filter/rating', function(req, res) {
      res.contentType('application/json');
      BlogPost.find({})
        .sort({rating: -1})
        .then((blogPost) => {
          res.status(200).json(blogPost);
  })
      .catch((error) => res.status(400).json(error));


});

routes.delete('/blogPosts/:id/comment/:idm', function(req, res) {
    const blogPostId = req.param('id');
    const commentId = req.param('idm');

    BlogPost.findById(blogPostId)
        .then((blogPost) => {
          blogPost.comments.id(commentId).remove();
          blogPost.save();
        })
        .then((blogPost) => res.status(200).json({
        'status': 'Comment is deleted.'
    }))
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

routes.post('/blogPosts/frontpage/:id', function (req, res) {
  var id = req.params.id;

  session
    .run("CREATE(n:BlogPost {mongoId:{idNeo}}) RETURN n.mongoId", {idNeo: id})
    .then(function(result) {
      res.status(200).json({"response": "BlogPost added to front page."});
      session.close();
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});



module.exports = routes;
