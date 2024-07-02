import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddNewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggler from "./components/Toggler";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
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
      dispatch(
        showMessage({ message: error.response.data.error, type: "error" }, 3.5)
      );
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

    // setBlogs(updatedBlogs);
  }

  async function deleteBlog(blogID) {
    await blogService.deleteBlog(blogID);

    const updatedBlogs = blogs.filter((blog) => blog.id !== blogID);

    // setBlogs(updatedBlogs);
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
          {message && <Notification />}
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>log out</button>
          <Toggler>
            <AddNewBlog />
          </Toggler>
          {[...blogs]
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
