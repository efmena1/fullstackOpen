const dummy = (blogs) => (blogs.length === 0
  ? 1
  : blogs.reduce((s, p) => s + p.likes, 0));

const totalLikes = (blogs) => blogs.reduce((s, p) => s + p.likes, 0);

const favoriteBlog = (blogs) => {
  const res = blogs.reduce((prev, current) => ((prev.likes > current.likes) ? prev : current), 0);
  return res;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
