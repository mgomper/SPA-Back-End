const assert = require('assert');
const User = require('../src/model/comment');
const BlogPost = require('../src/model/blogPost');

describe('Subdocumenting comments within users', () => {
  it('can create a post with a subdocument', (done) => {
    const blogPost = new BlogPost({
      content: 'Content',
      comments: [{ content: 'Comment with some content.', rating: 3.5 }]
    });

    blogPost.save()
      .then(() => BlogPost.findOne({content: 'Content'}))
      .then((post) => {
        assert(post.comments[0].content === 'Comment with some content.');
        done();
      });
  });

  it('can add a comment to an existing post', (done) => {
    const blogPost = new BlogPost({
      content: 'Content',
      posts: []
    });

    blogPost.save()
      .then(() => BlogPost.findOne({content: 'Content'}))
      .then((post) => {
        post.comments.push({content: 'Toegevoegde nieuwe content.', rating: 4});
        return post.save();
      })
      .then(() => BlogPost.findOne({content: 'Content'}))
      .then((post) => {
        assert(post.comments[0].content === 'Toegevoegde nieuwe content.');
        done();
      });
  });

  it('can remove a comment from an existing post', (done) => {
    //Beschreven in delete_comment_test.js
    done();
  });
});
