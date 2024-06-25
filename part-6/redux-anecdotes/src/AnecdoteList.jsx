import { useDispatch, useSelector } from "react-redux";
import Anecdote from "./Anecdote";
import { vote } from "./reducers/anecdoteReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onClickHandler={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </>
  );
}

export default AnecdoteList;
