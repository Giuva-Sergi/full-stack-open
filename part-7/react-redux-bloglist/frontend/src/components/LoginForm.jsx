import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../reducers/loginReducer";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { message } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    navigate("/");
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

export default LoginForm;
