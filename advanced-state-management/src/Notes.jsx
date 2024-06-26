import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "./reducers/noteReducer";
import Note from "./Note";
import { updateNote } from "./services/notes";

function Notes() {
  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    } else if (filter === "IMPORTANT") {
      return notes.filter((note) => note.important);
    } else {
      return notes.filter((note) => !note.important);
    }
  });
  const dispatch = useDispatch();

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => {
            updateNote(note.id, note);
            dispatch(toggleImportance(note.id));
          }}
        />
      ))}
    </ul>
  );
}

export default Notes;
