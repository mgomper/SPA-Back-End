const assert = require('assert');
const BlogPost = require('../src/model/blogPost');

describe('Updating a post', () => {
  beforeEach((done) => {
    post = new BlogPost({
      title: 'Title title',
      content: 'Content content',
      rating: 30
    });
    post.save()
    .then(() => done());
  });

  it('Updates posts by title', (done) => {
    BlogPost.update({title: 'Title title'}, {title: 'New title'})
      .then(() => {
        BlogPost.findOne({title: 'New title'})
          .then((post) => {
            assert(post.title === 'New title');
            done();
          });
      });
  });

  it('Updates an individual user by id', (done) => {
    BlogPost.findByIdAndUpdate(post._id, {title: 'Second title'})
      .then(() => {
        BlogPost.findOne({title: 'Second title'})
          .then((post) => {
            assert(post.title === 'Second title');
            done();
          });
      });
  });
});
