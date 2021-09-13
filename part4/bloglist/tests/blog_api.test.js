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

describe('Getting Data from server', () => {
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
});

describe('Posting data to server', () => {
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
    expect(response.body.likes).toBe(0);
  });

  test('check bad request when missing title and url', async () => {
    const newBlog = {
      author: 'Juan Perez',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  }, 100000);

  test('success with status 201 if blog is updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogId = blogsAtStart[0].id;
    const blog = {
      likes: 50,
    };

    const response = await api
      .put(`/api/blogs/${blogId}`)
      .send(blog)
      .expect(201);
    expect(response.body.likes).toBe(50);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(50);
  });
});

describe('Deleting data in server', () => {
  test('delete success with status 204 if id is valid ', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });

  test('delete error with status 404 if id is invalid ', async () => {
    const invalidId = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
