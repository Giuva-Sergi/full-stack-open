import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
    clearMessage: (state) => {
      return {
        message: "",
        type: "",
      };
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;

export const showMessage = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(content));
    setTimeout(() => {
      dispatch(clearMessage());
    }, seconds * 1000);
  };
};
