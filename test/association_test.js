const assert = require('assert');
const User = require('../src/model/user');
const Comment = require('../src/model/comment');
const BlogPost = require('../src/model/blogPost');
const Board = require('../src/model/board');
const mongoose = require('mongoose');

describe('association between comment, user and blogPost', () => {
  let joe, blogPost, comment, board;
  beforeEach((done) => {
    joe = new User({username: 'Joe', password: 'password' });
    blogPost = new BlogPost({content: 'Content of post', rating: 4});
    // comment = new Comment({content: 'A comment on this great post.', rating: 4});
    board = new Board({title: 'Art'});

    joe.blogPosts.push(blogPost);
    // blogPost.comments.push(comment);
    board.blogPosts.push(blogPost);
    blogPost.user = joe;
    // comment.user = joe;

//ipv .save 3x hieronder. Bij welke van de drie zet je .then done?
    Promise.all([joe.save(), blogPost.save(), board.save()])
      .then(() => done());
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({username: 'Joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].content === 'Content of post');
        done();
      });
  });

  it('saves a full relation graph', (done) => {
    User.findOne({username: 'Joe'})
      .populate({
        path: 'blogPosts',
        // populate: {
        //   path: 'comments',
        //   model: 'comment',
        //   populate: {
        //     path: 'user',
        //     model: 'user'
        //   }
        // }
      })
      .then((user) => {

        assert(user.blogPosts[0].content === 'Content of post');
        // assert(user.blogPosts[0].comments[0].content === 'A comment on this great post.');
        // assert(user.blogPosts[0].comments[0].user.username === 'Joe');
        done();
      });
  });

  it('saves a blogPost with a user', (done) => {
    BlogPost.findOne({content: 'Content of post'})
      .populate({
        path: 'user'
      })
      .then((blogPost) => {
        assert(blogPost.user.username === 'Joe');
        done();
      });
  });

  it('saves a board with a blogPost', (done) => {
    Board.findOne({title: 'Art'})
      .populate({
        path: 'blogPosts',
      })
      .then((board) => {
        console.log(board.blogPosts);
        assert(board.title === 'Art');
        assert(board.blogPosts[0].content === 'Content of post');
        // assert(board.blogPosts[0].comments[0].content === 'A comment on this great post.');
        // assert(board.blogPosts[0].comments[0].user.username === 'Joe');
        done();
      });
  });
});
