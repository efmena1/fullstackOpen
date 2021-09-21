import React, { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    state: false,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const BlogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const loginHandle = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exeption) {
      console.log("error");
      setNotificationMessage({
        message: "Invalid username or password",
        state: false,
      });
      setTimeout(() => {
        setNotificationMessage({ message: null, state: false });
      }, 5000);
    }
  };

  const logoutHandle = async (event) => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async (event) => {
    BlogFormRef.current.toggleVisibility();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    const response = await blogService.create(newBlog);
    setBlogs(blogs.concat(response));
    setTitle("");
    setAuthor("");
    setUrl("");
    setNotificationMessage({
      message: `a new blog ${newBlog.title} by ${newBlog.author} added!`,
      state: true,
    });
    setTimeout(() => {
      setNotificationMessage({ message: null, state: false });
    }, 5000);
  };

  const handleLike = async (event) => {
    const blogId = event.target.value
    const BlogToUpdate = blogs.find(blog => blog.id === blogId)
    const newBlog = {
      user: BlogToUpdate.user.id,
      likes: BlogToUpdate.likes + 1,
      author: BlogToUpdate.author,
      title: BlogToUpdate.title,
      url: BlogToUpdate.url,
    }
    const updatedBlog = await blogService.update(blogId,newBlog);
    setBlogs(blogs.map((blog) => (blog.id !== blogId ? blog : updatedBlog)))
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={notificationMessage.message}
          state={notificationMessage.state}
        />
        <LoginForm
          username={username}
          userhandle={({ target }) => setUsername(target.value)}
          password={password}
          passwordHandle={({ target }) => setPassword(target.value)}
          onSubmit={loginHandle}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notificationMessage.message}
        state={notificationMessage.state}
      />
      <p>
        <b>{user.name} logged in </b>
        <button type="button" onClick={() => logoutHandle()}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="create new blog" ref={BlogFormRef}>
        <h2>create new</h2>
        <BlogForm
          title={title}
          handleTitle={({target}) => setTitle(target.value)}
          author={author}
          handleAuthor={({target}) => setAuthor(target.value)}
          url={url}
          handleUrl={({target}) => setUrl(target.value)}
          onSubmit={handleCreate}
        />
      </Togglable>
      <Blogs handleLike={handleLike} blogs={blogs}/>
    </div>
  );
};

export default App;
