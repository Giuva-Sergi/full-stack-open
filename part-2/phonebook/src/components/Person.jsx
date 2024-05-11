import { deleteContact } from "../services/contacts";

function Person({ id, name, number }) {
  function handleDelete() {
    window.confirm(`Delete ${name} ?`);
    deleteContact(id);
  }
  return (
    <li>
      <span>{name} </span>
      <span>{number}</span>
      <button onClick={() => handleDelete()}>delete</button>
    </li>
  );
}

export default Person;
