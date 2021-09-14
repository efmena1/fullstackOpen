const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await Blog.deleteMany({});

  // eslint-disable-next-line no-restricted-syntax
  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog);
    // eslint-disable-next-line no-await-in-loop
    await blogObject.save();
  }
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: 'juan',
      name: 'Juan Perez',
      password: 'juanp',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'juanp',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  test('creation fails with proper statuscode and message if password is not valid', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'invalidPass',
      name: 'Superuser_invalidPAss',
      password: 'ja',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`password` must be at least 3 characters long');
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);
});
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
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
  const loginUser = {
    username: 'root',
    password: 'sekret',
  };
  test('a valid blog can be added', async () => {
    const response = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200);

    const { token } = response.body;

    const newBlog = {
      title: 'new test blog',
      author: 'Juan Perez',
      url: 'http://google.com',
      likes: '10',
    };

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const contents = blogsAtEnd.map((blog) => blog.title);
    expect(contents).toContain('new test blog');
  });

  test('return 0 likes when likes is missing in request', async () => {
    const tokenResponse = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200);

    const { token } = tokenResponse.body;

    const newBlog = {
      title: 'new test blog',
      author: 'Juan Perez',
      url: 'http://google.com',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('check bad request when missing title and url', async () => {
    const tokenResponse = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200);

    const { token } = tokenResponse.body;

    const newBlog = {
      author: 'Juan Perez',
      likes: 10,
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('missing title and/or url');
  });

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
  const loginUser = {
    username: 'root',
    password: 'sekret',
  };
  test('delete success with status 204 if id is valid ', async () => {
    const tokenResponse = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200);

    const { token } = tokenResponse.body;

    const newBlog = {
      title: 'new test blog to delete',
      author: 'Juan Perez',
      url: 'http://google.com',
      likes: '1000',
    };

    const createdBlogResponse = await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtStart = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${createdBlogResponse.body.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(createdBlogResponse.body.title);
  });

  test('delete error with status 404 if id is invalid ', async () => {
    const tokenResponse = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200);

    const { token } = tokenResponse.body;

    const invalidId = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404);
  });

  test('delete error with status 401 Unauthorize no token is given ', async () => {
    const invalidId = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
