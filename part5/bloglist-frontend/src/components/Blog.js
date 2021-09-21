import React, { useState } from "react";
import PropTypes from 'prop-types';

const Blog = ({ blog, style, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <>
      <tr>
        <td style={style}>{blog.title}</td>
        <td style={style}>
          <button type="button" onClick={toggleVisibility}>
            {visible ? "hide" : "view"}
          </button>
        </td>
      </tr>
      <tr style={showWhenVisible}>
        <td>
          <ul>
            <li>
              <b>URL: </b> {blog.url}
            </li>
            <li>
              <b>Likes: </b> {blog.likes}
              <button type="button" value={blog.id} onClick={handleLike}>
                like
              </button>
            </li>
            <li>
              <b>Author: </b>
              {blog.author}
            </li>
          </ul>
          {blog.user.username === user.username && (
            <button
              type="button"
              style={{ color: "red" }}
              value={blog.id}
              onClick={handleDelete}
            >
              remove
            </button>
          )}
        </td>
      </tr>
    </>
  );
};
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
}

const Blogs = ({ blogs, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
    borderCollapse: "collapse",
  };
  return (
    <div>
      <table style={blogStyle}>
        <tbody>
          <tr>
            <th style={blogStyle}>Blog</th>
          </tr>
          {blogs.map((blog) => (
            <Blog
              style={blogStyle}
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
Blogs.propTypes = {
  blogs: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blogs;
