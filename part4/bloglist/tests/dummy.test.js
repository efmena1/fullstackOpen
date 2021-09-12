const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has six blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithSixBlogs);
    expect(result).toBe(36);
  });

  test('return the blog with mostlikes with a list of six', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs);
    expect(result.likes).toEqual(listWithSixBlogs[2].likes);
  });

  test('return the author with most ammount of blogs with a list of six', () => {
    const result = listHelper.mostBlogs(listWithSixBlogs);
    expect(result.blogs).toBe(3);
  });

  test('return the author with most ammount of likes with a list of six', () => {
    const result = listHelper.mostLikes(listWithSixBlogs);
    expect(result.likes).toBe(17);
  });
});
