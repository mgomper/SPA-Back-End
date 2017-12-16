const assert = require('assert');
const BlogPost = require('../src/model/blogPost');
const comment = require('../src/model/comment');

describe('Reading post records', () => {
  let post;

beforeEach((done) => {
  post = new BlogPost({
    title: 'Title',
    content: 'Content1',
    rating: 1,
    comments: [{content: 'comment content'}, {content: 'comment content'}]
  });

  Promise.all([post.save()])
    .then(() => done());
});

  it('Reads all comments', (done) => {
    BlogPost.findOne({ title: 'Title' })
      .then((posts) => {
        assert(posts.comments[0]._id.toString === post.comments[0]._id.toString && posts.comments[1]._id.toString === post.comments[1]._id.toString);
        done();
      });
  });

  it('Reads one comment', (done) => {
    BlogPost.findOne({ title: 'Title' })
      .then((posts) => {
        assert(posts.comments[0]._id.toString === post.comments[0]._id.toString);
        done();
      });
  });
});
