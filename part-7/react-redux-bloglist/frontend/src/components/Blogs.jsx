import { useSelector } from "react-redux";
import BlogLink from "./BlogLink";

function Blogs() {
  const blogs = useSelector((state) => state.blogs);
  const style = {
    padding: 0,
  };

  return (
    <ul style={style}>
      {blogs.map((blog) => (
        <BlogLink key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}

export default Blogs;
