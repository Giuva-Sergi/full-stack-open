import { useState } from "react";

function Blog({ blog, onUpdateLikes }) {
  const { title, author, url, likes, id } = blog;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        border: "2px solid black",
        padding: "0.5rem",
        borderRadius: "7px",
        marginBlock: "0.5rem",
      }}
    >
      <p>
        {title}{" "}
        <span>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "hide" : "view"}
          </button>
        </span>
      </p>
      {isExpanded && (
        <>
          <div>
            <p>{url}</p>
            <p>
              likes {likes}
              <span>
                <button onClick={() => onUpdateLikes(id, { likes: likes + 1 })}>
                  like
                </button>
              </span>
            </p>
            <p>{author}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
