import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearMessage() {
      return "";
    },
  },
});

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => {
      dispatch(clearMessage());
    }, seconds * 1000);
  };
};

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
