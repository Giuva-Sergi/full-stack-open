import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import AddNewBlog from "./components/AddNewBlog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Toggler from "./components/Toggler";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logOutUser } from "./reducers/loginReducer";
import { Navigate, Route, Routes } from "react-router-dom";
import { element } from "prop-types";
import Home from "./pages/Home";
import Users from "./pages/Users";

const App = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  // const { message } = useSelector((state) => state.notification);
  // const blogs = useSelector((state) => state.blogs);

  // useEffect(() => {
  //   dispatch(initializeBlogs());
  // }, []);

  useEffect(() => {
    const savedUser = JSON.parse(window.localStorage.getItem("loggedUser"));

    if (savedUser) {
      dispatch(setUser(savedUser));
      blogService.setToken(savedUser.token);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  // function handleLogout() {
  //   window.localStorage.removeItem("loggedUser");
  //   dispatch(logOutUser());
  // }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate replace to="/login" />}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );

  /// WITHOUT PAGINATION
  // return (
  //   <>
  //     {!user && (
  //       <LoginForm
  //         username={username}
  //         setUsername={setUsername}
  //         password={password}
  //         setPassword={setPassword}
  //       />
  //     )}
  //     {user && (
  //       <>
  //         <h2>blogs</h2>
  //         {message && <Notification />}
  //         <p>{user.name} logged in</p>
  //         <button onClick={handleLogout}>log out</button>
  //         <Toggler>
  //           <AddNewBlog />
  //         </Toggler>
  //         {[...blogs]
  //           .sort((a, b) => b.likes - a.likes)
  //           .map((blog) => (
  //             <Blog key={blog.id} blog={blog} username={user.username} />
  //           ))}
  //       </>
  //     )}
  //   </>
  // );
};

export default App;
