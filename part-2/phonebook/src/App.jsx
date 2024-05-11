import { useEffect, useState } from "react";
import Person from "./components/Person";
import Searchbar from "./components/Searchbar";
import AddPersonForm from "./components/AddPersonForm";
import axios from "axios";
import { createContact, getContacts } from "./services/contacts";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getContacts().then((contacts) => setPersons(contacts));
  }, []);

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
      name: newName,
      number: newNumber,
    };
    createContact(newPerson).then((newContact) => {
      setPersons([...persons, newContact]);
      setNewName("");
      setNewNumber("");
    });
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
