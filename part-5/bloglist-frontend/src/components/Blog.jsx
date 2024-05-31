import { useState } from "react";

function Blog({ blog }) {
  const { title, author, url, likes } = blog;
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(likes);
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
        {blog.title}{" "}
        <span>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "view" : "hide"}
          </button>
        </span>
      </p>
      {isExpanded && (
        <>
          <div>
            <p>{url}</p>
            <p>likes {likes}</p>
            <p>{author}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
