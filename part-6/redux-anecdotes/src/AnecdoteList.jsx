import { useDispatch, useSelector } from "react-redux";
import Anecdote from "./Anecdote";
import { vote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((obj) => obj.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClickHandler={() => {
            dispatch(vote(anecdote));
            dispatch(setNotification(`You voted '${anecdote.content}'`, 3));
          }}
        />
      ))}
    </>
  );
}

export default AnecdoteList;
