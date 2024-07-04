function Comment({ comment }) {
  const listStyle = {
    listStyle: "none",
  };
  return <li style={listStyle}>{comment.comment}</li>;
}

export default Comment;
