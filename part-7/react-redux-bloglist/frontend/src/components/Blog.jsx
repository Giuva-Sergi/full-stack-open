import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const login = useSelector((state) => state.login);

  const isCurrentUser = blog.user.username
    ? blog.user.username === login.username
    : false;

  function handleLike() {
    const { id } = blog;
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    dispatch(likeBlog(id, updated));
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href="#" target="_blank">
          {blog.url}
        </a>
      </p>
      <span>{blog.likes} likes</span>
      <button onClick={handleLike}>like</button>
      <p>added by {blog.author}</p>
      {isCurrentUser && (
        <button onClick={() => dispatch(deleteBlog(blog.id))}>delete</button>
      )}
    </div>
  );
}

export default Blog;
