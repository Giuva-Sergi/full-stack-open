import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createNew = async (newObject) => {
  const res = await axios.post(BASE_URL, newObject);
  return res.data;
};

export const updateVotes = async (object) => {
  const { id } = object;
  const res = await axios.put(`${BASE_URL}/${id}`, object);
  return res.data;
};
