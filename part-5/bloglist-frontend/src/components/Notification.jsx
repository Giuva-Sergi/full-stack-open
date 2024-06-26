function Notification({ message, type = "success" }) {
  const style = {
    paddingBlock: "1rem",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "green",
    backgroundColor:
      type === "success" ? "rgba(87, 177, 30, 0.3)" : "rgba(244, 24, 24, 0.3)",
    border: type === "success" ? "5px solid green" : "5px solid red",
    borderRadius: "7px",
  };
  return (
    <>
      <p style={style}>{message}</p>
    </>
  );
}

export default Notification;
