import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { showMessage } from "./notificationReducer";

export const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    currentBlog: null,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    clearCurrenBlog: (state) => {
      state.currentBlog = null;
    },
    addBlog: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, setCurrentBlog, clearCurrenBlog, addBlog } =
  blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const getSelectedBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getBlogById(id);
    dispatch(setCurrentBlog(blog));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const data = await blogService.create(newBlog);
    dispatch(addBlog(data));
  };
};

export const commentABlog = (id, content) => {
  const commentObject = {
    comment: content,
  };
  return async (dispatch, getState) => {
    try {
      const { blogs: prevState } = getState().blogs;
      const data = await blogService.createComment(id, commentObject);

      const newState = prevState.map((blog) => (blog.id === id ? data : blog));
      dispatch(setBlogs(newState));
      dispatch(setCurrentBlog(data));
    } catch (error) {
      dispatch(
        showMessage({ message: error.response.data.error, type: "error" }, 3.5)
      );
    }
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
