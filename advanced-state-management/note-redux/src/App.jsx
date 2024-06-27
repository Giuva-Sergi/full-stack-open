import { useDispatch, useSelector } from "react-redux";
import NewNote from "./NewNote";
import Notes from "./Notes";
import VisibilityFilter from "./VisibilityFilter";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getNotes().then((notes) => dispatch(setNotes(notes)));
  // }, []);

  // using Thunk middleware
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
