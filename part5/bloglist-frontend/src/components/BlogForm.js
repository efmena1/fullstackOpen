import React from "react"

const BlogForm = ({
  title,
  handleTitle,
  author,
  handleAuthor,
  url,
  handleUrl,
  handleCreate
}) =>{
  const handleTitleChange = (event) => {
    handleTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    handleAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    handleUrl(event.target.value)
  }
  return (
    <div>
      <form onSubmit={handleCreate}>
      </form>
        <p>
          <b>Title:</b>
          <input type='text' value={title} onChange={handleTitleChange} />
        </p>
        <p>
          <b>Author:</b>
          <input type='text' value={author} onChange={handleAuthorChange} />
        </p>
        <p>
          <b>URL:</b>
          <input type='text' value={url} onChange={handleUrlChange} />
        </p>
        <button type='submit' onClick={handleCreate}>create</button>
    </div>
  )
}

export default BlogForm