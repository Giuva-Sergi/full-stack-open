import axios from "axios";

const BASE_URL = "http://localhost:3001/notes";

const getNotes = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const res = await axios.post(BASE_URL, object);
  return res.data;
};

const updateNote = async (id, object) => {
  const updatedObject = { ...object, important: !object.important };

  const res = await axios.put(`${BASE_URL}/${id}`, updatedObject);
  return res.data;
};

export { getNotes, createNew, updateNote };
