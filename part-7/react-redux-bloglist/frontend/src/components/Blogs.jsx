import { useDispatch, useSelector } from "react-redux";
import BlogLink from "./BlogLink";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/blogReducer";

function Blogs() {
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const style = {
    padding: 0,
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <ul style={style}>
      {blogs.map((blog) => (
        <BlogLink key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}

export default Blogs;
