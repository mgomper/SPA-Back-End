const assert = require('assert');
const BlogPost = require('../src/model/blogPost');
const comment = require('../src/model/comment');

describe('Updating a comment', () => {
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

  it('Updates a comment by id', (done) => {
    BlogPost.findOneAndUpdate(
        { "_id": post._id, "comments._id": post.comments[0]._id },
        {
            "$set": {
                "comments.$.content": "New content."
            }
        }
    )
          .then(() => {
        BlogPost.findOne({title: 'Title title'})
          .then((post) => {
            assert(post.comments[0].content === 'New content.');
            done();
          });
      });
  });

  it('Updates a comment by property', (done) => {
    BlogPost.findOneAndUpdate(
        { "title": post.title, "comments._id": post.comments[0]._id },
        {
            "$set": {
                "comments.$.content": "New content."
            }
        }
    )
          .then(() => {
        BlogPost.findOne({title: 'Title title'})
          .then((post) => {
            assert(post.comments[0].content === 'New content.');
            done();
          });
      });
  });

});
