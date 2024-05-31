import Notification from "./Notification";

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
}

export default LoginForm;
