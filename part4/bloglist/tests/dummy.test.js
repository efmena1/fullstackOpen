const listHelper = require('./dummy_helper');
const helper = require('./test_helper');

describe('tests with one blog array', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([helper.initialBlogs[0]]);
    expect(result).toBe(7);
  });
});

describe('tests with six blogs array', () => {
  test('return the total likes of the blogs', () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });

  test('return the blog with mostlikes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    expect(result.likes).toEqual(helper.initialBlogs[2].likes);
  });

  test('return the author with most ammount of blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs);
    expect(result.blogs).toBe(3);
  });

  test('return the author with most ammount of likes', () => {
    const result = listHelper.mostLikes(helper.initialBlogs);
    expect(result.likes).toBe(17);
  });
});
