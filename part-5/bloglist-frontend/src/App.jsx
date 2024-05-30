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
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
