import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "888-6458723" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function addPerson(e) {
    e.preventDefault();
    if (!newName) return;
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            <span>{person.name} </span>
            <span>{person.number}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
