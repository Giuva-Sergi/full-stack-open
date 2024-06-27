import { createStore } from "redux";
import ReactDOM from "react-dom/client";
import App from "./App";

const counterReducer = function (state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const increment = () => {
  return {
    type: "INCREMENT",
  };
};

const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

const setToZero = () => {
  return {
    type: "ZERO",
  };
};

const selectCounterValue = (state) => state;
// store.subscribe(() => {
//   const storeNow = store.getState();
//   console.log(storeNow);
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

store.subscribe(renderApp);

export {
  store,
  increment,
  decrement,
  setToZero,
  selectCounterValue,
  renderApp,
};
