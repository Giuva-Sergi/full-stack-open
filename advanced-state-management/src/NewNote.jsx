import { useDispatch } from "react-redux";
import { createNewNote } from "./reducers/noteReducer";

function NewNote() {
  const dispatch = useDispatch();
  function addNote(e) {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    dispatch(createNewNote(content));
  }
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default NewNote;
