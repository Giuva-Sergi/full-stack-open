import { useEffect, useState } from "react";
import { Note } from "./types";
import noteServices from "./services/noteServices";

function App() {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: "1", content: "testing" }]);

  useEffect(() => {
    async function initializeNotes() {
      const notes = await noteServices.fetchNotes();
      setNotes(notes);
    }
    initializeNotes();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const noteObject = {
      content: newNote,
    };
    const createdNote = await noteServices.createNote(noteObject);
    setNotes([...notes, createdNote]);
    setNewNote("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button>Add note</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
