const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('blogs unique identificator is "id"', async () => {
  const response = await api.get('/api/blogs');
  response.body.map((blog) => expect(blog.id).toBeDefined());
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'new test blog',
    author: 'Juan Perez',
    url: 'http://google.com',
    likes: '10',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((blog) => blog.title);
  expect(contents).toContain('new test blog');
});

test('return 0 likes quen likes is missing in request', async () => {
  const newBlog = {
    title: 'new test blog',
    author: 'Juan Perez',
    url: 'http://google.com',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  console.log(response.body);
  expect(response.body.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});
