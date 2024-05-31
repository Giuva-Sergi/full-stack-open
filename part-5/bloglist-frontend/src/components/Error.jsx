function Error({ error }) {
  const style = {
    paddingBlock: "1rem",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "green",
    backgroundColor: "rgba(244, 24, 24, 0.3)",
    border: "5px solid red",
    borderRadius: "7px",
  };
  return (
    <>
      <p style={style}>{error}</p>
    </>
  );
}

export default Error;
