import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import noteReducer, { appendNote, setNotes } from "./reducers/noteReducer";
// import { filterReducer } from "./reducers/filterReducer";
import filterReducer from "./reducers/filterReducer";
// import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { getNotes } from "./services/notes";

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

// one note at a time

// getNotes().then((notes) =>
//   notes.forEach((note) => store.dispatch(appendNote(note)))
// );

// setting the entire array

// getNotes().then((notes) => store.dispatch(setNotes(notes)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
