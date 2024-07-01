import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddNewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggler from "./components/Toggler";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

    if (savedUser) {
      setUser(savedUser);
      blogService.setToken(savedUser.token);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.response.data.error);

      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  }

  async function updateLikes(blogID, newObject) {
    const updatedBlog = await blogService.update(blogID, newObject);

    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );

    setBlogs(updatedBlogs);
  }

  async function createBlog(newBlog) {
    try {
      const response = await blogService.create(newBlog);
      const message = `a new blog ${response.title} by ${response.author} added`;

      setMessage(message);
      setBlogs((prevBlogs) => [...prevBlogs, response]);

      setTimeout(() => {
        setMessage(null);
      }, 3500);
    } catch (error) {
      console.error(error.response.data.error);
    }
  }

  async function deleteBlog(blogID) {
    await blogService.deleteBlog(blogID);

    const updatedBlogs = blogs.filter((blog) => blog.id !== blogID);

    setBlogs(updatedBlogs);
  }

  return (
    <>
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          message={message}
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          {message && <Notification message={message} />}
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          <Toggler>
            <AddNewBlog onCreateBlog={createBlog} />
          </Toggler>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onUpdateLikes={updateLikes}
                onDeleteBlog={deleteBlog}
                username={user.username}
              />
            ))}
        </>
      )}
    </>
  );
};

export default App;
