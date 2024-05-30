import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddNewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ content: "", type: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (error) {
      setMessage({ content: error.response.data.error, type: "failed" });
      setTimeout(() => {
        setMessage({ content: "", type: "" });
      }, 3500);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
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
          message={message.content}
          type={message.type}
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          {message && (
            <Notification message={message?.content} type={message?.type} />
          )}
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          <AddNewBlog
            token={user.token}
            onSetMessage={setMessage}
            onSetBlogs={setBlogs}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default App;
