import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../reducers/loginReducer";
import Notification from "./Notification";

function Navbar() {
  const user = useSelector((state) => state.login);
  const { message } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("loggedUser");
    dispatch(logOutUser());
    navigate("/");
  }

  return (
    <header className="bg-blue-800 py-6 px-3">
      <nav className="flex justify-between items-center text-slate-200">
        <ul className="flex gap-3">
          <li className="hover:scale-110 transition ease-in">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:scale-110 transition ease-in">
            <Link to="/create">Create</Link>
          </li>
          <li className="hover:scale-110 transition ease-in">
            <Link to="/users">Users</Link>
          </li>
        </ul>
        <h2 className="my-8 uppercase text-slate-200 text-center text-2xl">
          blogs app
        </h2>
        <div className="flex flex-col gap-3">
          <span>{user.name} logged in</span>
          <button
            className="uppercase text-sm bg-red-400 hover:bg-red-700 transition ease-in rounded-xl py-3 px-2 w-1/2 mx-auto"
            onClick={handleLogout}
          >
            log out
          </button>
        </div>
      </nav>
      {message && <Notification />}
    </header>
  );
}

export default Navbar;
