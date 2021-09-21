import React from 'react'
import PropTypes from 'prop-types'

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
      <h2>create new</h2>
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
  )
}
BlogForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  handleUrl: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
