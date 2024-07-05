import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../reducers/loginReducer";
import Form from "./Form";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { message } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    await dispatch(loginUser({ username, password }));
    navigate("/");
  }

  return (
    <div className="grid grid-rows-2 w-2/4 mx-auto my-56 place-content-center">
      <h2 className="text-blue-600 text-2xl uppercase text-center">
        log in to application
      </h2>
      {message && <Notification />}
      <Form handlerFn={handleLogin}>
        <div className="flex gap-2">
          <label htmlFor="username">username</label>
          <input
            className="border border-gray-400 rounded-sm"
            type="text"
            id="username"
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="password">password</label>
          <input
            className="border border-gray-400 rounded-sm"
            type="password"
            id="password"
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="uppercase text-white bg-blue-500 hover:bg-blue-800 transition ease-in rounded-lg py-2 w-1/2 place-self-center"
          type="submit"
        >
          login
        </button>
      </Form>
    </div>
  );
}

export default LoginForm;
