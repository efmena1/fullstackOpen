const _ = require('lodash');

const dummy = (blogs) => (blogs.length === 0
  ? 1
  : blogs.reduce((s, p) => s + p.likes, 0));

const totalLikes = (blogs) => blogs.reduce((s, p) => s + p.likes, 0);

const favoriteBlog = (blogs) => {
  const res = blogs.reduce((prev, current) => ((prev.likes > current.likes) ? prev : current), 0);
  return res;
};

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, (blog) => blog.author);
  const res = Object.entries(groupedBlogs)
    .reduce((s, p) => ((p[1].length > s[1].length) ? p : s));
  return ({
    author: res[0],
    blogs: res[1].length,
  });
};

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, (blog) => blog.author);
  const res = Object.entries(groupedBlogs)
    .reduce((s, p) => ((
      p[1].reduce((act, prev) => act + prev.likes, 0)
      > s[1].reduce((act, prev) => act + prev.likes, 0)
    ) ? p : s));
  return ({
    author: res[0],
    likes: res[1].reduce((s, p) => s + p.likes, 0),
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
