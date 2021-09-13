const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!body.title && !body.url) {
    return response.status(400).end();
  }
  const blog = new Blog(body);
  const result = await blog.save();
  return response.status(201).json(result);
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
