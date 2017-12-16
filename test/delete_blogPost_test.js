const assert = require('assert');
const BlogPost = require('../src/model/blogPost');

let funny, happy, dark;

describe('Deleting a user', () => {
  beforeEach((done) => {
    funny = new BlogPost({
      title: 'Title',
      content: 'Content1',
      rating: 1
    });

    dark = new BlogPost({
      title: 'Title2',
      content: 'Content2',
      rating: 2
    });

    happy = new BlogPost({
      title: 'Title',
      content: 'Content 3',
      rating: 3
    });

    Promise.all([funny.save(), dark.save(), happy.save()])
      .then(() => done());
  });

  it('Deletes all posts with a certain criteria', (done) => {
    BlogPost.remove({ title: 'Title'})
      .then(() => BlogPost.findOne({title: 'Title'}))
      .then((post) => {
        assert(post === null);
        done();
      });
  });

  it('Deletes a specific post by id', (done) => {
    BlogPost.findByIdAndRemove(funny._id)
      .then(() => {
      BlogPost.findByIdAndRemove(happy._id)
        .then(() => BlogPost.findOne({title: 'Title'}))
        .then((post) => {
          assert(post === null);
          done();
        });
    });
  });
});
