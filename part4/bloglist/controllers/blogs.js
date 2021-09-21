/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body, token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'missing title and/or url',
    });
  }

  const likes = body.likes
    ? body.likes
    : 0;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes,
    date: new Date(),
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(blog);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { token } = request;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(404).json({
      error: 'blog not found',
    });
  }
  const userId = blogToDelete.user;
  if (userId.toString() === decodedToken.id.toString()) {
    await blogToDelete.delete();
    await User.updateOne({ blogs: request.params.id }, { $pull: { blogs: request.params.id } });
    return response.status(204).end();
  }
  return response.status(401).json({
    error: 'invalid user',
  });
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 });
  return response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
