import { useDispatch } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";

function CreateNewAnecdote() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(createAnecdote(content));
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default CreateNewAnecdote;
