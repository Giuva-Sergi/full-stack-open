import axios from "axios";
import { useEffect, useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function getAll() {
      const res = await axios.get(baseUrl);
      const data = await res.data;
      setResources(data);
    }

    getAll();
  }, []);

  const create = async (resource) => {
    const res = await axios.post(baseUrl, resource);
    const data = await res.data;

    setResources((prevData) => [...prevData, data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
