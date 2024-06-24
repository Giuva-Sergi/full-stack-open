import Anecdotes from "./Anecdotes";
import CreateNewAnecdote from "./CreateNewAnecdote";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      {/* <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form> */}
      <CreateNewAnecdote />
    </div>
  );
};

export default App;
