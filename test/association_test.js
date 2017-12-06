const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const mongoose = require('mongoose');

describe('association between comment, user and blogPost', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({username: 'Joe', password: 'password' });
    blogPost = new BlogPost({content: 'Content of post', rating: 4});
    comment = new Comment({content: 'A comment on this great post.', rating: 4});

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

//ipv .save 3x hieronder. Bij welke van de drie zet je .then done?
    Promise.all([joe.save(), blogPost.save(), comment.save()])
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
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.blogPosts[0].content === 'Content of post');
        assert(user.blogPosts[0].comments[0].content === 'A comment on this great post.');
        assert(user.blogPosts[0].comments[0].user.username === 'Joe');
        done();
      });
  });
});
