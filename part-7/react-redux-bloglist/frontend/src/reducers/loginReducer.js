import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { showMessage } from "./notificationReducer";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    logOutUser: (state) => {
      return null;
    },
  },
});

export const { setUser, logOutUser } = loginSlice.actions;
export default loginSlice.reducer;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (error) {
      dispatch(
        showMessage({ message: error.response.data.error, type: "error" }, 3.5)
      );
    }
  };
};
