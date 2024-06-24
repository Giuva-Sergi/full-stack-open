import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "./reducers/noteReducer";
import Note from "./Note";

function Notes() {
  const notes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <ul>
      {notes.map((note) => (
        <Note
          note={note}
          handleClick={() => dispatch(toggleImportance(note.id))}
        />
      ))}
    </ul>
  );
}

export default Notes;
