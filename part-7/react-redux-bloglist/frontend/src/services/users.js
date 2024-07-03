import axios from "axios";

const BASE_URL = "/api/users";

const getUsers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export default { getUsers, getUserById };
