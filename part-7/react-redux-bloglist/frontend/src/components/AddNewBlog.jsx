import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showMessage } from "../reducers/notificationReducer";

function AddNewBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const message = `a new blog ${title} by ${author} added`;
    dispatch(createBlog(newBlog));
    dispatch(showMessage({ message, type: "success" }, 3.5));
    setTitle("");
    setAuthor("");
    setUrl("");
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        title:
        <input
          style={{ display: "block" }}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="write title here"
        />
        author:
        <input
          style={{ display: "block" }}
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="write author here"
        />
        url:
        <input
          style={{ display: "block" }}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="write url here"
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AddNewBlog;
