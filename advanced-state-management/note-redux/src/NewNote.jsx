import { useDispatch } from "react-redux";
import { createNote } from "./reducers/noteReducer";

function NewNote() {
  const dispatch = useDispatch();
  async function addNote(e) {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    // const newNote = await createNew(content);
    // dispatch(createNewNote(newNote));
    // using thunk middleware
    dispatch(createNote(content));
  }
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
}

export default NewNote;
