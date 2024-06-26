import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import Filter from "./Filter";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createNew, getAll } from "./services/anecdotes";
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);

  useEffect(() => {
    getAll().then((data) => dispatch(setAnecdotes(data)));
  }, []);

  return (
    <div>
      {message && <Notification />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
