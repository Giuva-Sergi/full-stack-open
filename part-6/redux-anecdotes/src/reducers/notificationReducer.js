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

export function setNotification(dispatch, message, milliseconds) {
  dispatch(setMessage(message));
  setTimeout(() => {
    dispatch(clearMessage());
  }, milliseconds);
}

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
