import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  function onChange(e) {
    setValue(e.target.value);
  }

  function reset() {
    setValue("");
  }

  return {
    name,
    value,
    onChange,
    reset,
  };
};
