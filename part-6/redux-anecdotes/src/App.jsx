import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import Filter from "./Filter";

const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
