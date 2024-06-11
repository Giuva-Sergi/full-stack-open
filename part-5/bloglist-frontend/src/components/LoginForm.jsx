import Notification from "./Notification";
import PropTypes from "prop-types";

function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  message,
}) {
  return (
    <div>
      <h2>log in to application</h2>
      {message && <Notification message={message} type="error" />}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          data-testId="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          data-testId="password"
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
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default LoginForm;
