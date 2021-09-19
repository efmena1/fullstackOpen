import React from "react";

const LoginForm = ({
  username,
  userhandle,
  password,
  passwordHandle,
  loginHandle,
}) => {
  const handleUserChange = (event) => {
    userhandle(event.target.value);
  };
  const handlePasswordChange = (event) => {
    passwordHandle(event.target.value);
  };
  return (
    <div>
      <form onSubmit={loginHandle}>
        <p>
          Username:
          <input type="text" value={username} onChange={handleUserChange} />
        </p>
        <p>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const CreateForm = ({
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

export {LoginForm, CreateForm}
