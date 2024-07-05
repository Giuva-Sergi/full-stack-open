function InputText({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="focus:outline-2 focus:outline-violet-600 focus:rounded-md"
    />
  );
}

export default InputText;
