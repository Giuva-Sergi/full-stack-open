import { useDispatch, useSelector } from "react-redux";
import { toggleImportance } from "./reducers/noteReducer";
import Note from "./Note";

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
          handleClick={() => dispatch(toggleImportance(note.id, note))}
        />
      ))}
    </ul>
  );
}

export default Notes;
