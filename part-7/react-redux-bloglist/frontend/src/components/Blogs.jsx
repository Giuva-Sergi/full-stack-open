import BlogLink from "./BlogLink";

function Blogs({ blogs }) {
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
