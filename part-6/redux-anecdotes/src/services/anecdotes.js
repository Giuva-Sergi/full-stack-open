import axios from "axios";

const BASE_URL = "http://localhost:3003/anecdotes";

const getAll = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const createNew = async (content) => {
  const object = {
    content,
    votes: 0,
  };
  const res = await axios.post(BASE_URL, object);
  return res.data;
};

const updateVote = async (object) => {
  const { id, ...rest } = object;

  const newObject = {
    ...rest,
    votes: rest.votes + 1,
  };
  const res = await axios.put(`${BASE_URL}/${id}`, newObject);

  return res.data;
};
export { getAll, createNew, updateVote };
