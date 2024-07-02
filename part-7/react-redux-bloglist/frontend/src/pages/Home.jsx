import { useDispatch, useSelector } from "react-redux";
import Toggler from "../components/Toggler";
import AddNewBlog from "../components/AddNewBlog";
import Notification from "../components/Notification";
import Blog from "../components/Blog";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/blogReducer";
import { logOutUser } from "../reducers/loginReducer";

function Home() {
  const user = useSelector((state) => state.login);
  const { message } = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOutUser());
  }
  return (
    <>
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
}

export default Home;
