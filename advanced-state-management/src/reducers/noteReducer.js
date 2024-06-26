import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../helpers/helpers";
import { createNew, getNotes, updateNote } from "../services/notes";

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

export const { appendNote, setNotes } = noteSlice.actions;

// THIS ARE THUNKS' MIDDLEWARE FOR HANDLING BOTH THE BACKEND AND FRONTEND LOGIC IN A SINGLE FUNCTION

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await getNotes();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await createNew(content);
    dispatch(appendNote(newNote));
  };
};

export const toggleImportance = (id, note) => {
  return async (dispatch, getState) => {
    const updatedObj = await updateNote(id, note);
    const notes = getState().notes;
    const updatedNotes = notes.map((obj) =>
      obj.id === updatedObj.id ? updatedObj : obj
    );
    dispatch(setNotes(updatedNotes));
  };
};
export default noteSlice.reducer;
