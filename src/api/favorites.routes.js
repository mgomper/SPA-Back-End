var express = require('express');
var routes = express.Router();
var neo4j = require('neo4j-driver').v1;
var BlogPost = require('../model/blogPost');

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));
const session = driver.session();

routes.post('/frontpage/:id', function (req, res) {
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

routes.get('/frontpage', function(req, res) {
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

module.exports = routes;
