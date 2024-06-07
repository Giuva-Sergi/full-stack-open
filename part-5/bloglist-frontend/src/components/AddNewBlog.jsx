import { useState } from "react";
import PropTypes from "prop-types";

function AddNewBlog({ onCreateBlog, toggleVisibility }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    onCreateBlog(newBlog);
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

AddNewBlog.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
};

export default AddNewBlog;
