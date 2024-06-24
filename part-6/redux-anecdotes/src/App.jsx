import { useSelector, useDispatch } from "react-redux";
import { vote } from "./reducers/anecdoteReducer";
import Anectode from "./Anecdote";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anectode
          key={anecdote.id}
          anecdote={anecdote}
          onClickHandler={() => dispatch(vote(anecdote.id))}
        />
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
