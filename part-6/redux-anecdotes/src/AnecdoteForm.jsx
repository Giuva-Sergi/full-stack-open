import { useDispatch } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created '${content}'`, 3));
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

export default AnecdoteForm;
