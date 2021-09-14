/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!body.title && !body.url) {
    return response.status(400).end();
  }

  const users = await User.find({});
  const user = users[Math.floor(Math.random() * users.length)];

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    date: new Date(),
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(blog);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (deletedBlog) {
    return response.status(204).end();
  }
  return response.status(404).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  return response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
