import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

    const user = await loginService.login({ username, password });
    setUser(user);
    window.localStorage.setItem("loggedUser", JSON.stringify(user));
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
        />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default App;
