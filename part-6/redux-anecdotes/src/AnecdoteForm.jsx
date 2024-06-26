import { useDispatch } from "react-redux";
import { createAnecdote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";
import { createNew } from "./services/anecdotes";

function AnecdoteForm() {
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = "";
    const newAnecdote = await createNew(content);
    dispatch(createAnecdote(newAnecdote));
    setNotification(dispatch, `You created '${content}'`, 5000);
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
