const assert = require('assert');
const BlogPost = require('../src/model/blogPost');

describe('Reading post records', () => {
  let funny, dark, happy;

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

  it('Reads all blogPosts', (done) => {
    BlogPost.find({ title: 'Title' })
      .then((posts) => {
        assert(posts[0]._id.toString === funny._id.toString && posts[1]._id.toString === dark._id.toString);
        done();
      });
  });

  it('Reads an individual user', (done) => {
    BlogPost.findOne({_id: dark._id})
      .then((post) => {
        assert(post.title === 'Title2');
        done();
      });
  });
});
