import { useState } from "react";
import Person from "./components/Person";
import Searchbar from "./components/Searchbar";
import AddPersonForm from "./components/AddPersonForm";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Searchbar
        value={filter}
        handleChange={(e) => setFilter(e.target.value)}
      />
      <AddPersonForm
        onAddPerson={addPerson}
        newName={newName}
        onSetNewName={(e) => setNewName(e.target.value)}
        onSetNewNumber={(e) => setNewNumber(e.target.value)}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <Person key={person.id} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
}

export default App;
