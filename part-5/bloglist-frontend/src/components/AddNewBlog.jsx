import { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";

function AddNewBlog({ onSetMessage, onSetBlogs, toggleVisibility }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function createBlog(newBlog) {
    try {
      const response = await blogService.create(newBlog);

      onSetMessage(`a new blog ${title} by ${author} added`);
      onSetBlogs((prevBlogs) => [...prevBlogs, response]);

      setTimeout(() => {
        onSetMessage(null);
      }, 3500);
    } catch (error) {
      console.error(error.response.data.error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    createBlog(newBlog);
    toggleVisibility();
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
        />
        author:
        <input
          style={{ display: "block" }}
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        url:
        <input
          style={{ display: "block" }}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

AddNewBlog.propTypes = {
  onSetBlogs: PropTypes.func.isRequired,
  onSetMessage: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
};

export default AddNewBlog;
