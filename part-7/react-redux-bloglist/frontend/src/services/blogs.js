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

const getBlogById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
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

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

const update = async (blogId, newObject) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, newObject);

  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

export default {
  getAll,
  getBlogById,
  create,
  createComment,
  update,
  deleteBlog,
  setToken,
};
