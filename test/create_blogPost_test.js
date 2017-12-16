const assert = require('assert');
const BlogPost = require('../src/model/blogPost');

describe('Creating post records', () => {
  it('Saves a post', (done) => {
    const post = new BlogPost({
      title: 'post Title',
      content: 'post Content',
      rating: 40
    });

    post.save()
    .then(() => {
      assert(!post.isNew);
      done();
    });
  });
});
