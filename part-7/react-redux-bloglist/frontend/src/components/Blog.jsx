import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrenBlog,
  commentABlog,
  deleteBlog,
  getSelectedBlog,
  likeBlog,
} from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Comment from "./Comment";
import { useState } from "react";

function Blog() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentBlog: blog } = useSelector((state) => state.blogs);
  const login = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");

  const isCurrentUser = blog?.user?.username
    ? blog.user.username === login.username
    : false;

  useEffect(() => {
    dispatch(clearCurrenBlog());
    dispatch(getSelectedBlog(id));
  }, []);

  if (!blog) {
    return <div>loading blog...</div>;
  }

  function handleLike() {
    const { id } = blog;
    const updated = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    dispatch(likeBlog(id, updated));
  }

  function handleDelete() {
    dispatch(deleteBlog(blog.id));
    navigate("/");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(commentABlog(blog.id, newComment));
    setNewComment("");
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a
          href={`https://${blog.url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {blog.url}
        </a>
      </p>
      <span>{blog.likes} likes</span>
      <button onClick={handleLike}>like</button>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button>Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      {isCurrentUser && <button onClick={handleDelete}>delete</button>}
    </div>
  );
}

export default Blog;
