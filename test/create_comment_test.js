const assert = require('assert');
const BlogPost = require('../src/model/blogPost');
const CommentSchema = require('../src/model/comment');

describe('Creating comment records', () => {
  it('Saves a comment', (done) => {
    const post = new BlogPost({
      title: 'post Title',
      content: 'post Content',
      rating: 40,
      comments: [{content: 'This is the comment content.'}]
    });

    post.save()
    .then(() => {
      assert(!post.comments[0].isNew);
      done();
    });
  });
});
