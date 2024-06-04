import { useState } from "react";

function Blog({ blog, onUpdateLikes, onDeleteBlog, username }) {
  const { title, author, url, likes, id } = blog;
  const [isExpanded, setIsExpanded] = useState(false);

  const isCurrentUser = blog.user.username
    ? blog.user.username === username
    : false;

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
        <button onClick={() => setIsExpanded(!isExpanded)}>
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
                <button onClick={() => onUpdateLikes(id, { likes: likes + 1 })}>
                  like
                </button>
              </span>
            </p>
            {isCurrentUser && (
              <button onClick={() => onDeleteBlog(id)}>delete</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
