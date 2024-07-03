import { Link } from "react-router-dom";

function BlogLink({ blog }) {
  const style = {
    listStyle: "none",
    marginBottom: "1rem",
    border: "1px solid steelblue",
    padding: "1rem 0.5rem 0",
    borderRadius: "7px",
  };
  return (
    <li style={style}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </li>
  );
}

export default BlogLink;
