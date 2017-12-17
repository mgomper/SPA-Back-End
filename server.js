var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('./src/config/mongo.db');
var userRoutes = require('./src/api/user.routes');
var commentRoutes = require('./src/api/comment.routes');
var blogPostRoutes = require('./src/api/blogPost.routes');
var favoritesRoutes = require('./src/api/favorites.routes');
var config = require('./src/config/env/env');
var neo4j = require('neo4j-driver').v1;
var path = require('path');

var app = express();
// const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));
// const session = driver.session();

module.exports = {};

app.use(bodyParser.urlencoded({
    'extended': 'false'
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', (process.env.PORT | config.env.webPort));
app.set('env', (process.env.ENV | 'development'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// CORS headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api', userRoutes);
app.use('/api', blogPostRoutes);
app.use('/api', favoritesRoutes);

app.use(function (err, req, res, next) {
    // console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    };
    res.status(401).send(error);
});

app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar. Probeer een specifieke URL zoals: /api/blogPosts'
    });
});

app.listen(config.env.webPort, function () {
    console.log('De server luistert op port ' + app.get('port'));
    console.log('Zie bijvoorbeeld http://localhost:3000/api/blogPosts');
});
