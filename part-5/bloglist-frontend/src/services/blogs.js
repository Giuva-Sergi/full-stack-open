import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);

  return response.data;
};

const update = async (blogId, newObject) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, newObject);

  return response.data;
};

export default { getAll, create, update, setToken, token };
