import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../reducers/loginReducer";
import Notification from "./Notification";

function Navbar() {
  const user = useSelector((state) => state.login);
  const { message } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const listStyle = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: "1rem",
  };

  const navStyle = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    padding: "1rem 1.25rem",
    backgroundColor: "lightGrey",
  };

  const linkStyle = {
    textDecoration: "none",
  };

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOutUser());
  }

  return (
    <header>
      <nav style={navStyle}>
        <ul style={listStyle}>
          <li>
            <Link to="/create" style={linkStyle}>
              Create
            </Link>
          </li>
          <li>
            <Link to="/users" style={linkStyle}>
              Users
            </Link>
          </li>
        </ul>
        <span>{user.name} logged in</span>
        <button onClick={handleLogout}>log out</button>
      </nav>
      <h2>blogs app</h2>
      {message && <Notification />}
    </header>
  );
}

export default Navbar;
