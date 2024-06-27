import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "ALL",
  reducers: {
    filterChange(state, action) {
      return (state = action.payload);
    },
  },
});

// const filterReducer = function (state = "ALL", action) {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const filterChange = function (filter) {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

export const { filterChange } = filterSlice.actions;
export default filterSlice.reducer;
