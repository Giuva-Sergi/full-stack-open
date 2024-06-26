import { createSlice } from "@reduxjs/toolkit";
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

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNewNote(state, action) {
      state.push(action.payload);
    },
    toggleImportance(state, action) {
      return state.map((obj) =>
        obj.id === action.payload ? { ...obj, important: !obj.important } : obj
      );
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

// const noteReducer = function (state = initialState, action) {
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     case "TOGGLE_IMPORTANCE":
//       return state.map((obj) =>
//         obj.id === action.payload.id
//           ? { ...obj, important: !obj.important }
//           : obj
//       );
//     default:
//       return state;
//   }
// };

// const createNewNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// const toggleImportance = (id) => {
//   return { type: "TOGGLE_IMPORTANCE", payload: { id } };
// };

export const { createNewNote, toggleImportance, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
