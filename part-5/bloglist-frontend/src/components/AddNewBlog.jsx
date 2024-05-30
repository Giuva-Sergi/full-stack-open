import { useState } from "react";
import blogService from "../services/blogs";

function AddNewBlog({ token, onSetMessage, onSetBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    blogService.setToken(token);

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const response = await blogService.create(newBlog);

      onSetMessage({
        content: `a new blog ${title} by ${author} added`,
        type: "success",
      });
      onSetBlogs((prevBlogs) => [...prevBlogs, response]);
      setAuthor("");
      setTitle("");
      setUrl("");

      setTimeout(() => {
        onSetMessage(null);
      }, 3500);
    } catch (error) {
      console.error(error.response.data.error);
    }
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

export default AddNewBlog;
