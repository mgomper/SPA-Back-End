const assert = require('assert');
const BlogPost = require('../src/model/blogPost');

describe('Validation on blogPost records', () => {
  it('Gives an error on empty content.', (done) => {
    const blogPost = new BlogPost({
      content: ''
    });

    const validationResult = blogPost.validateSync();
    const { message } = validationResult.errors.content;

    assert(message === 'Content must be filled in.');
    done();
  });

    it('Gives an error on too short content.', (done) => {
      const blogPost = new BlogPost({
        content: 'A'
      });

      const validationResult = blogPost.validateSync();
      const { message } = validationResult.errors.content;

      assert(message === 'Content must contain at least 6 characters.');
      done();
    });

  it('Disallows adding an invalid record to the database', (done) => {
    const blogPost = new BlogPost({
      content: 'A'
    });

    blogPost.save()
    .catch((validationResult) => {
      const { message } = validationResult.errors.content;
      assert(message === 'Content must contain at least 6 characters.');
      done();
    });
    //promise rejected dus .then kan niet
  });
});
