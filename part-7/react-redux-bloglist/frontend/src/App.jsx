import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddNewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Toggler from "./components/Toggler";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logOutUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

    if (savedUser) {
      dispatch(setUser(savedUser));
      blogService.setToken(savedUser.token);
    }
  }, []);

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOutUser());
  }

  return (
    <>
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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
              <Blog key={blog.id} blog={blog} username={user.username} />
            ))}
        </>
      )}
    </>
  );
};

export default App;
