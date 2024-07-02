import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import PropTypes from "prop-types";
import { loginUser } from "../reducers/userReducer";

function LoginForm({ username, setUsername, password, setPassword }) {
  const { message } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  }

  return (
    <div>
      <h2>log in to application</h2>
      {message && <Notification />}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          data-testid="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
