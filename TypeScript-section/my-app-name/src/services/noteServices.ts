import axios from "axios";
import { NewNote, Note } from "../types";

const BASE_URL = "http://localhost:3001/notes";

const fetchNotes = async () => {
  const res = await axios.get<Note[]>(BASE_URL);

  return res.data;
};

const createNote = async (object: NewNote) => {
  const res = await axios.post<Note>(BASE_URL, object);
  return res.data;
};

export default { fetchNotes, createNote };
