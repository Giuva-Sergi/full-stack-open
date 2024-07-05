import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { setUsers, setSelectedUser, clearSelectedUser } =
  usersSlice.actions;
export default usersSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const data = await userService.getUsers();
    dispatch(setUsers(data));
  };
};

export const getSelectedUser = (id) => {
  return async (dispatch) => {
    const data = await userService.getUserById(id);
    dispatch(setSelectedUser(data));
  };
};
