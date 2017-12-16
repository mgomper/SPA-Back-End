const assert = require('assert');
const BlogPost = require('../src/model/blogPost');
const comment = require('../src/model/comment');

describe('Deleting a comment', () => {
  beforeEach((done) => {
    post = new BlogPost({
      title: 'Title title',
      content: 'Content content',
      rating: 30,
      comments: [{content: 'old content'}]
    });
    post.save()
    .then(() => done());
  });

  it('Deletes a comment by id', (done) => {
    BlogPost.findById(post._id)
        .then((blogPost) => {
          blogPost.comments.id(post.comments[0]._id).remove();
          blogPost.save();
          return blogPost;
        })
          .then((post) => {
            console.log('blogPost found: ' + post);
            assert(post.comments.length === 0);
            done();
      });
  });

  it('Deletes a comment by property', (done) => {
    BlogPost.findOne({title: post.title})
        .then((blogPost) => {
          blogPost.comments.id(post.comments[0]._id).remove();
          blogPost.save();
          return blogPost;
        })
          .then((post) => {
            console.log('blogPost found: ' + post);
            assert(post.comments.length === 0);
            done();
      });
  });
});
