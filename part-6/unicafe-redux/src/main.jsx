import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import {
  reducer,
  increaseBad,
  increaseGood,
  increaseOk,
  reset,
  getOk,
  getGood,
  getBad,
} from "./reducer";

const store = createStore(reducer);

const App = () => {
  return (
    <div>
      <button onClick={() => store.dispatch(increaseGood())}>good</button>
      <button onClick={() => store.dispatch(increaseOk())}>ok</button>
      <button onClick={() => store.dispatch(increaseBad())}>bad</button>
      <button onClick={() => store.dispatch(reset())}>reset stats</button>
      <div>good {getGood(store)}</div>
      <div>ok {getOk(store)}</div>
      <div>bad {getBad(store)}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
