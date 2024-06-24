import { useDispatch, useSelector } from "react-redux";
import Anectode from "./Anecdote";
import { vote } from "./reducers/anecdoteReducer";

function Anecdotes() {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch;
  return (
    <>
      {anecdotes.map((anecdote) => (
        <Anectode
          key={anecdote.id}
          anecdote={anecdote}
          onClickHandler={() => dispatch(vote(anecdote.id))}
        />
      ))}
    </>
  );
}

export default Anecdotes;
