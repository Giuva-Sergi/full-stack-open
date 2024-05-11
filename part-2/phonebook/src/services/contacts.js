import axios from "axios";

const BASE_URL = "http://localhost:3001/persons";

const getContacts = function () {
  const request = axios.get(BASE_URL);

  return request.then((res) => res.data);
};

const createContact = function (newContact) {
  const request = axios.post(BASE_URL, newContact);

  return request.then((res) => res.data);
};

const deleteContact = function (id) {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then((res) => res.data);
};

export { getContacts, createContact, deleteContact };
