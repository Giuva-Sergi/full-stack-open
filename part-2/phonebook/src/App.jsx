import { useEffect, useState } from "react";
import Person from "./components/Person";
import Searchbar from "./components/Searchbar";
import AddPersonForm from "./components/AddPersonForm";
import {
  createContact,
  getContacts,
  updatePhoneNumber,
} from "./services/contacts";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getContacts().then((contacts) => setPersons(contacts));
  }, []);

  console.log(persons);

  function addPerson(e) {
    e.preventDefault();
    if (!newName || !newNumber) return;
    if (persons.some((person) => person.name === newName)) {
      window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      );
      const person = persons.find((person) => person.name === newName);
      const updatedPersonId = person.id;
      const updatedPerson = { ...person, number: newNumber };
      updatePhoneNumber(person.id, updatedPerson)
        .then((returnedObj) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPersonId ? returnedObj : person
            )
          );
        })
        .catch((error) => {
          setMessage(
            `Information of ${newName} has already been removed from the server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 3500);
          console.error(error);
        });
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      createContact(newPerson).then((newContact) => {
        setPersons([...persons, newContact]);
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 3500);
      });
    }
  }

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toUpperCase().includes(filter.toUpperCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
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
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            persons={persons}
            setterFn={setPersons}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
