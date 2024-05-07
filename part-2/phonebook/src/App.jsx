import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function addPerson(e) {
    e.preventDefault();
    if (!newName) return;
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
      return;
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
    };
    setPersons([...persons, newPerson]);
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((persons) => (
          <li key={persons.id}>{persons.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
