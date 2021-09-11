const dummy = (blogs) => (blogs.length === 0
  ? 1
  : blogs.reduce((s, p) => s + p.likes, 0));

const totalLikes = (blogs) => blogs.reduce((s, p) => s + p.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
