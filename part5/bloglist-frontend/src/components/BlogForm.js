import React from "react";

const BlogForm = ({
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
  onSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>
          <b>Title:</b>
          <input type="text" value={title} onChange={handleTitle} />
        </p>
        <p>
          <b>Author:</b>
          <input type="text" value={author} onChange={handleAuthor} />
        </p>
        <p>
          <b>URL:</b>
          <input type="text" value={url} onChange={handleUrl} />
        </p>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
