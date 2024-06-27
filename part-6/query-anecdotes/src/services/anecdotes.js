import axios from "axios";

const BASE_URL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
