import { createStore } from "redux";

export default noteReducer = function (state = [], action) {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE":
      return state.map((obj) =>
        obj.id === action.payload.id
          ? { ...obj, important: !obj.important }
          : obj
      );
    default:
      return state;
  }
};

const store = createStore(noteReducer);

const createNewNote = (payload) => {
  return { type: "NEW_NOTE", payload };
};

const toggleImportance = (payload) => {
  return { type: "TOGGLE_IMPORTANCE", payload };
};

// store.dispatch(
//   createNewNote({
//     content: "the app state is in redux store",
//     important: true,
//     id: 1,
//   })
// );
// store.dispatch(
//   createNewNote({
//     content: "state changes are made with actions",
//     important: false,
//     id: 2,
//   })
// );

// store.dispatch(toggleImportance({ id: 2 }));
