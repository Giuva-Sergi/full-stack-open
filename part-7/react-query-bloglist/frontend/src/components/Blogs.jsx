import { useDispatch, useSelector } from "react-redux";
import BlogLink from "./BlogLink";
import { useEffect } from "react";
import { initializeBlogs } from "../reducers/blogReducer";

function Blogs() {
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  return (
    <ul className="w-1/2 mx-auto mt-12">
      {blogs.map((blog) => (
        <BlogLink key={blog.id} blog={blog} />
      ))}
    </ul>
  );
}

export default Blogs;
