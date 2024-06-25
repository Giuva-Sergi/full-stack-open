import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createNewNote, noteReducer } from "./reducers/noteReducer";
import { filterChange, filterReducer } from "./reducers/filterReducer";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange("IMPORTANT"));
// store.dispatch(
//   createNewNote("combineReducers forms one reducer from many simple reducers")
// );
// store.dispatch(filterChange("NONIMPORTANT"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
