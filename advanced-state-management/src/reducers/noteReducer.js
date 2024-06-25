import { generateId } from "../helpers/helpers";

const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const noteReducer = function (state = initialState, action) {
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

const createNewNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

const toggleImportance = (id) => {
  return { type: "TOGGLE_IMPORTANCE", payload: { id } };
};

export { noteReducer, createNewNote, toggleImportance };
