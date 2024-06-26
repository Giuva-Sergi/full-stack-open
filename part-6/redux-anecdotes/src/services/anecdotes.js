import axios from "axios";

const BASE_URL = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export { getAll };
