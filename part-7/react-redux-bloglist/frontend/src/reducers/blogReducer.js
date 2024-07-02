import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const data = await blogService.create(newBlog);
    dispatch(addBlog(data));
  };
};

export const likeBlog = (id, newObject) => {
  return async (dispatch, getState) => {
    const data = await blogService.update(id, newObject);
    const oldState = getState().blogs;
    const updatedState = oldState.map((blog) =>
      blog.id === data.id ? data : blog
    );
    dispatch(setBlogs(updatedState));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.deleteBlog(id);
    const oldState = getState().blogs;
    const updatedState = oldState.filter((blog) => blog.id !== id);
    dispatch(setBlogs(updatedState));
  };
};
