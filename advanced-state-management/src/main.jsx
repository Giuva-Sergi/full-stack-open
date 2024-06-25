import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import noteReducer from "./reducers/noteReducer";
// import { filterReducer } from "./reducers/filterReducer";
import filterReducer from "./reducers/filterReducer";
// import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

// const store = createStore(reducer);
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
