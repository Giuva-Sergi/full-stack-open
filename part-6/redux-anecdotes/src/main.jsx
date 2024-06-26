import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
// import { anecdoteReducer } from "./reducers/anecdoteReducer";
// import { filterReducer } from "./reducers/filterReducer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
