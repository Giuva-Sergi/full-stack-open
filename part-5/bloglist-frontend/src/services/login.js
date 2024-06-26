import axios from "axios";

const BASE_URL = "/api/login";

const login = async function (credentials) {
  const response = await axios.post(BASE_URL, credentials);
  return response.data;
};

export default { login };
