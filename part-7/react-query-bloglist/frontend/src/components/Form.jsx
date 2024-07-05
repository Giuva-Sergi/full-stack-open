function Form({ handlerFn, children, type = "" }) {
  const classList =
    type === "createBlog"
      ? "border border-blue-700 rounded-md grid place-content-center gap-3 p-3 w-1/3 mx-auto"
      : "border border-blue-700 rounded-md grid place-content-center gap-3 p-3";
  return (
    <form onSubmit={handlerFn} className={classList}>
      {children}
    </form>
  );
}

export default Form;
