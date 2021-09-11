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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
