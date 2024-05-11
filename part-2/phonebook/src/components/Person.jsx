import { deleteContact } from "../services/contacts";

function Person({ id, name, number, persons, setterFn }) {
  function handleDelete() {
    window.confirm(`Delete ${name} ?`);
    deleteContact(id).then((contact) => {
      id = contact.id;
      setterFn(persons.filter((person) => person.id !== id));
    });
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
