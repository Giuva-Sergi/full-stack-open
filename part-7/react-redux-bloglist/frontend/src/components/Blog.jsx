import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

function Blog({ blog, username }) {
  const { title, author, url, likes, id } = blog;
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const isCurrentUser = blog?.user?.username
    ? blog.user.username === username
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
    <div
      className="blog"
      style={{
        border: "2px solid black",
        padding: "0.5rem",
        borderRadius: "7px",
        marginBlock: "0.5rem",
      }}
    >
      <p className="title">{title}</p>
      <p className="author">{author}</p>
      <span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="button-view"
        >
          {isExpanded ? "hide" : "view"}
        </button>
      </span>
      {isExpanded && (
        <>
          <div>
            <p className="url">{url}</p>
            <p className="likes">
              likes {likes}
              <span>
                <button onClick={handleLike} data-testid="button-like">
                  like
                </button>
              </span>
            </p>
            {isCurrentUser && (
              <button onClick={() => dispatch(deleteBlog(id))}>delete</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
