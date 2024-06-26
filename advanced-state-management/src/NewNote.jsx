import { useDispatch } from "react-redux";
import { createNewNote } from "./reducers/noteReducer";
import { createNew } from "./services/notes";

function NewNote() {
  const dispatch = useDispatch();
  async function addNote(e) {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    const newNote = await createNew(content);
    dispatch(createNewNote(newNote));
  }
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default NewNote;
