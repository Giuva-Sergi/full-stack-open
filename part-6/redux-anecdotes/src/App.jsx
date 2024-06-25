import AnecdoteList from "./AnecdoteList";
import AnecdoteForm from "./AnecdoteForm";
import Filter from "./Filter";
import Notification from "./Notification";
import { useSelector } from "react-redux";

const App = () => {
  const message = useSelector((state) => state.notification);

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
