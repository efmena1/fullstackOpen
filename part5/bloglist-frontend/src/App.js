import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import {LoginForm, CreateForm} from "./components/Forms";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    message:null,
    state:false
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

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
      console.log('error')
      setNotificationMessage({
        message:'Invalid username or password',
        state: false
      })
      setTimeout(() => {
        setNotificationMessage({message: null,state: false});
      }, 5000)
    }
  };

  const logoutHandle = async (event) => {
    window.localStorage.clear();
    setUser(null);
  };
  const handleCreate = async (event) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotificationMessage({
      message:`a new blog ${newBlog.title} by ${newBlog.author} added!`,
      state: true
    })
    setTimeout(() => {
      setNotificationMessage({message: null,state: false});
    }, 5000)
  }


  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage.message} state={notificationMessage.state} />
        <LoginForm
          username={username}
          userhandle={setUsername}
          password={password}
          passwordHandle={setPassword}
          loginHandle={loginHandle}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage.message} state={notificationMessage.state} />
      <p>
        <b>{user.name} logged in</b>
        <button type="button" onClick={() => logoutHandle()}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      <CreateForm 
        title={title}
        handleTitle={setTitle}
        author={author}
        handleAuthor={setAuthor}
        url={url}
        handleUrl={setUrl}
        handleCreate={handleCreate}/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
