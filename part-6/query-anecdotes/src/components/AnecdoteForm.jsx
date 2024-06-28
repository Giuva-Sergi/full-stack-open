import { useNotificationContext } from "../contexts/NotificationContext";

const AnecdoteForm = ({ mutation }) => {
  const { setNotification } = useNotificationContext();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    mutation.mutate({ content, votes: 0 });
    setNotification(`anecdote ${content} created`, 5);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
