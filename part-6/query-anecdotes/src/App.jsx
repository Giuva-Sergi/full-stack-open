import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { createNew, getAll, updateVotes } from "./services/anecdotes";
import { useNotificationContext } from "./contexts/NotificationContext";

const App = () => {
  const { message, setNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
    onError: () =>
      setNotification("too short anecdote, must have length 5 or more", 5),
  });

  const mutationUpdate = useMutation({
    mutationFn: updateVotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((el) => (el.id === newAnecdote.id ? newAnecdote : el))
      );
    },
  });

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    mutationUpdate.mutate(updatedAnecdote);
    setNotification(`'${anecdote.content}' voted`, 5);
  };

  if (isError) {
    return (
      <h1>anecdote service not available due to problems in the server</h1>
    );
  }

  const anecdotes = data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      {message && <Notification />}
      <AnecdoteForm mutation={mutation} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
